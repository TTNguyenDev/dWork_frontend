import React from 'react';
import {
    Badge,
    Button,
    Col,
    Divider,
    Drawer,
    Grid,
    Panel,
    Row,
    Stack,
} from 'rsuite';
import { useRejectWork } from '../../hooks/useRejectWork';
import { useApproveWork } from '../../hooks/useApproveWork';
import { Job } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
import { useMarkATaskAsCompleted } from '../../hooks/useMarkATaskAsCompleted';
import Avatar from 'react-avatar';
import * as dateFns from 'date-fns';
interface TaskDetailsDrawerProps {
    task?: Job;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const TaskDetailsDrawer: React.FunctionComponent<
    TaskDetailsDrawerProps
> = ({ task, open, setOpen }) => {
    const { approveWorkLoading, handleApproveWork } = useApproveWork();
    const { rejectWorkLoading, handleRejectWork } = useRejectWork();
    const { markATaskAsCompletedLoading, handleMarkATaskAsCompleted } =
        useMarkATaskAsCompleted();

    if (!task) return null;

    return (
        <Drawer full open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
                <Drawer.Title>
                    <Stack justifyContent="space-between">
                        <div>Task details</div>
                        {task.type !== 'completed' &&
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
                                    size="sm"
                                    appearance="primary"
                                    loading={markATaskAsCompletedLoading}
                                    onClick={() =>
                                        handleMarkATaskAsCompleted({
                                            taskId: task.taskId,
                                        }).then(() => setOpen(false))
                                    }
                                >
                                    Mark task as completed
                                </Button>
                            )}
                    </Stack>
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <Grid fluid>
                    <Row>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>ID</h6>
                            <p style={{ marginBottom: 15 }}>{task.taskId}</p>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Title</h6>
                            <p style={{ marginBottom: 15 }}>{task.title}</p>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Owner</h6>
                            <Stack style={{ color: '#555' }} spacing={5}>
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
                            <h6 style={{ marginBottom: 5 }}>Bounty prize</h6>
                            <p
                                style={{ marginBottom: 15 }}
                            >{`${task.price} Ⓝ`}</p>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Deadline</h6>
                            <div style={{ marginBottom: 15 }}>
                                <span
                                    style={{
                                        color:
                                            task.availableUntil >= Date.now()
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
                            <h6 style={{ marginBottom: 5 }}>Description</h6>
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
                {task.proposals[0] ? (
                    <>
                        <Grid fluid>
                            {task.proposals.map((p) => (
                                <Row
                                    key={p.accountId}
                                    style={{ marginBottom: 15 }}
                                >
                                    <Col xs={24} sm={24} md={24}>
                                        <Panel bordered>
                                            <div style={{ marginBottom: 15 }}>
                                                <Stack
                                                    style={{ color: '#555' }}
                                                    spacing={5}
                                                >
                                                    <Avatar
                                                        size="1.5em"
                                                        textSizeRatio={1.75}
                                                        round
                                                        name={p.accountId}
                                                    />
                                                    <div>{p.accountId}</div>
                                                </Stack>
                                            </div>
                                            {p.proofOfWork ? (
                                                <div
                                                    className="ql-editor"
                                                    dangerouslySetInnerHTML={{
                                                        __html: task
                                                            .proposals[0]
                                                            .proofOfWork,
                                                    }}
                                                    style={{
                                                        marginBottom: 15,
                                                        maxWidth: 800,
                                                    }}
                                                />
                                            ) : (
                                                <p style={{ marginBottom: 15 }}>
                                                    <i>Empty</i>
                                                </p>
                                            )}
                                            <div style={{ marginBottom: 15 }} />
                                            {p.isApproved && (
                                                <Badge
                                                    color="green"
                                                    content="Approved"
                                                />
                                            )}
                                            {!p.isApproved &&
                                                task.owner ===
                                                    BlockChainConnector.instance
                                                        .account.accountId && (
                                                    <Stack
                                                        justifyContent="flex-end"
                                                        spacing={10}
                                                    >
                                                        <Button
                                                            appearance="primary"
                                                            loading={
                                                                approveWorkLoading
                                                            }
                                                            onClick={() => {
                                                                handleApproveWork(
                                                                    {
                                                                        taskId: task.taskId,
                                                                        workerId:
                                                                            p.accountId,
                                                                    }
                                                                ).then(() =>
                                                                    setOpen(
                                                                        false
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            appearance="ghost"
                                                            loading={
                                                                rejectWorkLoading
                                                            }
                                                            onClick={() => {
                                                                handleRejectWork(
                                                                    {
                                                                        taskId: task.taskId,
                                                                        workerId:
                                                                            p.accountId,
                                                                    }
                                                                ).then(() =>
                                                                    setOpen(
                                                                        false
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Stack>
                                                )}
                                        </Panel>
                                    </Col>
                                </Row>
                            ))}
                        </Grid>
                        <div style={{ marginBottom: 15 }} />
                    </>
                ) : (
                    'Empty'
                )}
            </Drawer.Body>
        </Drawer>
    );
};
