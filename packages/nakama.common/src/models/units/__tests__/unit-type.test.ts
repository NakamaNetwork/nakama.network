import { unitTypeConverter, unitTypes } from '../unit-type';

describe('unit-type', () => {
  describe('unitTypeConverter', () => {
    it.each(unitTypes)('Can convert "%s"', (unitType) => {
      expect(unitTypeConverter(unitType)).toBe(unitType);
    });

    it.each([undefined, '', 'bunk'])('Throws error on %s', (unitType) => {
      expect(() => unitTypeConverter(unitType)).toThrowError();
    });
  });
});
