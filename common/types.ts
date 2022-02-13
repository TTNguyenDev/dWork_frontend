export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type StateWithLoading<T = {}> = T & { loading: boolean, error?: string | object }