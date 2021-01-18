import { unitClassConverter, unitClasses } from '../unit-class';

describe('unit-class', () => {
  describe('unitClassConverter', () => {
    it.each(unitClasses)('Can convert "%s"', (unitClass) => {
      expect(unitClassConverter(unitClass)).toBe(unitClass);
    });

    it.each([undefined, '', 'bunk'])('Throws error on %s', (unitClass) => {
      expect(() => unitClassConverter(unitClass)).toThrowError();
    });
  });
});
