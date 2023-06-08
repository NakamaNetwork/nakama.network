import * as t from 'type-shift';

export interface Box {
  id: string;
  name: string;
  ownerId: string;
}

export const boxConverter = t.shape<Box>({
  id: t.string,
  name: t.string,
  ownerId: t.string
});
