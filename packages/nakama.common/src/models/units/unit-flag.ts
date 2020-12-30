import * as t from 'type-shift';

export const unitFlags = [
  'Global' as const,
  'Rare Recruit' as const,
  'Rare Recruit Exclusive' as const,
  'Limited Rare Recruit' as const,
  'Treasure Map Limited Rare Recruit' as const,
  'Kizuna Clash Limited Rare Recruit' as const,
  'Pirate Festival Limited Rare Recruit' as const,
  'Ray Shop Unit' as const,
  'Limited Distribution Unit' as const
];

/**
 * Unit flags dictating how they are obtained.
 *   (e.g. Rare Recruit Exclusive)
 */
export type UnitFlag = typeof unitFlags[number];

export const unitFlagConverter = t.oneOf<UnitFlag>(unitFlags);
