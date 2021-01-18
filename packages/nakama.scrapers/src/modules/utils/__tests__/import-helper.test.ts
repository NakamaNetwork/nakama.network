import * as fs from 'fs';
import * as path from 'path';
import { importFromRemote } from '../import-helper';

jest.mock('node-fetch');

describe('import-helper', () => {
  describe('importFromRemote', () => {
    it('grabs all the window items from the module', async () => {
      const fetch = jest.requireMock('node-fetch');
      fetch.mockImplementationOnce((url: string) => ({
        ok: true,
        text: jest.fn().mockImplementationOnce(() => fs.readFileSync(url).toString())
      }));
      const imported = await importFromRemote(path.join(__dirname, 'import-helper-test-module.js'));
      expect(imported).toMatchObject({
        units: [
          ['Monkey D. Luffy', 'STR', 'Fighter', 2, 1, 5, 0, 5, 163, 42, 15, 8, 134, 68, 15, 1],
          ['Monkey D. Larry', 'QCK', 'Striker', 2, 1, 5, 0, 5, 163, 42, 15, 8, 134, 68, 15, 1],
          ['Monkey D. Guppy', 'DEX', 'Shooter', 2, 1, 5, 0, 5, 163, 42, 15, 8, 134, 68, 15, 1]
        ]
      });
    });

    it('throws an error if the query came back not ok', async () => {
      const fetch = jest.requireMock('node-fetch');
      fetch.mockImplementationOnce((url: string) => ({
        ok: false,
        statusText: 'no good'
      }));
      expect(importFromRemote('')).rejects.toThrowError('no good');
    });
  });
});
