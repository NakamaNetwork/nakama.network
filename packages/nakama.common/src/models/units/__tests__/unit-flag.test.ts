import { unitFlagConverter, unitFlags } from '../unit-flag';

describe('unit-flag', () => {
  describe('unitFlagConverter', () => {
    it.each(unitFlags)('Can convert "%s"', (unitFlag) => {
      expect(unitFlagConverter(unitFlag)).toBe(unitFlag);
    });

    it.each([undefined, '', 'bunk'])('Throws error on %s', (unitFlag) => {
      expect(() => unitFlagConverter(unitFlag)).toThrowError();
    });
  });
});
