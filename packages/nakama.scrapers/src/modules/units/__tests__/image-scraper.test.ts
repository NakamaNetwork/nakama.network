import { sniffImages } from '../image-scraper';

jest.mock('../unit-scraper', () => ({
  sniffUnits: jest
    .fn()
    .mockResolvedValue([{ id: 1 }, { id: 190 }, { id: 2399 }, { id: 3100 }, { id: 3200 }])
}));

xdescribe('imageScraper', () => {
  beforeAll(() => {
    process.env.ASSET_BUCKET = 'nakama-stack-test-assetbucket1d025086-dy34sc8pzxj2';
  });

  it('does it', async () => {
    await sniffImages();
  });
});
