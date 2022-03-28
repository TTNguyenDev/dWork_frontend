import React, { useCallback } from 'react';
import { Table, Button, Stack } from 'rsuite';
import { Task, TaskType } from '../../models/types/jobType';
import { MdDone } from 'react-icons/md';
import { BlockChainConnector } from '../../utils/blockchain';
import { useMarkATaskAsCompleted } from '../../hooks/useMarkATaskAsCompleted';
import { useRouter } from 'next/router';

interface TasksTableProps {
    type: TaskType;
    tasks: Task[];
    loading: boolean;
}

export const TasksTable: React.FunctionComponent<TasksTableProps> = ({
    type,
    tasks,
    loading,
}) => {
    const router = useRouter();

    const handleViewBtnClick = useCallback((taskId: string) => {
        router.push(`/task/${taskId}`);
    }, []);

    return (
        <Table data={tasks as any} loading={loading} hover autoHeight>
            <Table.Column width={50}>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.Cell>{(task: Task) => tasks.indexOf(task)}</Table.Cell>
            </Table.Column>

            <Table.Column resizable width={250}>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.Cell dataKey="title" />
            </Table.Column>
            <Table.Column width={120} resizable>
                <Table.HeaderCell>Bounty prize</Table.HeaderCell>
                <Table.Cell>{(task: Task) => `${task.price} Ⓝ`}</Table.Cell>
            </Table.Column>
            <Table.Column width={220}>
                <Table.HeaderCell>Deadline</Table.HeaderCell>
                <Table.Cell>
                    {({ availableUntil }: Task) => {
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
                <Table.Cell>{(job: Task) => job.proposals.length}</Table.Cell>
            </Table.Column>
            <Table.Column resizable width={150} minWidth={150}>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.Cell>
                    {(task: Task) => {
                        const {
                            markATaskAsCompletedLoading,
                            handleMarkATaskAsCompleted,
                        } = useMarkATaskAsCompleted();

                        return (
                            <Stack spacing={5}>
                                <Button
                                    size="xs"
                                    onClick={() =>
                                        handleViewBtnClick(task.taskId)
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
