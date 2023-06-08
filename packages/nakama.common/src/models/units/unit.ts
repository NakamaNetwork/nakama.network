import * as t from 'type-shift';

export interface Unit {
  id: string;
  name: string;
}

export const unitConverter = t.strict<Unit>({
  id: t.string,
  name: t.string
});
