import React from 'react';
import { Table, Button } from 'rsuite';
import { useValidateWork } from '../../hooks/useValidateWork';
import { Job, JobStatus } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
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

    const { validateWorkLoading, handleValidateWork } = useValidateWork();

    return (
        <Table data={tasks} loading={loading} hover autoHeight>
            <Table.Column resizable>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.Cell dataKey="taskId" />
            </Table.Column>

            <Table.Column resizable>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.Cell dataKey="title" />
            </Table.Column>

            <Table.Column resizable>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.Cell dataKey="description" />
            </Table.Column>

            <Table.Column resizable>
                <Table.HeaderCell>Max participants</Table.HeaderCell>
                <Table.Cell dataKey="maxParticipants" />
            </Table.Column>

            <Table.Column resizable>
                <Table.HeaderCell>Hour rate</Table.HeaderCell>
                <Table.Cell dataKey="hourRate" />
            </Table.Column>

            <Table.Column resizable>
                <Table.HeaderCell>Hour estimation</Table.HeaderCell>
                <Table.Cell dataKey="hourEstimation" />
            </Table.Column>

            <Table.Column resizable>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.Cell dataKey="status" />
            </Table.Column>
            <Table.Column resizable>
                <Table.HeaderCell>Proposals</Table.HeaderCell>
                <Table.Cell>{(job: Job) => job.proposals.length}</Table.Cell>
            </Table.Column>
            <Table.Column resizable width={150} minWidth={150}>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.Cell>
                    {(task: Job) => (
                        <>
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
                            {type === 'processing' &&
                                task.owner ===
                                    BlockChainConnector.instance.account
                                        .accountId &&
                                task.status === JobStatus.WORKER_SUBMITTED && (
                                    <Button
                                        size="xs"
                                        loading={validateWorkLoading}
                                        onClick={() =>
                                            handleValidateWork({
                                                taskId: task.taskId,
                                            })
                                        }
                                    >
                                        Validate
                                    </Button>
                                )}
                        </>
                    )}
                </Table.Cell>
            </Table.Column>
        </Table>
    );
};
