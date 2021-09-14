import { sniffImages } from '../image-scraper';
import os from 'os';
import path from 'path';

jest.mock('../unit-scraper', () => ({
  sniffUnits: jest
    .fn()
    .mockResolvedValue([{ id: 1 }, { id: 190 }, { id: 2399 }, { id: 3100 }, { id: 3200 }])
}));

describe('imageScraper', () => {
  it('does it', async () => {
    const dir = path.join(os.tmpdir(), 'nakama.test/images');
    await sniffImages(dir);
    console.log('Written to ', dir);
  });
});
