import React from 'react';
import { Grid, Row, Col, Panel, Stack, Badge } from 'rsuite';
import { Job } from '../../models/types/jobType';
// @ts-ignore
import ReactReadMoreReadLess from 'react-read-more-read-less';
import classes from './jobCard.module.less';
import Countdown, { zeroPad } from 'react-countdown';
import { BsClock, BsPeopleFill } from 'react-icons/bs';
import Avatar from 'react-avatar';
import { SubmitWorkButton } from '../submitWorkButton';
import { useRouter } from 'next/router';

interface JobCardProps {
    task: Job;
}

export const JobCard: React.FunctionComponent<JobCardProps> = ({ task }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`task/${task.taskId}`);
    };

    return (
        <>
            <Panel
                bordered
                style={{ cursor: 'pointer' }}
                onClick={handleViewDetails}
            >
                <Grid
                    fluid
                    className={classes.root}
                    style={{
                        opacity:
                            task.availableUntil < Date.now() ||
                            task.proposals.length >= task.maxParticipants
                                ? 0.5
                                : 1,
                    }}
                >
                    <Row gutter={16} style={{ marginBottom: 10 }}>
                        <Col xs={24} sm={24} md={24}>
                            <Badge
                                content={task.categoryId}
                                color="blue"
                                style={{ padding: '2px 5px', fontWeight: 600 }}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={16}>
                            <h5 className={classes.title}>{task.title}</h5>
                        </Col>
                        <Col
                            xs={24}
                            sm={24}
                            md={8}
                            style={{ textAlign: 'right', fontSize: '1.05em' }}
                        >
                            <div
                                className={classes.price}
                            >{`${task.price} Ⓝ`}</div>
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
                                    {task.description.replace(
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
                            <SubmitWorkButton task={task} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Stack spacing={15} style={{ flexWrap: 'wrap' }}>
                                <Stack
                                    className={classes.owner}
                                    style={{ color: '#555' }}
                                    spacing={5}
                                >
                                    <Avatar
                                        size="1.5em"
                                        textSizeRatio={1.75}
                                        round
                                        name={task.owner}
                                    />
                                    <div className={classes.owner}>
                                        {task.owner}
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
                                    {`${task.proposals.length}/${task.maxParticipants} Applicants`}
                                </Stack>
                                <div style={{ marginBottom: 5 }} />
                                {task.availableUntil < Date.now() ? (
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
                                            date={task.availableUntil}
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
        </>
    );
};
