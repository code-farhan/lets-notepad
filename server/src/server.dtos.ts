export type DELTA = {
  ops: [{ retain?: number }, { insert?: string }, { delete?: number }];
};
