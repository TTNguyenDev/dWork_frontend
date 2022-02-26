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

    if (!task) return null;

    return (
        <Drawer full open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
                <Drawer.Title>
                    <Stack justifyContent="space-between">
                        <div>Task details</div>
                        {task.owner ===
                            BlockChainConnector.instance.account.accountId &&
                            (task.availableUntil < Date.now() ||
                                (task.availableUntil >= Date.now() &&
                                    task.maxParticipants ===
                                        task.proposals.filter(
                                            (p) => p.isApproved
                                        ).length)) && (
                                <Button size="sm" appearance="primary">
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
                            <p style={{ marginBottom: 15 }}>{task.owner}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Price</h6>
                            <p
                                style={{ marginBottom: 15 }}
                            >{`${task.price} Ⓝ`}</p>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Duration</h6>
                            <div style={{ marginBottom: 15 }}>
                                <span
                                    style={{
                                        color:
                                            task.availableUntil >= Date.now()
                                                ? 'green'
                                                : 'red',
                                    }}
                                >
                                    {`${new Date(
                                        task.availableUntil
                                    ).toLocaleDateString()} ${new Date(
                                        task.availableUntil
                                    ).toLocaleTimeString()}`}
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
                                <p>{task.description}</p>
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
                                <Row key={p.accountId}>
                                    <Col xs={24} sm={24} md={24}>
                                        <Panel bordered>
                                            <div style={{ marginBottom: 15 }}>
                                                <b>
                                                    {
                                                        task.proposals[0]
                                                            .accountId
                                                    }
                                                </b>
                                            </div>
                                            <p style={{ marginBottom: 15 }}>
                                                {task.proposals[0]
                                                    .proofOfWork ? (
                                                    task.proposals[0]
                                                        .proofOfWork
                                                ) : (
                                                    <i>Empty</i>
                                                )}
                                            </p>
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
