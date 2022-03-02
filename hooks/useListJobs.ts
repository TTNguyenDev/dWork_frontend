import { useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Optional } from '../common';
import { Job } from '../models/types/jobType';
import { JobService } from '../services/jobService';
import { RootState } from '../store';

export type UseListJobsOutput = {
    loading: boolean;
    jobs: Optional<Job[]>;
    isFetchingNextPage: boolean;
    fetchNextPage: () => Promise<any>;
};

export const useListJobs = (): UseListJobsOutput => {
    const app = useSelector((state: RootState) => state.app);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery('jobs', JobService.fetchAvailableJobsInfinity, {
        getNextPageParam: (lastPage, pages) => {
            console.log(lastPage.length * pages.length + 1);
            return lastPage.length * pages.length + 1;
        },
    });

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
    };
};
