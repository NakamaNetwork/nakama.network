import { enumFlagConverter } from '../../modules/enum-flag-converter';

export enum UnitClass {
  Unknown = 0,
  Fighter = 1 << 0,
  Slasher = 1 << 1,
  Striker = 1 << 2,
  Shooter = 1 << 3,
  FreeSpirit = 1 << 4,
  Driven = 1 << 5,
  Cerebral = 1 << 6,
  Powerhouse = 1 << 7,
  Evolver = 1 << 8,
  Booster = 1 << 9
}

export const unitClassConverter = enumFlagConverter<UnitClass>(UnitClass, 'UnitClass');
