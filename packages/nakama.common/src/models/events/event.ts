import * as t from 'type-shift';

export interface Event {
  stageId: string;
  /** Epoch timestamp for the start date of the event */
  startDate: number;
  /** Epoch timestamp for the end date of the event */
  endDate: number;
}

export const eventConverter = t.strict<Event>({
  stageId: t.string,
  startDate: t.number,
  endDate: t.number
});
