import * as t from 'type-shift';

export interface TeamUnit {
  slot: number;
  unitId: string;
  /**
   * Indicates that this unit can be swapped in for another.
   */
  alt: boolean;
}

export const teamUnitConverter = t.strict<TeamUnit>({
  slot: t.number,
  unitId: t.string,
  alt: t.boolean.default(() => false)
});

export interface Team {
  id: string;
  name: string;
  authorId: string;
  description: string;
  units: TeamUnit[];
}

export const teamConverter = t.strict<Team>({
  id: t.string,
  name: t.string,
  authorId: t.string,
  description: t.string,
  units: t.array(teamUnitConverter)
});
