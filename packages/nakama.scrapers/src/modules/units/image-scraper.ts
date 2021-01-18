import { importFromRemote } from '../utils/import-helper';
import { sniffUnits } from './unit-scraper';
import fs from 'fs';
import fetch from 'node-fetch';
import os from 'os';
import path from 'path';
import { FileDao, S3Dao } from 'nakama.common/src/dao/file-dao';
import { bin } from 'nakama.common/src/utils/array-helpers';
import { execFileSync } from 'child_process';

const BUCKET_PATH = 'assets/images/thumbs';
const MANIFEST_BUCKET_PATH = path.join(BUCKET_PATH, 'manifest.json');

interface OptcDbUtils {
  Utils: {
    getThumbnailUrl: (id: number) => string;
  };
}

const getOldManifest = async (bucket: FileDao) => {
  console.log(`Fetching old manifest from "${MANIFEST_BUCKET_PATH}"`);
  const result = await bucket.get(MANIFEST_BUCKET_PATH);
  if (result) {
    console.log('Manifest found.');
    return JSON.parse(result.toString('ascii')) as Record<string, string>;
  }
  console.log('Manifest not found. Returning empty.');
  return {} as Record<string, string>;
};

const getNewManifest = async () => {
  console.log('Grabbing code.');
  const { Utils: utils } = await importFromRemote<OptcDbUtils>(
    'https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/js/utils.js'
  );
  console.log('Grabbing units.');
  const units = await sniffUnits();

  console.log('Figuring out images.');
  const imageMappings = units.reduce((acc, { id }) => {
    acc[id] = utils
      .getThumbnailUrl(id)
      .replace('../res', 'https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/res');
    return acc;
  }, {} as Record<string, string>);
  return imageMappings;
};

const getNewFiles = (newManifest: Record<string, string>, oldManifest: Record<string, string>) => {
  const newFiles: Record<string, string> = {};
  const staleFiles: Record<string, string> = {};
  Object.entries(newManifest).forEach(([key, value]) => {
    const existing = oldManifest[key];
    if (existing !== value) {
      newFiles[key] = value;
    } else {
      staleFiles[key] = value;
    }
  });
  console.log(
    `Found ${Object.keys(newFiles).length} new files and ${
      Object.keys(staleFiles).length
    } stale files.`
  );
  return { newFiles, staleFiles };
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
      console.log(`Successfully downloaded ${id} at ${url}.`);
      resolve();
    });
  });
};

const downloadThumbs = async (imageMappings: Record<string, string>, target: string) => {
  const entries = Object.entries(imageMappings);
  console.log(`Downloading ${entries.length} images.`);
  const successes: Record<string, string> = {};
  const failures: Record<string, string> = {};
  for (const mappingSet of bin(entries)) {
    const promises = mappingSet.map(([id, url]) =>
      downloadThumb(id, url, target)
        .then(() => {
          successes[id] = url;
        })
        .catch(() => {
          failures[id] = url;
        })
    );
    await Promise.allSettled(promises);
  }
  return { successes, failures };
};

const compressImage = async (folder: string, file: string) => {
  const fullpath = path.join(folder, file);
  try {
    execFileSync(
      path.join(process.cwd(), 'node_modules/.bin/pngquant'),
      ['48', '--ext', '.png', '--force', `${fullpath}`],
      {
        stdio: 'inherit'
      }
    );
    console.log(`Compressed ${file}`);
  } catch (err) {
    console.log(`Error compressing ${file}:`, err);
  }
};

const compressImages = async (folder: string) => {
  // Read the content of the folder
  const folderContent = fs.readdirSync(folder, { withFileTypes: true });

  // Iterate over the contents
  for (const fileSet of bin(folderContent)) {
    const promises = fileSet.map((file) =>
      file.name.endsWith('.png') ? compressImage(folder, file.name) : Promise.resolve()
    );
    await Promise.allSettled(promises);
  }
};

const updateBucket = async (manifest: Record<string, string>, folder: string, bucket: FileDao) => {
  fs.writeFileSync(path.join(folder, 'manifest.json'), JSON.stringify(manifest));
  // Read the content of the folder
  const folderContent = fs.readdirSync(folder, { withFileTypes: true });

  // Iterate over the contents
  for (const fileSet of bin(folderContent)) {
    const promises = fileSet.map((file) => {
      const filePath = path.join(folder, file.name);
      const targetPath = path.join(BUCKET_PATH, file.name);
      console.log(`Attempting to upload "${filePath}" to "${targetPath}`);
      return bucket.put(targetPath, fs.readFileSync(filePath));
    });
    await Promise.allSettled(promises);
  }
};

export const sniffImages = async () => {
  if (!process.env.ASSET_BUCKET) {
    throw new Error('Could not find asset dao!');
  }
  const bucket = new S3Dao(process.env.ASSET_BUCKET!);
  const oldManifest = await getOldManifest(bucket);
  const newManifest = await getNewManifest();

  const { newFiles } = getNewFiles(newManifest, oldManifest);
  if (Object.keys(newFiles).length > 0) {
    const tmpDir = path.join(os.tmpdir(), `nakama-images/thumbs`);
    if (fs.existsSync(tmpDir)) {
      fs.rmdirSync(tmpDir, { recursive: true });
    }
    fs.mkdirSync(tmpDir, { recursive: true });
    await downloadThumbs(newFiles, tmpDir);
    await compressImages(tmpDir);
    await updateBucket({ ...oldManifest, ...newFiles }, tmpDir, bucket);
  }
};
