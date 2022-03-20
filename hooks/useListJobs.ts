import { useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Optional } from '../common';
import { Task } from '../models/types/jobType';
import { FETCH_TASKS_LIMIT, TaskService } from '../services/jobService';
import { RootState } from '../store';
import { useTaskFilter } from './useTaskFilter';

export type UseListJobsOutput = {
    loading: boolean;
    jobs: Optional<Task[]>;
    isFetchingNextPage: boolean;
    hasNextPage: Optional<boolean>;
    fetchNextPage: () => Promise<any>;
    filter: any;
    setTaskFilter: (payload: Record<string, any>) => void;
    applyTaskFilter: () => void;
};

export const useListJobs = (): UseListJobsOutput => {
    const { filter, setTaskFilter, applyTaskFilter } = useTaskFilter();

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
        ({ pageParam }) =>
            TaskService.fetchAvailableJobsInfinity({
                offset: pageParam,
                filter,
            }),
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length < FETCH_TASKS_LIMIT) return undefined;
                return FETCH_TASKS_LIMIT * pages.length;
            },
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
        : [];

    return {
        loading: isLoading,
        jobs,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        filter,
        setTaskFilter,
        applyTaskFilter,
    };
};
