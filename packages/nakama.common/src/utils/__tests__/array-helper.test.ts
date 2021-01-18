import { bin, isMultidimensionalArray } from '../array-helpers';

describe('array-helper', () => {
  describe('isMultidimensionalArray', () => {
    it('returns true when multidimensional array', () => {
      expect(isMultidimensionalArray([[]])).toBe(true);
    });

    it('returns false when single dimensional array', () => {
      expect(isMultidimensionalArray([])).toBe(false);
    });
  });

  describe('bin', () => {
    it('splits an array into buckets', () => {
      const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const splitLength = 2;
      const buckets = [...bin(array, splitLength)];
      expect(buckets.length).toBe(Math.ceil(array.length / splitLength));
      for (let i = 0; i < buckets.length; i++) {
        expect(buckets[i]).toEqual(array.slice(i * splitLength, i * splitLength + splitLength));
      }
    });
  });
});
