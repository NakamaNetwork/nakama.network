import AWS from 'aws-sdk';
import { execSync } from 'child_process';
import fs from 'fs';
import { bin } from 'nakama.common/src/utils/array-helpers';
import fetch from 'node-fetch';
import os from 'os';
import path from 'path';
import { importFromRemote } from '../utils/import-helper';
import { sniffUnits } from './unit-scraper';
interface OptcDbUtils {
  Utils: {
    getThumbnailUrl: (id: number, relPathToUrl: string) => string;
  };
}

const getGitSecret = async () => {
  console.log('Fetching secret');
  const secretClient = new AWS.SecretsManager();
  const secret = await secretClient
    .getSecretValue({ SecretId: process.env.GITHUB_SECRET! })
    .promise();
  return JSON.parse(secret.SecretString!).token;
};

const shallowCloneRepo = async (parentFolder: string) => {
  const secret = await getGitSecret();
  console.log('Attempting a shallow clone');
  execSync(
    `git clone https://${secret}@github.com/NakamaNetwork/nakama.assets.git --filter=blob:none --no-checkout`,
    { cwd: parentFolder }
  );
  const assetFolder = path.join(parentFolder, 'nakama.assets');
  execSync('git config --local user.email "nakama.db@gmail.com"', { cwd: assetFolder });
  execSync('git config --local user.name "nakama-bot"', { cwd: assetFolder });

  console.log('Performing sparse checkout');
  execSync('git sparse-checkout init', { cwd: assetFolder });
  execSync('git sparse-checkout set **/**/manifest.json', { cwd: assetFolder });
  execSync('git read-tree -mu HEAD', { cwd: assetFolder });
  console.log('Success!');
};

const getOldManifest = async (folder: string) => {
  const manifestFile = fs.readFileSync(path.join(folder, 'manifest.json'));
  return JSON.parse(manifestFile.toString()) as Record<string, number>;
};

const getImageMappings = async (limit?: number) => {
  console.log('Grabbing code.');
  const { Utils: utils } = await importFromRemote<OptcDbUtils>(
    'https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/js/utils.js'
  );
  console.log('Grabbing units.');
  let units = await sniffUnits();
  if (limit) {
    units = units.slice(0, limit);
  }

  console.log('Figuring out images.');
  const imageMappings = units.reduce((acc, { id }) => {
    acc[id] = utils.getThumbnailUrl(
      id,
      'https://raw.githubusercontent.com/optc-db/optc-db.github.io/master'
    );
    return acc;
  }, {} as Record<string, string>);
  return imageMappings;
};

const getTimestamp = async (id: string, url: string) => {
  console.log(`Trying to get timestamp of ${id} at ${url}.`);
  const headers = await fetch(url, {
    method: 'HEAD'
  });
  const lastModified = headers.headers.get('last-modified');
  if (!lastModified) {
    console.log(`Could not get real timestamp of ${id} at ${url}.`);
  }
  return new Date(lastModified || 0).getTime();
};

const getNewManifest = async (mappings: Record<string, string>) => {
  const manifest: Record<string, number> = {};
  const entries = Object.entries(mappings);
  for (const mappingSet of bin(entries)) {
    const promises = mappingSet.map(([id, url]) =>
      getTimestamp(id, url)
        .then((timestamp) => {
          manifest[id] = timestamp;
        })
        .catch((err) => {
          console.log(err);
        })
    );
    await Promise.allSettled(promises);
  }
  return manifest;
};

const getNewFiles = (newManifest: Record<string, number>, oldManifest: Record<string, number>) => {
  const newFiles: string[] = [];
  let staleFiles = 0;
  Object.entries(newManifest).forEach(([id, current]) => {
    const existing = oldManifest[id];
    if (!existing || existing < current) {
      newFiles.push(id);
    } else {
      staleFiles++;
    }
  });
  console.log(
    `Found ${Object.keys(newFiles).length} new files and ${
      Object.keys(staleFiles).length
    } stale files.`
  );
  return newFiles;
};

const downloadThumb = async (id: string, url: string, target: string) => {
  const res = await fetch(url);
  return new Promise<void>((resolve, reject) => {
    console.log(`Trying to download ${id} at ${url}.`);
    const filename = path.join(target, `thumb-${id.toString().padStart(4, '0')}.png`);
    const fileStream = fs.createWriteStream(filename);
    res.body.pipe(fileStream);
    res.body.on('error', (err) => {
      console.log(`Failed to download ${id} at ${url}:`, err);
      fileStream.close();
      fs.unlinkSync(filename);
      reject(err);
    });
    fileStream.on('finish', () => {
      fileStream.close();
      resolve();
    });
  });
};

const downloadThumbs = async (
  newFiles: string[],
  mappings: Record<string, string>,
  target: string
) => {
  console.log(`Downloading ${newFiles.length} images.`);
  const successes: Record<string, string> = {};
  const failures: Record<string, string> = {};
  for (const idSet of bin(newFiles)) {
    const promises = idSet.map((id) => {
      const url = mappings[id];
      return downloadThumb(id, url, target)
        .then(() => {
          successes[id] = url;
        })
        .catch(() => {
          failures[id] = url;
        });
    });
    await Promise.allSettled(promises);
  }
  return { successes, failures };
};

const compressImages = async (folder: string) => {
  const fullpath = path.join(folder, '*.png');
  execSync(
    `${path.join(process.cwd(), 'node_modules/.bin/pngquant')} 48 --ext .png --force ${fullpath}`,
    {
      stdio: 'inherit'
    }
  );
  console.log(`Compressed ${folder}`);
};

const writeNewManifest = async (newManifest: Record<string, number>, folder: string) => {
  fs.writeFileSync(path.join(folder, 'manifest.json'), JSON.stringify(newManifest));
};

const pushChanges = async (folder: string) => {
  console.log('Attempting to push');
  execSync('git add .', { cwd: folder });
  execSync('git commit -n -m "Automated file upload"', { cwd: folder });
  execSync('git push', { cwd: folder });
};

export const sniffImages = async ({ limit, local }: { limit?: number; local?: boolean } = {}) => {
  const tmpDir = path.join(os.tmpdir(), 'nakama-image-scraper');
  console.log('Working directory:', tmpDir);
  if (fs.existsSync(tmpDir)) {
    console.log('Clearing current directory');
    fs.rmdirSync(tmpDir, { recursive: true });
  }
  fs.mkdirSync(tmpDir, { recursive: true });

  const assetDir = path.join(tmpDir, 'nakama.assets', 'assets', 'images', 'thumbs');
  if (!local) {
    await shallowCloneRepo(tmpDir);
  }

  const oldManifest = local ? {} : await getOldManifest(assetDir);
  const mappings = await getImageMappings(limit);
  const newManifest = await getNewManifest(mappings);

  const newFiles = getNewFiles(newManifest, oldManifest);
  if (newFiles.length > 0) {
    await downloadThumbs(newFiles, mappings, assetDir);
    await compressImages(assetDir);
    await writeNewManifest(newManifest, assetDir);
    if (!local) {
      await pushChanges(assetDir);
    }
  }
};
