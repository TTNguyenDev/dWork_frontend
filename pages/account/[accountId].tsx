import React from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './account.module.less';
import { Container, Divider } from 'rsuite';
import { useHomePage } from '../../hooks/useHomePage';
import { Loader } from '../../components/loader';
import { JobType } from '../../models/types/jobType';
import { AccountTypes } from '../../models/types/accountType';
import { TasksTable } from '../../components/tasksTable';

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
                    <h3 style={{ marginBottom: 30 }}>My Account</h3>

                    {(authLoading ||
                        (!authLoading && logged && profileLoading)) && (
                        <Loader />
                    )}
                    {!authLoading &&
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
                        )}
                </Container>
            </Layout>
        </>
    );
}
