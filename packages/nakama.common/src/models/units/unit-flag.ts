import { enumFlagConverter } from '../../modules/enum-flag-converter';

export enum UnitFlag {
  Unknown = 0,
  Global = 1 << 0,
  RareRecruit = 1 << 1,
  RareRecruitExclusive = 1 << 2,
  RareRecruitOnly = 1 << 3,
  Promotional = 1 << 4,
  Shop = 1 << 5,
  LimitedRareRecruit = 1 << 6,
  KizunaRareRecruit = 1 << 7,
  PirateFestivalRareRecruit = 1 << 8,
  TreasureMapRareRecruit = 1 << 9
}

export const unitFlagConverter = enumFlagConverter<UnitFlag>(UnitFlag, 'UnitFlag');
