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

export default function AccountPage() {
    const {
        authLoading,
        logged,
        profileLoading,
        profileInfo,
        jobsAvailableLoading,
        jobsAvailable,
        jobsProcessingLoading,
        jobsProcessing,
        jobsCompletedLoading,
        jobsCompleted,
    } = useHomePage();

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
                                    {profileInfo && (
                                        <AccountInfoCard
                                            accountId={profileInfo.accountId}
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
                                    <AccountTasksFilter />
                                </div>
                                <div className={classes.main}>
                                    <ListTasks
                                        isCreatable
                                        tasks={jobsAvailable}
                                        isLoading={jobsAvailableLoading}
                                        gridBreakpoints={{
                                            lg: 8,
                                            md: 8,
                                            sm: 12,
                                            xs: 24,
                                        }}
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
                        profileInfo &&
                        profileInfo.type === AccountTypes.WORKER && (
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
                        profileInfo &&
                        profileInfo.type === AccountTypes.REQUESTER && (
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
