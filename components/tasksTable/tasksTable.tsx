import React from 'react';
import { Table, Button, Badge, Stack } from 'rsuite';
import { useValidateWork } from '../../hooks/useValidateWork';
import { Job, JobStatus } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
import { StatusBadge } from '../statusBadge/statusBadge';
import { SubmitWorkModal } from '../submitWorkModal';
import classes from './tasksTable.module.less';

interface TasksTableProps {
    type: 'available' | 'processing' | 'completed' | 'pending';
    tasks: Job[];
    loading: boolean;
    handleViewBtnClick: (task: Job) => void;
}

export const TasksTable: React.FunctionComponent<TasksTableProps> = ({
    type,
    tasks,
    loading,
    handleViewBtnClick,
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Table data={tasks as any} loading={loading} hover autoHeight>
            <Table.Column width={50}>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.Cell>{(task: Job) => tasks.indexOf(task)}</Table.Cell>
            </Table.Column>

            <Table.Column resizable width={250}>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.Cell dataKey="title" />
            </Table.Column>
            <Table.Column width={120}>
                <Table.HeaderCell>Max participants</Table.HeaderCell>
                <Table.Cell dataKey="maxParticipants" />
            </Table.Column>

            <Table.Column width={120} resizable>
                <Table.HeaderCell>Hour rate</Table.HeaderCell>
                <Table.Cell dataKey="hourRate" />
            </Table.Column>
            <Table.Column width={120} resizable>
                <Table.HeaderCell>Hour estimation</Table.HeaderCell>
                <Table.Cell dataKey="hourEstimation" />
            </Table.Column>

            <Table.Column width={120}>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.Cell>
                    {({ status }: Job) => <StatusBadge status={status} />}
                </Table.Cell>
            </Table.Column>
            <Table.Column width={80}>
                <Table.HeaderCell>Proposals</Table.HeaderCell>
                <Table.Cell>{(job: Job) => job.proposals.length}</Table.Cell>
            </Table.Column>
            <Table.Column resizable width={150} minWidth={150}>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.Cell>
                    {(task: Job) => (
                        <Stack spacing={5}>
                            <Button
                                size="xs"
                                onClick={() => handleViewBtnClick(task)}
                            >
                                View
                            </Button>
                            {type === 'processing' &&
                                task.owner !==
                                    BlockChainConnector.instance.account
                                        .accountId &&
                                task.status === JobStatus.FOUND_WORKER && (
                                    <>
                                        <Button size="xs" onClick={handleOpen}>
                                            Submit
                                        </Button>
                                        <SubmitWorkModal
                                            taskId={task.taskId}
                                            open={open}
                                            handleOpen={handleOpen}
                                            handleClose={handleClose}
                                        />
                                    </>
                                )}
                        </Stack>
                    )}
                </Table.Cell>
            </Table.Column>
        </Table>
    );
};
