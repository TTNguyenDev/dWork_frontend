import { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Optional } from '../common';
import { Task } from '../models/types/jobType';
import { FETCH_TASKS_LIMIT, TaskService } from '../services/jobService';
import { RootState } from '../store';
import { TaskFilterInput, useTaskFilter } from './useTaskFilter';

export type UseListJobsInput = TaskFilterInput;

export type UseListJobsOutput = {
    loading: boolean;
    jobs: Optional<Task[]>;
    isFetchingNextPage: boolean;
    hasNextPage: Optional<boolean>;
    fetchNextPage: () => Promise<any>;
    filterReady: boolean;
    filter: any;
    setTaskFilter: (payload: Record<string, any>) => void;
    applyTaskFilter: () => void;
};

export const useListJobs = (payload?: UseListJobsInput): UseListJobsOutput => {
    const { filterReady, filter, setTaskFilter, applyTaskFilter } =
        useTaskFilter(payload);

    const app = useSelector((state: RootState) => state.app);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(
        ['jobs', filter],
        ({ pageParam: { offset, fromBlockId } = {} }) =>
            TaskService.fetchJobsInfinity({
                offset,
                fromBlockId,
                filter,
            }),
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length < FETCH_TASKS_LIMIT) return undefined;
                return {
                    offset: FETCH_TASKS_LIMIT * pages.length,
                    fromBlockId: lastPage[lastPage.length - 1].id,
                };
            },
            enabled: app.data.cacheReady && app.data.accountTasksCacheReady,
        }
    );

    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.invalidateQueries('jobs');
    }, [filter]);

    useEffect(() => {
        fetchNextPage();
    }, []);

    const jobs = data
        ? data.pages.reduce((prev, current) => [...prev, ...current], [])
        : undefined;

    return {
        loading: isLoading,
        jobs,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        filterReady,
        filter,
        setTaskFilter,
        applyTaskFilter,
    };
};
