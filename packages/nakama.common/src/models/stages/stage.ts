import * as t from 'type-shift';

export interface Stage {
  id: string;
  name: string;
}

export const stageConverter = t.strict<Stage>({
  id: t.string,
  name: t.string
});
