import { importFromRemote } from '../utils/import-helper';
import { sniffUnits } from './unit-scraper';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { bin } from 'nakama.common/src/utils/array-helpers';
import { execFileSync } from 'child_process';

interface OptcDbUtils {
  Utils: {
    getThumbnailUrl: (id: number) => string;
  };
}

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
  for (const mappingSet of bin(entries, 50)) {
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
  for (const fileSet of bin(folderContent, 50)) {
    const promises = fileSet.map((file) =>
      file.name.endsWith('.png') ? compressImage(folder, file.name) : Promise.resolve()
    );
    await Promise.allSettled(promises);
  }
};

export const sniffImages = async (outDir: string) => {
  const manifest = await getNewManifest();
  if (Object.keys(manifest).length > 0) {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    await downloadThumbs(manifest, outDir);
    await compressImages(outDir);
  }
};
