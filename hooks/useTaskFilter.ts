import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TaskStatus } from '../models/types/jobType';

export type TaskFilterInput = {
    defaultFilter?: any;
};

export type TaskFilterOutput = {
    filter: any;
    setTaskFilter: (payload: Record<string, any>) => void;
    applyTaskFilter: () => void;
};

export const useTaskFilter = ({
    defaultFilter,
}: TaskFilterInput = {}): TaskFilterOutput => {
    const router = useRouter();

    const [filter, setFilter] = useState({});
    const tempFilter = useRef({});

    useEffect(() => {
        if (router.isReady)
            setFilter({
                status: TaskStatus.AVAILABLE,
                ...(defaultFilter || {}),
                ...router.query,
            });
    }, [router.query]);

    const setTaskFilter = useCallback(
        (payload: Record<string, any>) => {
            console.log(tempFilter.current);
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
