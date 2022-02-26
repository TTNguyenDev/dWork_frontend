import React from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './account.module.less';
import { Button, Container, Divider } from 'rsuite';
import { useHomePage } from '../../hooks/useHomePage';
import { Loader } from '../../components/loader';
import { Job } from '../../models/types/jobType';
import { AccountTypes } from '../../models/types/accountType';
import { ModalsController } from '../../utils/modalsController';
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
    const [drawerData, setDrawerData] = React.useState<Job>();

    return (
        <>
            <Header>
                <title>My Account</title>
            </Header>
            <Layout activeKey="one">
                <Container className={classes.container}>
                    <h3 style={{ marginBottom: 50 }}>My Account</h3>

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
                                        handleViewBtnClick={(task: Job) => {
                                            setDrawerData({ ...task });
                                            setOpenDrawer(true);
                                        }}
                                    />
                                </div>
                                <TaskDetailsDrawer
                                    task={drawerData}
                                    open={openDrawer}
                                    setOpen={setOpenDrawer}
                                />
                                <Divider />
                                <h5 style={{ marginBottom: 15 }}>
                                    Completed Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="completed"
                                        tasks={(jobsCompleted as any) ?? []}
                                        loading={jobsCompletedLoading}
                                        handleViewBtnClick={(task: Job) => {
                                            setDrawerData({ ...task });
                                            setOpenDrawer(true);
                                        }}
                                    />
                                </div>
                                <TaskDetailsDrawer
                                    task={drawerData}
                                    open={openDrawer}
                                    setOpen={setOpenDrawer}
                                />
                            </>
                        )}
                    {!authLoading &&
                        !profileLoading &&
                        profileInfo &&
                        profileInfo.type === AccountTypes.REQUESTER && (
                            <>
                                <div style={{ textAlign: 'right' }}>
                                    <Button
                                        appearance="primary"
                                        onClick={
                                            ModalsController.controller
                                                .openCreateTaskModal
                                        }
                                    >
                                        New Task
                                    </Button>
                                </div>
                                <Divider />
                                <h5 style={{ marginBottom: 15 }}>
                                    Available Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="available"
                                        tasks={(jobsAvailable as any) ?? []}
                                        loading={jobsAvailableLoading}
                                        handleViewBtnClick={(task: Job) => {
                                            setDrawerData(task);
                                            setOpenDrawer(true);
                                        }}
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
                                        handleViewBtnClick={(task: Job) => {
                                            setDrawerData(task);
                                            setOpenDrawer(true);
                                        }}
                                    />
                                </div>
                                <TaskDetailsDrawer
                                    task={drawerData}
                                    open={openDrawer}
                                    setOpen={setOpenDrawer}
                                />
                                <Divider />
                                <h5 style={{ marginBottom: 15 }}>
                                    Completed Tasks
                                </h5>
                                <div>
                                    <TasksTable
                                        type="completed"
                                        tasks={(jobsCompleted as any) ?? []}
                                        loading={jobsCompletedLoading}
                                        handleViewBtnClick={(task: Job) => {
                                            setDrawerData(task);
                                            setOpenDrawer(true);
                                        }}
                                    />
                                </div>
                                <TaskDetailsDrawer
                                    task={drawerData}
                                    open={openDrawer}
                                    setOpen={setOpenDrawer}
                                />
                            </>
                        )}
                </Container>
            </Layout>
        </>
    );
}
