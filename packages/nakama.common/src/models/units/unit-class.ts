import * as t from 'type-shift';

export const unitClasses = [
  'Fighter' as const,
  'Slasher' as const,
  'Striker' as const,
  'Shooter' as const,
  'Powerhouse' as const,
  'Cerebral' as const,
  'Driven' as const,
  'Free Spirit' as const,
  'Evolver' as const,
  'Booster' as const
];

/**
 * Unit classes (e.g. Fighter, Slasher, etc)
 */
export type UnitClass = typeof unitClasses[number];

export const unitClassConverter = t.oneOf<UnitClass>(unitClasses);
