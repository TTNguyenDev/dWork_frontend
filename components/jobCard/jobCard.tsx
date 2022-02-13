import React from 'react';
import { Grid, Row, Col, Button } from 'rsuite';
import { Job } from '../../models/types/jobType';
import classes from './jobCard.module.less';

interface JobCardProps {
    job: Job;
}

export const JobCard: React.FunctionComponent<JobCardProps> = ({ job }) => {
    return (
        <Grid fluid className={classes.root}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={16}>
                    <h5 className={classes.title}>{job.title}</h5>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <b>{`${job.hourRate}/h`}</b>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={16}>
                    <small>{job.description}</small>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <Button appearance="primary" size="sm">
                        Bid now
                    </Button>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <div className={classes.owner}>{job.owner}</div>
                </Col>
            </Row>
        </Grid>
    );
};
