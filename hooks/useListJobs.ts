import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Optional } from "../common";
import { Job } from "../models/types/jobType";
import { JobService } from "../services/jobService";
import { RootState } from "../store";

export type UseListJobsOutput = {
    loading: boolean;
    jobs: Optional<Job[]>;
}

export const useListJobs = (): UseListJobsOutput => {
    const app = useSelector((state: RootState) => state.app);

    const { isLoading, data } = useQuery<Job[]>('jobs', JobService.fetchJobs)

    return {
        loading: isLoading,
        jobs: data
    }
}