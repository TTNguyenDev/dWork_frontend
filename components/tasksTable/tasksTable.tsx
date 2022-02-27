import React from 'react';
import { Table, Button, Stack } from 'rsuite';
import { Job, JobType } from '../../models/types/jobType';
import { MdDone } from 'react-icons/md';
import { BlockChainConnector } from '../../utils/blockchain';
import { useMarkATaskAsCompleted } from '../../hooks/useMarkATaskAsCompleted';
interface TasksTableProps {
    type: JobType;
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
            <Table.Column width={120} resizable>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.Cell>{(task: Job) => `${task.price} Ⓝ`}</Table.Cell>
            </Table.Column>
            <Table.Column width={220}>
                <Table.HeaderCell>Available until</Table.HeaderCell>
                <Table.Cell>
                    {({ availableUntil }: Job) => {
                        const datetime = new Date(availableUntil);
                        return (
                            <span
                                style={{
                                    color:
                                        availableUntil >= Date.now()
                                            ? 'green'
                                            : 'red',
                                }}
                            >
                                {`${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`}
                            </span>
                        );
                    }}
                </Table.Cell>
            </Table.Column>
            <Table.Column width={120}>
                <Table.HeaderCell>Max participants</Table.HeaderCell>
                <Table.Cell dataKey="maxParticipants" />
            </Table.Column>
            <Table.Column width={80}>
                <Table.HeaderCell>Proposals</Table.HeaderCell>
                <Table.Cell>{(job: Job) => job.proposals.length}</Table.Cell>
            </Table.Column>
            <Table.Column resizable width={150} minWidth={150}>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.Cell>
                    {(task: Job) => {
                        const {
                            markATaskAsCompletedLoading,
                            handleMarkATaskAsCompleted,
                        } = useMarkATaskAsCompleted();

                        return (
                            <Stack spacing={5}>
                                <Button
                                    size="xs"
                                    onClick={() =>
                                        handleViewBtnClick({ ...task, type })
                                    }
                                >
                                    View
                                </Button>
                                {type !== 'completed' &&
                                    task.owner ===
                                        BlockChainConnector.instance.account
                                            .accountId &&
                                    (task.availableUntil < Date.now() ||
                                        (task.availableUntil >= Date.now() &&
                                            task.maxParticipants ===
                                                task.proposals.filter(
                                                    (p) => p.isApproved
                                                ).length)) && (
                                        <Button
                                            size="xs"
                                            onClick={() =>
                                                handleMarkATaskAsCompleted({
                                                    taskId: task.taskId,
                                                })
                                            }
                                            appearance="primary"
                                            loading={
                                                markATaskAsCompletedLoading
                                            }
                                        >
                                            <MdDone />
                                        </Button>
                                    )}
                            </Stack>
                        );
                    }}
                </Table.Cell>
            </Table.Column>
        </Table>
    );
};
