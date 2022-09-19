import { atom } from 'jotai';

export const blockchainLoadingAtom = atom(true);

export const blockchainReadyAtom = atom(false);

export const logged = atom(false);

export const blockchainAtom = atom(
    (get) => ({
        loading: get(blockchainLoadingAtom),
        ready: get(blockchainReadyAtom),
    }),
    (get, set, payload) => {}
);
