import React from 'react';
import { Badge } from 'rsuite';
import { JobStatus } from '../../models/types/jobType';

interface StatusBadgeProps {
    status: JobStatus;
}

export const StatusBadge: React.FunctionComponent<StatusBadgeProps> = ({
    status,
}) => {
    return (
        <Badge
            color={
                status === JobStatus.READY_FOR_APPLY
                    ? 'green'
                    : status === JobStatus.FOUND_WORKER
                    ? 'cyan'
                    : status === JobStatus.WORKER_SUBMITTED
                    ? 'blue'
                    : status === JobStatus.PAYOUT
                    ? 'violet'
                    : 'blue'
            }
            content={status}
        />
    );
};
