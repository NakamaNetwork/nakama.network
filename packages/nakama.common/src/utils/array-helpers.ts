export const isEmbeddedArray = <T>(something: T[] | T[][]): something is T[][] => {
  return Array.isArray(something) && Array.isArray(something[0]);
};
