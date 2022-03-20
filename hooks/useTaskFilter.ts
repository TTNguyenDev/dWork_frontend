import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

export type TaskFilterOutput = {
    filter: any;
    setTaskFilter: (payload: Record<string, any>) => void;
    applyTaskFilter: () => void;
};

export const useTaskFilter = (): TaskFilterOutput => {
    const router = useRouter();

    const [filter, setFilter] = useState({});
    const tempFilter = useRef({});
    tempFilter.current = router.query;

    useEffect(() => {
        if (router.isReady) setFilter(router.query);
    }, [router.query]);

    const setTaskFilter = useCallback(
        (payload: Record<string, any>) => {
            console.log(payload);
            tempFilter.current = { ...tempFilter.current, ...payload };
        },
        [tempFilter.current]
    );

    const applyTaskFilter = useCallback(() => {
        router.push({
            pathname: router.pathname,
            query: new URLSearchParams(tempFilter.current).toString(),
        });
    }, [tempFilter.current]);

    return { filter, setTaskFilter, applyTaskFilter };
};
