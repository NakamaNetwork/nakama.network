import { Unit, unitConverter } from '../unit';

describe('unit', () => {
  describe('unit-converter', () => {
    const baseUnit: Unit = {
      id: 1,
      name: 'Mr. Pants',
      types: ['QCK', 'STR'],
      classes: ['Booster', 'Cerebral'],

      stars: 5,
      cost: 60,
      combo: 30,
      sockets: 5,
      maxLevel: 99,
      expToMax: 10,
      minHp: 50,
      minAtk: 1,
      minRcv: 50,
      maxHp: 999,
      maxAtk: 59095,
      maxRcv: 500,
      growthRateHp: 1,
      growthRateAtk: 1,
      growthRateRcv: 1,

      flags: ['Global', 'Rare Recruit'],
      aliases: ['Pants Man'],
      evolvesTo: [2, 3],
      evolvesFrom: [-1],
      family: 'Pants guys'
    };

    const optionalKeys = Object.keys(baseUnit).filter(
      (x) => x !== 'id' && x !== 'name'
    ) as (keyof Unit)[];

    it('can convert a full unit', () => {
      expect(unitConverter(baseUnit)).toEqual(baseUnit);
    });

    it.each(optionalKeys)('can convert a unit without %s', (removedKey) => {
      const { [removedKey]: removed, ...unit } = baseUnit;
      expect(unitConverter(unit)).toEqual({ ...baseUnit, [removedKey]: undefined });
    });
  });
});
