import React from 'react';
import { Col, Divider, Drawer, Grid, Row } from 'rsuite';
import { Job } from '../../models/types/jobType';
import { ProposalsTable } from '../proposalsTable';
import classes from './taskDetailsDrawer.module.less';

interface TaskDetailsDrawerProps {
    task?: Job;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const TaskDetailsDrawer: React.FunctionComponent<
    TaskDetailsDrawerProps
> = ({ task, open, setOpen }) => {
    if (!task) return null;

    return (
        <Drawer full open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
                <Drawer.Title>Task details</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <Grid fluid>
                    <Row className="show-grid">
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
                    <Row className="show-grid">
                        <Col xs={24}>
                            <h6 style={{ marginBottom: 5 }}>Description</h6>
                            <p style={{ marginBottom: 15 }}>
                                {task.description}
                            </p>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Hour rate</h6>
                            <p style={{ marginBottom: 15 }}>{task.hourRate}</p>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Title</h6>
                            <p style={{ marginBottom: 15 }}>
                                {task.hourEstimation}
                            </p>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h6 style={{ marginBottom: 5 }}>Description</h6>
                            <p style={{ marginBottom: 15 }}>{task.status}</p>
                        </Col>
                    </Row>
                </Grid>
                <Divider />
                <h6 style={{ marginBottom: 5 }}>Proposals</h6>
                <ProposalsTable task={task} proposals={task.proposals} />
            </Drawer.Body>
        </Drawer>
    );
};
