import { importFromRemote } from '../utils/import-helper';
import { Unit, unitConverter } from 'nakama.common/src/models/units/unit';
import { isMultidimensionalArray } from 'nakama.common/src/utils/array-helpers';

interface SniffedUnits {
  units: Array<
    [
      string | null, // name
      string | string[] | null, // type
      string | string[] | string[][] | null, // class
      string | number | null, // Stars,
      number | null, // Cost,
      number | null, // Combo
      number | null, // Sockets
      number | null, // maxLVL,
      number | null, // EXPToMax,
      number | null, // lvl1HP,
      number | null, // lvl1ATK,
      number | null, // lvl1RCV,
      number | null, // MAXHP,
      number | null, // MAXATK,
      number | null, // MAXRCV,
      number | number[] | null // Growth Rate
    ]
  >;
}

const getTypes = (rawTypes: SniffedUnits['units'][number][1]): string[] | undefined => {
  if (rawTypes) {
    if (Array.isArray(rawTypes)) {
      return rawTypes;
    }
    return [rawTypes];
  }
  return undefined;
};

const getClasses = (rawClasses: SniffedUnits['units'][number][2]): string[] | undefined => {
  if (rawClasses) {
    if (Array.isArray(rawClasses)) {
      if (isMultidimensionalArray(rawClasses)) {
        return rawClasses.reduce((acc, cur) => {
          acc.push(...cur);
          return acc;
        }, [] as string[]);
      }
      return rawClasses;
    }
    return [rawClasses];
  }
  return undefined;
};

const getStars = (rawStars: SniffedUnits['units'][number][3]): number | undefined => {
  if (typeof rawStars === 'string') {
    const plusIndex = rawStars.indexOf('+');
    if (plusIndex > -1) {
      return Number.parseFloat(rawStars.substr(0, plusIndex)) + 0.5;
    }
    return Number.parseFloat(rawStars.substr(0, plusIndex));
  }
};

const getGrowthRates = (
  rawGrowthRate: SniffedUnits['units'][number][15]
): Pick<Unit, 'growthRateAtk' | 'growthRateHp' | 'growthRateRcv'> => {
  if (rawGrowthRate) {
    if (Array.isArray(rawGrowthRate)) {
      return {
        growthRateHp: rawGrowthRate[0] || undefined,
        growthRateAtk: rawGrowthRate[1] || undefined,
        growthRateRcv: rawGrowthRate[2] || undefined
      };
    }
    return {
      growthRateAtk: rawGrowthRate || undefined,
      growthRateHp: rawGrowthRate || undefined,
      growthRateRcv: rawGrowthRate || undefined
    };
  }
  return {};
};

export const sniffUnits = async () => {
  const { units } = await importFromRemote<SniffedUnits>(
    'https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/data/units.js'
  );
  const parsedUnits = units.reduce((acc, unit, index) => {
    // Ignore any unit that is unnamed.
    if (unit[0]) {
      const created = unitConverter({
        id: index + 1,
        name: unit[0] || '',
        types: getTypes(unit[1]) || undefined,
        classes: getClasses(unit[2]) || undefined,
        stars: getStars(unit[3]) || undefined,
        cost: unit[4] || undefined,
        combo: unit[5] || undefined,
        sockets: unit[6] || undefined,
        maxLevel: unit[7] || undefined,
        expToMax: unit[8] || undefined,
        minHp: unit[9] || undefined,
        minAtk: unit[10] || undefined,
        minRcv: unit[11] || undefined,
        maxHp: unit[12] || undefined,
        maxAtk: unit[13] || undefined,
        maxRcv: unit[14] || undefined,
        ...getGrowthRates(unit[15])
      });
      acc.push(created);
    }
    return acc;
  }, [] as Unit[]);
  return parsedUnits;
};
