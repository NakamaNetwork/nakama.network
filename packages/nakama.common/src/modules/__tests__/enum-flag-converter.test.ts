import * as t from 'type-shift';
import { enumFlagConverter } from '../enum-flag-converter';

export const enumFlagTestSuite = <T>(
  flags: Record<string, number | string>,
  converter: t.Converter<T, unknown>
) => {
  const rawValues = Object.values(flags).filter((x) => typeof x === 'number') as number[];
  const combinedValues = rawValues.reduce((acc, cur, i) => {
    if (i === 0) {
      acc.push(cur);
    } else {
      acc.push(acc[i] + cur);
    }
    return acc;
  }, [] as number[]);
  const badValues = [-1, 1.5, combinedValues[combinedValues.length - 1] + 1];

  describe('converts exact values', () => {
    it.each(rawValues)('Converts %d properly', (value) => {
      expect(converter(value)).toBe(value);
    });
  });

  describe('converts combined values', () => {
    it.each(combinedValues)('Converts %d properly', (value) => {
      expect(converter(value)).toBe(value);
    });
  });

  describe('fails on bad values', () => {
    it.each(badValues)('Fails on %d as expected', (value) => {
      expect(() => converter(value)).toThrowError();
    });
  });
};

describe('enum-flag-converter', () => {
  enum TestFlags {
    Empty = 0,
    First = 1 << 0,
    Second = 1 << 1,
    Third = 1 << 2,
    Fourth = 1 << 3,
    Fifth = 1 << 4,
    Sixth = 1 << 5
  }
  const converter = enumFlagConverter<TestFlags>(TestFlags, 'TestFlags');
  enumFlagTestSuite(TestFlags, converter);
});
