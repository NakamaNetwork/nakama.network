import fs from 'fs';
import { sniffAliases } from '../unit-alias-scraper';

describe('unit-alias-sniffer', () => {
  it('SNIFFS', async () => {
    const aliases = await sniffAliases();
    expect(Object.keys(aliases).length).toBeGreaterThan(0);
    fs.writeFileSync('aliases.json', JSON.stringify(aliases, null, 2));
  });
});
