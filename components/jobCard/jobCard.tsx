import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Row, Col, Button, Panel, Stack } from 'rsuite';
import { AccountTypes } from '../../models/types/accountType';
import { Job } from '../../models/types/jobType';
import { RootState } from '../../store';
// @ts-ignore
import ReactReadMoreReadLess from 'react-read-more-read-less';
import classes from './jobCard.module.less';
import Countdown, { zeroPad } from 'react-countdown';
import { SubmitWorkModal } from '../submitWorkModal';
import { BsClock, BsFillPeopleFill, BsPeopleFill } from 'react-icons/bs';
import Avatar from 'react-avatar';

interface JobCardProps {
    job: Job;
    handleViewDetails: (data: Job) => void;
}

export const JobCard: React.FunctionComponent<JobCardProps> = ({
    job,
    handleViewDetails,
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const auth = useSelector((state: RootState) => state.auth);
    const profile = useSelector((state: RootState) => state.profile);

    const registerBtnDisabled = useMemo(() => {
        return !!job.proposals.find((p) => p.accountId === auth.data.userId);
    }, [job, auth.data.userId]);

    const registerBtnHide = useMemo(() => {
        return (
            profile.data.info?.type === AccountTypes.REQUESTER ||
            job.availableUntil < Date.now() ||
            job.proposals.length >= job.maxParticipants
        );
    }, [profile.data.info]);

    return (
        <>
            <Panel
                bordered
                style={{ cursor: 'pointer' }}
                onClick={() => handleViewDetails(job)}
            >
                <Grid
                    fluid
                    className={classes.root}
                    style={{ opacity: registerBtnHide ? 0.5 : 1 }}
                >
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
                            <div
                                className={classes.price}
                            >{`${job.price} Ⓝ`}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: 10 }}>
                        <Col xs={24} sm={24} md={16}>
                            <div
                                style={{
                                    marginBottom: 15,
                                    wordBreak: 'break-word',
                                }}
                            >
                                <ReactReadMoreReadLess
                                    charLimit={180}
                                    readMoreText={''}
                                    readLessText={''}
                                    readMoreClassName={classes.read_more}
                                    readLessClassName={classes.read_less}
                                >
                                    {job.description.replace(
                                        /<(.|\n)*?>/g,
                                        ' '
                                    )}
                                </ReactReadMoreReadLess>
                            </div>
                        </Col>
                        <Col
                            xs={24}
                            sm={24}
                            md={8}
                            style={{ textAlign: 'right' }}
                        >
                            {!registerBtnHide && (
                                <Button
                                    appearance="primary"
                                    size="sm"
                                    onClick={(e) => {
                                        handleOpen();
                                        e.stopPropagation();
                                    }}
                                    disabled={registerBtnDisabled}
                                >
                                    {registerBtnDisabled
                                        ? 'Submitted'
                                        : 'Submit now'}
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Stack spacing={15}>
                                <Stack
                                    className={classes.owner}
                                    style={{ color: '#555' }}
                                    spacing={5}
                                >
                                    <Avatar
                                        size="1.5em"
                                        textSizeRatio={1.75}
                                        round
                                        name={job.owner}
                                    />
                                    <div className={classes.owner}>
                                        {job.owner}
                                    </div>
                                </Stack>
                                <Stack
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    spacing={5}
                                    className={classes.applicants}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <BsPeopleFill />
                                    </div>
                                    {`${job.proposals.length}/${job.maxParticipants} Applicants`}
                                </Stack>
                                <div style={{ marginBottom: 5 }} />
                                {job.availableUntil < Date.now() ? (
                                    <div style={{ color: 'red' }}>Expired</div>
                                ) : (
                                    <Stack
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        spacing={5}
                                        className={classes.countdown}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <BsClock />
                                        </div>
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
                                    </Stack>
                                )}
                            </Stack>
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
