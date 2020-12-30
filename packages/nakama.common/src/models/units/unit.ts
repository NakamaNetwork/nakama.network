import * as t from 'type-shift';
import { UnitClass, unitClassConverter } from './unit-class';
import { UnitFlag, unitFlagConverter } from './unit-flag';
import { UnitType, unitTypeConverter } from './unit-type';

export interface Unit {
  /** Id of unit */
  id: number;
  /** Name of unit */
  name: string;
  /** Type or "color" of unit. Can have more than one */
  types?: UnitType[];
  /** Class of a unit (e.g. Striker). Can have more than one. */
  classes?: UnitClass[];

  /** Unit rarity */
  stars?: number;
  /** Cost of unit */
  cost?: number;
  /** Number of combo hits the unit has */
  combo?: number;
  /** Number of sockets the unit has */
  sockets?: number;
  /** Maximum level of the unit */
  maxLevel?: number;
  /** EXP required to max out the unit */
  expToMax?: number;
  /** Stats at level 1 */
  minHp?: number;
  minAtk?: number;
  minRcv?: number;
  /** Stats at max level */
  maxHp?: number;
  maxAtk?: number;
  maxRcv?: number;
  /** Rate at which stats grow */
  growthRateHp?: number;
  growthRateAtk?: number;
  growthRateRcv?: number;

  /** Flags indicating how to obtain the unit */
  flags?: UnitFlag[];
  /** Other names for the unit */
  aliases?: string[];
  /** Units this unit can evolve to */
  evolvesTo?: number[];
  /** Units this unit can evolve from */
  evolvesFrom?: number[];
  /** Can only have one unit with this flag per team */
  family?: string;
}

export const unitConverter = t.strict<Unit>({
  id: t.number,
  name: t.string,
  types: t.optional(t.array(unitTypeConverter)),
  classes: t.optional(t.array(unitClassConverter)),

  stars: t.optional(t.number),
  cost: t.optional(t.number),
  combo: t.optional(t.number),
  sockets: t.optional(t.number),
  maxLevel: t.optional(t.number),
  expToMax: t.optional(t.number),
  minHp: t.optional(t.number),
  minAtk: t.optional(t.number),
  minRcv: t.optional(t.number),
  maxHp: t.optional(t.number),
  maxAtk: t.optional(t.number),
  maxRcv: t.optional(t.number),
  growthRateHp: t.optional(t.number),
  growthRateAtk: t.optional(t.number),
  growthRateRcv: t.optional(t.number),

  flags: t.optional(t.array(unitFlagConverter)),
  aliases: t.optional(t.array(t.string)),
  evolvesTo: t.optional(t.array(t.number)),
  evolvesFrom: t.optional(t.array(t.number)),
  family: t.optional(t.string)
});
