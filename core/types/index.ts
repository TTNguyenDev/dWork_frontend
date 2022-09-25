export type ApiGetListInput = {
  from_index: number;
  limit: number;
};

export type GetListInput<T extends {} = {}> = Omit<
  PouchDB.Find.FindRequest<T>,
  'selector'
> & {
  selector?: PouchDB.Find.Selector;
};
