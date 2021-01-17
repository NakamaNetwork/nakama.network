import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const FUNC_WRAPPER_START = '(function () {';
const FUNC_WRAPPER_END = '})();';

export const importFromRemote = async <TResult>(url: string): Promise<TResult> => {
  console.log(`Attempting to fetch ${url}`);
  const fetchResult = await fetch(url);
  if (!fetchResult.ok) {
    throw Error(fetchResult.statusText);
  }
  let content = (await fetchResult.text())
    .replace(/window\./g, 'exports.')
    .replace(/window\[/g, 'exports[')
    .trim();
  if (content.startsWith(FUNC_WRAPPER_START)) {
    content = content.substr(FUNC_WRAPPER_START.length);
  }
  if (content.endsWith(FUNC_WRAPPER_END)) {
    content = content.substr(0, content.length - FUNC_WRAPPER_END.length);
  }
  const tmpDir = os.tmpdir();
  const tmpFile = path.join(tmpDir, `${Math.random().toString(36)}.js`);
  fs.writeFileSync(tmpFile, content);
  console.log('Wrote file to', tmpFile);
  const exports = (await import(tmpFile)) as TResult;
  return exports as TResult;
};
