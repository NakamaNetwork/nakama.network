import * as t from 'type-shift';
import { UnitType, unitTypeConverter } from './unit-type';
import { UnitFlag, unitFlagConverter } from './unit-flag';
import { UnitClass, unitClassConverter } from './unit-class';

export interface UnitStub {
  id: number;
  name: string;
  class: UnitClass;
  type: UnitType;
  flags: UnitFlag;
}

export const unitStubConverter = t.strict<UnitStub>({
  id: t.number,
  name: t.string,
  class: unitClassConverter,
  type: unitTypeConverter,
  flags: unitFlagConverter
});

export interface Unit extends UnitStub {
  maxLevel: number;
  stars: number;
  cost: number;
  evolvesTo: number[];
  evolvesFrom: number[];
}

export const unitConverter = t.strict<Unit>({
  ...unitStubConverter.converters,
  maxLevel: t.number,
  stars: t.number,
  cost: t.number,
  evolvesTo: t.array(t.number),
  evolvesFrom: t.array(t.number)
});
