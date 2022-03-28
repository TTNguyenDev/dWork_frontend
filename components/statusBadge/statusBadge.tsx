import React from 'react';
import { Badge } from 'rsuite';
import { TaskStatus } from '../../models/types/jobType';

interface StatusBadgeProps {
    status: TaskStatus;
}

export const StatusBadge: React.FunctionComponent<StatusBadgeProps> = ({
    status,
}) => {
    return (
        <Badge
            // color={
            //     status === TaskStatus.READY_FOR_APPLY
            //         ? 'green'
            //         : status === TaskStatus.FOUND_WORKER
            //         ? 'cyan'
            //         : status === TaskStatus.WORKER_SUBMITTED
            //         ? 'blue'
            //         : status === TaskStatus.PAYOUT
            //         ? 'violet'
            //         : 'blue'
            // }
            content={status}
        />
    );
};
