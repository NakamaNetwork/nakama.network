import * as t from 'type-shift';

export const unitTypes = [
  'STR' as const,
  'DEX' as const,
  'QCK' as const,
  'INT' as const,
  'PSY' as const
];

/**
 * Type or "color" of a unit. (e.g. STR, DEX, etc)
 */
export type UnitType = typeof unitTypes[number];

export const unitTypeConverter = t.oneOf<UnitType>(unitTypes);
