export const isMultidimensionalArray = <T>(something: T[] | T[][]): something is T[][] => {
  return Array.isArray(something) && something.some((element) => Array.isArray(element));
};

export function* bin<T>(items: T[], bucketSize = 10) {
  for (let i = 0; i < items.length; i += bucketSize) {
    yield items.slice(i, i + bucketSize);
  }
}
