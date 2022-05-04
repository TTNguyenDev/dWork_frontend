import React, { useMemo, useState } from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './task.module.less';
import { Button, Col, Container, Grid, Row, Stack } from 'rsuite';
import { Loader } from '../../components/loader';
import { useQuery } from 'react-query';
import { useMarkATaskAsCompleted } from '../../hooks/useMarkATaskAsCompleted';
import { TaskService } from '../../services/jobService';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Wrapper } from '../../components/wrapper';
import { AccountInfoCard } from '../../components/accountInfoCard';
import { SubmitWorkButton } from '../../components/submitWorkButton';
import Select from 'react-select';
import { ProposalItem } from '../../components/proposalItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Proposal } from '../../models/types/jobType';
import { Badge } from '@chakra-ui/react';
import { HtmlIPFS } from '../../components/htmlIPFS';

const PROPOSAL_STATUS_SELECT_OPTIONS = [
    {
        label: 'All',
        value: 'all',
    },
    {
        label: 'Pending',
        value: 'pending',
    },
    {
        label: 'Approved',
        value: 'approved',
    },
    {
        label: 'Rejected',
        value: 'rejected',
    },
];

export default function TaskDetailsPage() {
    const router = useRouter();
    const taskId = router.query.taskId as string;
    const profile = useSelector((state: RootState) => state.profile);

    const { markATaskAsCompletedLoading, handleMarkATaskAsCompleted } =
        useMarkATaskAsCompleted();

    const { data: task, isLoading } = useQuery(
        taskId,
        () => TaskService.fetchTaskById(taskId),
        {
            enabled: !!taskId,
        }
    );

    const isNotAvailable = React.useMemo(
        () =>
            task
                ? task.availableUntil < Date.now() ||
                  (task.availableUntil >= Date.now() &&
                      task.maxParticipants ===
                          task.proposals.filter((p) => p.isApproved).length)
                : undefined,
        [task]
    );

    const isOwner = React.useMemo(
        () => task?.owner === profile.data.info?.accountId,
        [task?.owner, profile.data.info?.accountId]
    );

    const markCompleteButton = React.useMemo(() => {
        if (profile.data.info && taskId)
            return (
                task?.owner === profile.data.info.accountId &&
                isNotAvailable && (
                    <Button
                        appearance="primary"
                        loading={markATaskAsCompletedLoading}
                        onClick={() =>
                            handleMarkATaskAsCompleted({
                                taskId: taskId,
                            })
                        }
                    >
                        Mark task as completed
                    </Button>
                )
            );

        return null;
    }, [taskId, profile.data.info, markATaskAsCompletedLoading]);

    const [filterStatus, setFilterStatus] = useState('all');

    const proposal: Proposal[] = useMemo(() => {
        if (task?.proposals && profile.data.info) {
            return task.proposals.filter((p) => {
                if (task?.owner === profile.data.info?.accountId) {
                    switch (filterStatus) {
                        case 'pending':
                            return !p.isApproved && !p.isRejected;
                        case 'approved':
                            return p.isApproved;
                        case 'rejected':
                            return p.isRejected;
                        default:
                            return true;
                    }
                } else return p.accountId === profile.data.info?.accountId;
            });
        }

        return [];
    }, [task, profile.data.info, filterStatus]);

    const checkCompletedQuery = useQuery(
        [taskId, 'check_completed'],
        () => TaskService.checkTaskCompleted(taskId),
        {
            enabled: !!taskId,
        }
    );

    return (
        <>
            <Header>
                <title>{task ? task.title : taskId}</title>
            </Header>
            <Layout activeKey="one">
                <Container className={classes.container}>
                    <Stack justifyContent="space-between" alignItems="center">
                        <h3 className={classes.title}>
                            {task ? task.title : taskId}
                        </h3>
                        {!checkCompletedQuery.isLoading ? (
                            checkCompletedQuery.data ? (
                                <Badge
                                    colorScheme="green"
                                    p="5px 10px"
                                    fontSize="1em"
                                    fontWeight="800"
                                    borderRadius="2xl"
                                >
                                    Completed
                                </Badge>
                            ) : (
                                markCompleteButton
                            )
                        ) : null}
                    </Stack>
                    <div>
                        <Grid fluid>
                            <Row gutter={30}>
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={17}
                                    style={{ marginBottom: 20 }}
                                >
                                    <div className={classes.left}>
                                        {isLoading || !task ? (
                                            <Loader />
                                        ) : (
                                            <div style={{ margin: '0 -7.5px' }}>
                                                <Grid fluid>
                                                    <Row gutter={15}>
                                                        <Col
                                                            xs={12}
                                                            sm={8}
                                                            md={8}
                                                        >
                                                            <Wrapper
                                                                className={[
                                                                    classes.info_card,
                                                                    classes.bg_gr_purple,
                                                                ].join(' ')}
                                                            >
                                                                <h6
                                                                    className={
                                                                        classes.info_card_title
                                                                    }
                                                                >
                                                                    Bounty prize
                                                                </h6>
                                                                <p
                                                                    className={
                                                                        classes.info_card_content
                                                                    }
                                                                >
                                                                    {`${task.price} NEAR`}
                                                                </p>
                                                            </Wrapper>
                                                        </Col>
                                                        <Col
                                                            xs={12}
                                                            sm={8}
                                                            md={8}
                                                        >
                                                            <Wrapper
                                                                className={[
                                                                    classes.info_card,
                                                                    classes.bg_gr_blue,
                                                                ].join(' ')}
                                                            >
                                                                <h6
                                                                    className={
                                                                        classes.info_card_title
                                                                    }
                                                                >
                                                                    Applicants
                                                                </h6>
                                                                <p
                                                                    className={
                                                                        classes.info_card_content
                                                                    }
                                                                >
                                                                    {`${task.proposals.length}/${task.maxParticipants}`}
                                                                </p>
                                                            </Wrapper>
                                                        </Col>
                                                        <Col
                                                            xs={24}
                                                            sm={8}
                                                            md={8}
                                                        >
                                                            <Wrapper
                                                                className={[
                                                                    classes.info_card,
                                                                    classes.bg_gr_green,
                                                                ].join(' ')}
                                                            >
                                                                <h6
                                                                    className={
                                                                        classes.info_card_title
                                                                    }
                                                                >
                                                                    Deadline
                                                                </h6>
                                                                <div
                                                                    className={
                                                                        classes.info_card_content
                                                                    }
                                                                >
                                                                    {moment(
                                                                        task.availableUntil
                                                                    ).format(
                                                                        'DD/MM/YYYY hh:mm'
                                                                    )}
                                                                </div>
                                                            </Wrapper>
                                                        </Col>
                                                    </Row>
                                                </Grid>
                                            </div>
                                        )}
                                        {isLoading || !task ? null : (
                                            <Wrapper
                                                className={classes.task_section}
                                            >
                                                <div
                                                    className={
                                                        classes.task_section_header
                                                    }
                                                >
                                                    <h6
                                                        className={
                                                            classes.task_section_title
                                                        }
                                                    >
                                                        Description
                                                    </h6>
                                                </div>
                                                <div>
                                                    <HtmlIPFS
                                                        cid={task.description}
                                                        queryKey="task_description"
                                                    />
                                                </div>
                                            </Wrapper>
                                        )}
                                        {isLoading || !task ? null : (
                                            <Wrapper
                                                className={classes.task_section}
                                            >
                                                <div
                                                    className={
                                                        classes.task_section_header
                                                    }
                                                >
                                                    <h6
                                                        className={
                                                            classes.task_section_title
                                                        }
                                                    >
                                                        Proposals
                                                    </h6>
                                                    {isOwner && (
                                                        <Select
                                                            options={
                                                                PROPOSAL_STATUS_SELECT_OPTIONS
                                                            }
                                                            isSearchable={false}
                                                            defaultValue={
                                                                PROPOSAL_STATUS_SELECT_OPTIONS[0]
                                                            }
                                                            components={{
                                                                IndicatorSeparator:
                                                                    () => null,
                                                            }}
                                                            styles={{
                                                                control: (
                                                                    base
                                                                ) => ({
                                                                    ...base,
                                                                    minWidth: 120,
                                                                    fontWeight: 600,
                                                                    border: 'none',
                                                                    background:
                                                                        '#f7f7fa',
                                                                    color: '#575757',
                                                                    borderRadius: 6,
                                                                    cursor: 'pointer',
                                                                }),
                                                            }}
                                                            onChange={(
                                                                item: any
                                                            ) =>
                                                                setFilterStatus(
                                                                    item.value
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    {proposal.length ? (
                                                        <>
                                                            <Grid fluid>
                                                                {proposal.map(
                                                                    (p) => (
                                                                        <ProposalItem
                                                                            key={
                                                                                p.accountId
                                                                            }
                                                                            data={
                                                                                p
                                                                            }
                                                                            task={
                                                                                task
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </Grid>
                                                            <div
                                                                style={{
                                                                    marginBottom: 15,
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        'Empty'
                                                    )}
                                                </div>
                                            </Wrapper>
                                        )}
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={7}>
                                    <Wrapper
                                        className={classes.owner_info}
                                        style={{ marginBottom: 20 }}
                                    >
                                        {task && (
                                            <AccountInfoCard
                                                accountId={task.owner}
                                            />
                                        )}
                                    </Wrapper>
                                    {task && (
                                        <SubmitWorkButton
                                            task={task}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Container>
            </Layout>
        </>
    );
}
