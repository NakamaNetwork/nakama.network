import * as t from 'type-shift';

/**
 * Build a type converter for the given enum type
 *
 * @param enumerable - Enumerable to convert
 * @param name - Name of enumerable
 */
export const enumFlagConverter = <T>(enumerable: Record<string, string | number>, name: string) => {
  // Find all the actual values of the enum, as under the covers this is just
  //   a record of strings to numbers and numbers to strings.
  const suitableValues = Object.values(enumerable).filter((x) => typeof x === 'number') as number[];
  // Find the sum of all the enum values combined.
  const sum = suitableValues.reduce((acc, cur) => acc + cur);
  // Build up a string for logging errors
  const expectation = `one of ${JSON.stringify(suitableValues)}`;

  // Return the converter: first check the input is a number, then
  //   verify that the value is compatible with the enum by performing
  //   a bitwise AND operation.
  return t.number.pipe((input: number, path: (string | number)[]) => {
    if ((input & sum) === input) {
      return (input as unknown) as T;
    }
    throw new t.ConverterError(input, expectation, path);
  }, name) as t.Converter<T, unknown>;
};
