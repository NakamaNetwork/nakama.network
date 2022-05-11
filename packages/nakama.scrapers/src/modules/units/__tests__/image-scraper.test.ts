import { sniffImages } from '../image-scraper';

jest.mock('../unit-scraper', () => ({
  sniffUnits: jest
    .fn()
    .mockResolvedValue([{ id: 1 }, { id: 190 }, { id: 2399 }, { id: 3100 }, { id: 3200 }])
}));

xdescribe('imageScraper', () => {
  beforeAll(() => {
    jest.setTimeout(60000);
  });

  it('does it', async () => {
    await sniffImages({ local: true });
  });
});
