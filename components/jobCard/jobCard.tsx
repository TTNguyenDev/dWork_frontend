import React from 'react';
import { Grid, Row, Col, Panel, Stack } from 'rsuite';
import { Task } from '../../models/types/jobType';
import classes from './jobCard.module.less';
import { useRouter } from 'next/router';
import moment from 'moment';
import randomColor from 'randomcolor';
import { BsClock, BsPeople } from 'react-icons/bs';
import { Wrapper } from '../wrapper';

interface JobCardProps {
    task: Task;
}

export const JobCard: React.FunctionComponent<JobCardProps> = ({ task }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`task/${task.taskId}`);
    };

    const bgBadgeCategory = React.useMemo(
        () =>
            randomColor({
                luminosity: 'dark',
            }),
        []
    );

    return (
        <>
            <Wrapper className={classes.root}>
                <Panel onClick={handleViewDetails}>
                    <Grid fluid>
                        <Row gutter={16} style={{ marginBottom: 15 }}>
                            <Col xs={24} sm={24} md={24}>
                                <Stack justifyContent="space-between">
                                    <div
                                        className={classes.badge_category}
                                        style={{
                                            background: bgBadgeCategory,
                                        }}
                                    >
                                        {task.categoryId.replaceAll('_', ' ')}
                                    </div>
                                    <div
                                        className={classes.price}
                                    >{`${task.price} NEAR`}</div>
                                </Stack>
                            </Col>
                        </Row>
                        <Row
                            gutter={16}
                            style={{ marginBottom: 15, height: 100 }}
                        >
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                style={{ marginBottom: 10 }}
                            >
                                <h5 className={classes.title}>{task.title}</h5>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                                <div className={classes.desc}>
                                    {task.description.replace(
                                        /<(.|\n)*?>/g,
                                        ' '
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginBottom: 5 }}>
                            <Col xs={24} sm={24} md={24}>
                                <Stack justifyContent="space-between">
                                    <Stack
                                        className={classes.info_item}
                                        spacing={10}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#000',
                                            }}
                                        >
                                            <BsClock size={16} />
                                        </div>
                                        <div>{`${moment(
                                            task.availableUntil
                                        ).format('DD/MM/YYYY hh:mm')}`}</div>
                                    </Stack>
                                    <Stack
                                        className={classes.info_item}
                                        spacing={10}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#000',
                                            }}
                                        >
                                            <BsPeople size={16} />
                                        </div>
                                        <div>
                                            {`${task.proposals.length}/${task.maxParticipants}`}
                                        </div>
                                    </Stack>
                                </Stack>
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
            </Wrapper>
        </>
    );
};
