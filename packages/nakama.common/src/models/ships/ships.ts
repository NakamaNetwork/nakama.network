import * as t from 'type-shift';

export interface Ship {
  id: string;
  name: string;
}

export const shipConverter = t.strict<Ship>({
  id: t.string,
  name: t.string
});
