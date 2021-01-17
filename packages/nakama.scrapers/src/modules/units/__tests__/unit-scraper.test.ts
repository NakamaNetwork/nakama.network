import { sniffUnits } from '../unit-scraper';

xdescribe('unit-sniffer', () => {
  it('SNIFFS', async () => {
    const units = await sniffUnits();
    expect(units.length).toBeGreaterThan(0);
  });
});
