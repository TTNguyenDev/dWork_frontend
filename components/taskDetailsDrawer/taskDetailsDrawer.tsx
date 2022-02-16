import React from 'react';
import {
    Button,
    Col,
    Divider,
    Drawer,
    Grid,
    List,
    Panel,
    Row,
    Stack,
} from 'rsuite';
import { useRejectWork } from '../../hooks/useRejectWork';
import { useValidateWork } from '../../hooks/useValidateWork';
import { Job, JobStatus } from '../../models/types/jobType';
import { ProposalsTable } from '../proposalsTable';
import { StatusBadge } from '../statusBadge/statusBadge';
import classes from './taskDetailsDrawer.module.less';

interface TaskDetailsDrawerProps {
    task?: Job;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const TaskDetailsDrawer: React.FunctionComponent<
    TaskDetailsDrawerProps
> = ({ task, open, setOpen }) => {
    const { validateWorkLoading, handleValidateWork } = useValidateWork();
    const { rejectWorkLoading, handleRejectWork } = useRejectWork();

    if (!task) return null;

    return (
        <Drawer full open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
                <Drawer.Title>Task details</Drawer.Title>
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
                            <h6 style={{ marginBottom: 5 }}>Status</h6>
                            <div style={{ marginBottom: 15 }}>
                                <StatusBadge status={task.status} />
                            </div>
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
                <h6 style={{ marginBottom: 5 }}>Proposals</h6>
                {task.status === JobStatus.READY_FOR_APPLY && (
                    <ProposalsTable task={task} proposals={task.proposals} />
                )}
                <div style={{ marginBottom: 15 }} />
                {task.status !== JobStatus.READY_FOR_APPLY &&
                    task.proposals[0] &&
                    task.proposals[0] && (
                        <>
                            <Grid fluid>
                                <Row>
                                    <Col xs={24} sm={24} md={12}>
                                        <Panel header="Proposals" bordered>
                                            <List>
                                                <List.Item>
                                                    <Stack justifyContent="space-between">
                                                        <div>Account ID</div>
                                                        <b>
                                                            {
                                                                task
                                                                    .proposals[0]
                                                                    .accountId
                                                            }
                                                        </b>
                                                    </Stack>
                                                </List.Item>
                                                <List.Item>
                                                    <Stack justifyContent="space-between">
                                                        <div>Cover letter</div>
                                                        <b>
                                                            {
                                                                task
                                                                    .proposals[0]
                                                                    .coverLetter
                                                            }
                                                        </b>
                                                    </Stack>
                                                </List.Item>
                                                <List.Item>
                                                    <Stack justifyContent="space-between">
                                                        <div>Price</div>
                                                        <b>
                                                            {`${task.proposals[0].price} Ⓝ`}
                                                        </b>
                                                    </Stack>
                                                </List.Item>
                                            </List>
                                        </Panel>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Panel header="Proof of work" bordered>
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
                                            {task.status ===
                                                JobStatus.WORKER_SUBMITTED && (
                                                <Stack
                                                    justifyContent="flex-end"
                                                    spacing={10}
                                                >
                                                    <Button
                                                        appearance="primary"
                                                        loading={
                                                            validateWorkLoading
                                                        }
                                                        onClick={() => {
                                                            handleValidateWork({
                                                                taskId: task.taskId,
                                                            });
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
                                                            handleRejectWork({
                                                                taskId: task.taskId,
                                                            });
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </Stack>
                                            )}
                                        </Panel>
                                    </Col>
                                </Row>
                            </Grid>
                            <div style={{ marginBottom: 15 }} />
                        </>
                    )}
            </Drawer.Body>
        </Drawer>
    );
};
