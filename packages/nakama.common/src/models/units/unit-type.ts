import { enumFlagConverter } from '../../modules/enum-flag-converter';

export enum UnitType {
  Unknown = 0,
  STR = 1 << 0,
  DEX = 1 << 1,
  QCK = 1 << 2,
  INT = 1 << 3,
  PSY = 1 << 4
}

export const unitTypeConverter = enumFlagConverter<UnitType>(UnitType, 'UnitType');
