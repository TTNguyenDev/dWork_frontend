import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Row, Col, Button } from 'rsuite';
import { useBidJob } from '../../hooks/useBidJob';
import { AccountTypes } from '../../models/types/accountType';
import { Job } from '../../models/types/jobType';
import { RootState } from '../../store';
import { BidJobModal } from '../bidJobModal';
import classes from './jobCard.module.less';

interface JobCardProps {
    job: Job;
}

export const JobCard: React.FunctionComponent<JobCardProps> = ({ job }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const auth = useSelector((state: RootState) => state.auth);
    const profile = useSelector((state: RootState) => state.profile);

    const bidBtnDisabled = useMemo(() => {
        return !!job.proposals.find((p) => p.accountId === auth.data.userId);
    }, [job, auth.data.userId]);

    const bidBtnHide = useMemo(() => {
        return profile.data.info?.type === AccountTypes.REQUESTER;
    }, [profile.data.info]);

    return (
        <>
            <Grid fluid className={classes.root}>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={16}>
                        <h5 className={classes.title}>{job.title}</h5>
                    </Col>
                    <Col xs={24} sm={24} md={8} style={{ textAlign: 'right' }}>
                        <b>{`${job.hourRate}/h`}</b>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={16}>
                        <small>{job.description}</small>
                    </Col>
                    <Col xs={24} sm={24} md={8} style={{ textAlign: 'right' }}>
                        {!bidBtnHide && (
                            <Button
                                appearance="primary"
                                size="sm"
                                onClick={handleOpen}
                                disabled={bidBtnDisabled}
                            >
                                Bid now
                            </Button>
                        )}
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col>
                        <div className={classes.owner}>{job.owner}</div>
                    </Col>
                </Row>
            </Grid>
            <BidJobModal
                taskId={job.taskId}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </>
    );
};
