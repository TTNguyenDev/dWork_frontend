import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Row, Col, Button, Avatar, Panel, Stack } from 'rsuite';
import { AccountTypes } from '../../models/types/accountType';
import { Job } from '../../models/types/jobType';
import { RootState } from '../../store';
// @ts-ignore
import ReactReadMoreReadLess from 'react-read-more-read-less';
import classes from './jobCard.module.less';
import Countdown, { zeroPad } from 'react-countdown';
import { SubmitWorkModal } from '../submitWorkModal';

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
        return (
            profile.data.info?.type === AccountTypes.REQUESTER ||
            job.availableUntil < Date.now() ||
            job.proposals.length >= job.maxParticipants
        );
    }, [profile.data.info]);

    return (
        <>
            <Panel bordered>
                <Grid fluid className={classes.root}>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={16}>
                            <h5 className={classes.title}>{job.title}</h5>
                        </Col>
                        <Col
                            xs={24}
                            sm={24}
                            md={8}
                            style={{ textAlign: 'right', fontSize: '1.05em' }}
                        >
                            <b>{`${job.price} Ⓝ`}</b>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={16}>
                            <div style={{ marginBottom: 15 }}>
                                <ReactReadMoreReadLess
                                    charLimit={180}
                                    readMoreText={'read more'}
                                    readLessText={'read less'}
                                    readMoreClassName={classes.read_more}
                                    readLessClassName={classes.read_less}
                                >
                                    {job.description}
                                </ReactReadMoreReadLess>
                            </div>
                        </Col>
                        <Col
                            xs={24}
                            sm={24}
                            md={8}
                            style={{ textAlign: 'right' }}
                        >
                            <Stack direction="column" alignItems="stretch">
                                <div>
                                    {`${job.proposals.length}/${job.maxParticipants}`}
                                </div>
                                <div>
                                    <Countdown
                                        date={job.availableUntil}
                                        renderer={({
                                            hours,
                                            minutes,
                                            seconds,
                                        }) =>
                                            `${zeroPad(hours)}:${zeroPad(
                                                minutes
                                            )}:${zeroPad(seconds)}`
                                        }
                                    />
                                </div>
                            </Stack>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={16}>
                            <i
                                className={classes.owner}
                                style={{ color: '#555' }}
                            >{`Create by: ${job.owner}`}</i>
                        </Col>
                        <Col
                            xs={24}
                            sm={24}
                            md={8}
                            style={{ textAlign: 'right' }}
                        >
                            {!bidBtnHide && (
                                <Button
                                    appearance="primary"
                                    size="sm"
                                    onClick={handleOpen}
                                    disabled={bidBtnDisabled}
                                >
                                    {bidBtnDisabled
                                        ? 'Submitted'
                                        : 'Submit now'}
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Grid>
            </Panel>

            <SubmitWorkModal
                taskId={job.taskId}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </>
    );
};
