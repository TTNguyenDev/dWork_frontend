import NewSortedSet, { SortedSet } from 'collections/sorted-set';

export type Block<T = any> = {
    id: number;
    payload?: T;
};

export class Blocks<T = any> {
    private _blocks: SortedSet<Block<T>>;

    constructor(payload: { seed: Block<T>[] } = { seed: [] }) {
        const { seed } = payload;

        this._blocks = NewSortedSet(
            seed,
            (a, b) => a.id === b.id,
            (a, b) => a.id - b.id
        );
    }

    public get items(): SortedSet<Block<T>> {
        return this._blocks;
    }
}
