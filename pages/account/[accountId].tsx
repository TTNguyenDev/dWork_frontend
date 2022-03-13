import React from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './account.module.less';
import { Container, Divider } from 'rsuite';
import { useHomePage } from '../../hooks/useHomePage';
import { Loader } from '../../components/loader';
import { Job, JobType } from '../../models/types/jobType';
import { AccountTypes } from '../../models/types/accountType';
import { TasksTable } from '../../components/tasksTable';
import { TaskDetailsDrawer } from '../../components/taskDetailsDrawer';

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

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [drawerData, setDrawerData] =
        React.useState<{ taskId: string; type: JobType }>();
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
                                        setOpenDrawer={setOpenDrawer}
                                        setDrawerData={setDrawerData}
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
                                        setOpenDrawer={setOpenDrawer}
                                        setDrawerData={setDrawerData}
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
                                        setOpenDrawer={setOpenDrawer}
                                        setDrawerData={setDrawerData}
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
                                        setOpenDrawer={setOpenDrawer}
                                        setDrawerData={setDrawerData}
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
                                        setOpenDrawer={setOpenDrawer}
                                        setDrawerData={setDrawerData}
                                    />
                                </div>
                            </>
                        )}
                    <TaskDetailsDrawer
                        taskId={drawerData?.taskId}
                        type={drawerData?.type}
                        open={openDrawer}
                        setOpen={setOpenDrawer}
                    />
                </Container>
            </Layout>
        </>
    );
}
