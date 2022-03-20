import React from 'react';
import { Button, Col, Divider, Drawer, Grid, Panel, Row, Stack } from 'rsuite';
import { TaskType } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
import { useMarkATaskAsCompleted } from '../../hooks/useMarkATaskAsCompleted';
import Avatar from 'react-avatar';
import * as dateFns from 'date-fns';
import { useQuery } from 'react-query';
import { TaskService } from '../../services/jobService';
import { Loader } from '../loader';
import { ProposalItem } from '../proposalItem';
import { SubmitWorkButton } from '../submitWorkButton';
interface TaskDetailsDrawerProps {
    taskId?: string;
    type?: TaskType;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const TaskDetailsDrawer: React.FunctionComponent<
    TaskDetailsDrawerProps
> = ({ taskId, type, open, setOpen }) => {
    const { markATaskAsCompletedLoading, handleMarkATaskAsCompleted } =
        useMarkATaskAsCompleted();

    const { data: task, isLoading } = useQuery(
        taskId!,
        () => TaskService.fetchTaskById(taskId!),
        {
            enabled: !!taskId,
        }
    );

    const isNotAvailable = task
        ? task.availableUntil < Date.now() ||
          (task.availableUntil >= Date.now() &&
              task.maxParticipants ===
                  task.proposals.filter((p) => p.isApproved).length)
        : undefined;

    return (
        <Drawer full open={open} onClose={() => setOpen(false)}>
            {isLoading || !task ? (
                <Loader />
            ) : (
                <>
                    <Drawer.Header>
                        <Drawer.Title>
                            <Stack justifyContent="space-between">
                                <div>Task details</div>
                                {type !== 'completed' &&
                                    task.owner ===
                                        BlockChainConnector.instance.account
                                            .accountId &&
                                    isNotAvailable && (
                                        <Button
                                            size="sm"
                                            appearance="primary"
                                            loading={
                                                markATaskAsCompletedLoading
                                            }
                                            onClick={() =>
                                                handleMarkATaskAsCompleted({
                                                    taskId: task.taskId,
                                                }).then(() => setOpen(false))
                                            }
                                        >
                                            Mark task as completed
                                        </Button>
                                    )}
                                <SubmitWorkButton task={task} />
                            </Stack>
                        </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Grid fluid>
                            <Row>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>ID</h6>
                                    <p style={{ marginBottom: 15 }}>
                                        {task.taskId}
                                    </p>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>Title</h6>
                                    <p style={{ marginBottom: 15 }}>
                                        {task.title}
                                    </p>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>Owner</h6>
                                    <Stack
                                        style={{ color: '#555' }}
                                        spacing={5}
                                    >
                                        <Avatar
                                            size="1.5em"
                                            textSizeRatio={1.75}
                                            round
                                            name={task.owner}
                                        />
                                        <div>{task.owner}</div>
                                    </Stack>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>
                                        Bounty prize
                                    </h6>
                                    <p
                                        style={{ marginBottom: 15 }}
                                    >{`${task.price} Ⓝ`}</p>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>
                                        Deadline
                                    </h6>
                                    <div style={{ marginBottom: 15 }}>
                                        <span
                                            style={{
                                                color:
                                                    task.availableUntil >=
                                                    Date.now()
                                                        ? 'green'
                                                        : 'red',
                                            }}
                                        >
                                            {dateFns.format(
                                                task.availableUntil,
                                                'yyyy-MM-dd HH:mm'
                                            )}
                                        </span>
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>
                                        Max participants
                                    </h6>
                                    <p style={{ marginBottom: 15 }}>
                                        {task.maxParticipants}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <h6 style={{ marginBottom: 5 }}>
                                        Description
                                    </h6>
                                    <Panel bordered>
                                        <div
                                            className="ql-editor"
                                            dangerouslySetInnerHTML={{
                                                __html: task.description,
                                            }}
                                            style={{ maxWidth: 800 }}
                                        />
                                    </Panel>
                                </Col>
                            </Row>
                        </Grid>
                        <Divider />
                        <h6
                            style={{ marginBottom: 5 }}
                        >{`Proposals (${task.proposals.length})`}</h6>
                        <div style={{ marginBottom: 15 }} />
                        {task.proposals.length ? (
                            <>
                                <Grid fluid>
                                    {task.proposals.map((p) => (
                                        <ProposalItem
                                            key={p.accountId}
                                            data={p}
                                            task={task}
                                        />
                                    ))}
                                </Grid>
                                <div style={{ marginBottom: 15 }} />
                            </>
                        ) : (
                            'Empty'
                        )}
                    </Drawer.Body>
                </>
            )}{' '}
        </Drawer>
    );
};
