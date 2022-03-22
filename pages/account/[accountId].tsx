import React from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './account.module.less';
import { Button, Col, Container, Divider, Row, Stack } from 'rsuite';
import { useHomePage } from '../../hooks/useHomePage';
import { Loader } from '../../components/loader';
import { TaskType } from '../../models/types/jobType';
import { AccountTypes } from '../../models/types/accountType';
import { TasksTable } from '../../components/tasksTable';
import { ListTasks } from '../../components/listTasks';
import { TaskFilter } from '../../components/tasksFilter';
import { AccountInfoCard } from '../../components/accountInfoCard';
import { Wrapper } from '../../components/wrapper';
import { BlockChainConnector } from '../../utils/blockchain';
import { AccountTasksFilter } from '../../components/accountTasksFilter';
import { useListJobs } from '../../hooks/useListJobs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';

export default function AccountPage() {
    const router = useRouter();

    const accountId = router.query.accountId as string;

    const profile = useSelector((state: RootState) => state.profile);

    const {
        loading: listJobsLoading,
        jobs,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        filterReady,
        filter,
        setTaskFilter,
        applyTaskFilter,
    } = useListJobs({
        defaultFilter: { owner: accountId },
    });

    return (
        <>
            <Header>
                <title>My Account</title>
            </Header>
            <Layout activeKey="one">
                <Container className={classes.container}>
                    <Row gutter={30}>
                        <Col
                            xs={24}
                            sm={24}
                            md={5}
                            style={{ marginBottom: 20 }}
                        >
                            <div className={classes.left}>
                                <Wrapper
                                    className={classes.owner_info}
                                    style={{ marginBottom: 20 }}
                                >
                                    {profile.data.info && (
                                        <AccountInfoCard
                                            accountId={
                                                profile.data.info.accountId
                                            }
                                        />
                                    )}
                                    <Divider />
                                    <Stack
                                        direction="column"
                                        spacing={5}
                                        alignItems="stretch"
                                        style={{
                                            padding: 10,
                                        }}
                                    >
                                        <Button
                                            style={{ width: '100%' }}
                                            appearance="subtle"
                                            active
                                        >
                                            Tasks
                                        </Button>
                                        <Button
                                            style={{ width: '100%' }}
                                            appearance="subtle"
                                        >
                                            Settings
                                        </Button>
                                    </Stack>
                                </Wrapper>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={19}>
                            <div className={classes.wrapper}>
                                <div className={classes.top}>
                                    <AccountTasksFilter
                                        filterReady={filterReady}
                                        filter={filter}
                                        setTaskFilter={setTaskFilter}
                                        applyTaskFilter={applyTaskFilter}
                                    />
                                </div>
                                <div className={classes.main}>
                                    <ListTasks
                                        isCreatable={
                                            profile.data.info?.type ===
                                            AccountTypes.REQUESTER
                                        }
                                        tasks={jobs}
                                        isLoading={listJobsLoading}
                                        gridBreakpoints={{
                                            lg: 8,
                                            md: 8,
                                            sm: 12,
                                            xs: 24,
                                        }}
                                        fetchNextPage={fetchNextPage}
                                        isFetchingNextPage={isFetchingNextPage}
                                        hasNextPage={hasNextPage}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* <h3 style={{ marginBottom: 30 }}>My Account</h3> */}

                    {/* {(authLoading ||
                        (!authLoading && logged && profileLoading)) && (
                        <Loader />
                    )} */}
                    {/* {!authLoading &&
                        !profileLoading &&
                        profile.data.info &&
                        profile.data.info.type === AccountTypes.WORKER && (
                            <>
                                <h5 style={{ marginBottom: 15 }}>
                                    Processing Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="processing"
                                        tasks={(jobsProcessing as any) ?? []}
                                        loading={jobsProcessingLoading}
                                    />
                                </div>
                                <Divider />
                                <h5 style={{ marginBottom: 15 }}>
                                    Completed Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="completed"
                                        tasks={(jobsCompleted as any) ?? []}
                                        loading={jobsCompletedLoading}
                                    />
                                </div>
                            </>
                        )}
                    {!authLoading &&
                        !profileLoading &&
                        profile.data.info &&
                        profile.data.info.type === AccountTypes.REQUESTER && (
                            <>
                                <Divider />
                                <h5 style={{ marginBottom: 15 }}>
                                    Available Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="available"
                                        tasks={(jobsAvailable as any) ?? []}
                                        loading={jobsAvailableLoading}
                                    />
                                </div>
                                <Divider />
                                <h5 style={{ marginBottom: 15 }}>
                                    Processing Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="processing"
                                        tasks={(jobsProcessing as any) ?? []}
                                        loading={jobsProcessingLoading}
                                    />
                                </div>
                                <Divider />
                                <h5 style={{ marginBottom: 15 }}>
                                    Completed Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="completed"
                                        tasks={(jobsCompleted as any) ?? []}
                                        loading={jobsCompletedLoading}
                                    />
                                </div>
                            </>
                        )} */}
                </Container>
            </Layout>
        </>
    );
}
