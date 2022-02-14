import React from 'react';
import Header from 'next/head';
import { Layout } from '../components/layout';
import classes from './index.module.less';
import {
    Button,
    Col,
    Container,
    Divider,
    Drawer,
    FlexboxGrid,
    Grid,
    List,
    Nav,
    Row,
    Table,
} from 'rsuite';
import createTaskLogo from '../assets/logos/create-task.png';
import makeMoneyLogo from '../assets/logos/make-money.png';
import { useHomePage } from '../hooks/useHomePage';
import { Loader } from '../components/loader';
import { JobCard } from '../components/jobCard';
import { Job } from '../models/types/jobType';
import { AccountTypes } from '../models/types/accountType';
import { Wrapper } from '../components/wrapper';
import { ModalsController } from '../utils/modalsController';
import { useSelectProposal } from '../hooks/useSelectProposal';
import { TasksTable } from '../components/tasksTable';
import { TaskDetailsDrawer } from '../components/taskDetailsDrawer';

export default function Home() {
    const {
        authLoading,
        logged,
        userId,
        createTaskBtnLoading,
        makeMoneyBtnLoading,
        handleCreateTaskBtnClick,
        handleMakeMoneyBtnClick,
        jobs,
        listJobsLoading,
        profileLoading,
        profileInfo,
        jobsAvailableLoading,
        jobsAvailable,
        jobsProcessingLoading,
        jobsProcessing,
    } = useHomePage();

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [drawerData, setDrawerData] = React.useState<Job>();

    return (
        <>
            <Header>
                <title>Homepage</title>
            </Header>
            <Layout activeKey="one">
                <Container className={classes.container}>
                    {(authLoading ||
                        (!authLoading && logged && profileLoading)) && (
                        <Loader />
                    )}
                    {((!authLoading && !profileLoading && !profileInfo) ||
                        (!authLoading && !logged)) && (
                        <>
                            <h1 className={classes.title}>
                                Get Started with dWork
                            </h1>
                            <FlexboxGrid
                                justify="center"
                                className={classes.card_intro_wrapper}
                            >
                                <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                                    <section className={classes.card_intro}>
                                        <div
                                            className={classes.card_intro_logo}
                                        >
                                            <img src={createTaskLogo.src} />
                                        </div>
                                        <h3
                                            className={classes.card_intro_title}
                                        >
                                            Create Task
                                        </h3>
                                        <div
                                            className={classes.card_intro_desc}
                                        >
                                            Human intelligence through an API.
                                            Access a global, on-demand, 24/7
                                            workforce.
                                        </div>
                                        <Button
                                            appearance="primary"
                                            className={classes.card_intro_btn}
                                            loading={createTaskBtnLoading}
                                            onClick={handleCreateTaskBtnClick}
                                        >
                                            Create a Requester account
                                        </Button>
                                    </section>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                                    <section className={classes.card_intro}>
                                        <div
                                            className={classes.card_intro_body}
                                        >
                                            <div
                                                className={
                                                    classes.card_intro_logo
                                                }
                                            >
                                                <img src={makeMoneyLogo.src} />
                                            </div>
                                            <h3
                                                className={
                                                    classes.card_intro_title
                                                }
                                            >
                                                Make Money
                                            </h3>
                                            <div
                                                className={
                                                    classes.card_intro_desc
                                                }
                                            >
                                                Make money in your spare time.
                                                Get paid for completing simple
                                                tasks.
                                            </div>
                                        </div>
                                        <Button
                                            appearance="primary"
                                            className={classes.card_intro_btn}
                                            loading={makeMoneyBtnLoading}
                                            onClick={handleMakeMoneyBtnClick}
                                        >
                                            Requester a Worker account
                                        </Button>
                                    </section>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </>
                    )}
                    {!authLoading &&
                        !profileLoading &&
                        profileInfo &&
                        profileInfo.type === AccountTypes.WORKER && (
                            <>
                                <h1 className={classes.title}>Jobs</h1>
                                <div className={classes.search_wrapper}></div>
                                <div className={classes.list_jobs_wrapper}>
                                    {listJobsLoading ? (
                                        <Loader />
                                    ) : (
                                        <List className={classes.list_jobs}>
                                            {(!jobs || !jobs.length) && (
                                                <div>No jobs</div>
                                            )}
                                            {jobs &&
                                                !!jobs.length &&
                                                jobs.map((job: Job) => (
                                                    <List.Item key={job.taskId}>
                                                        <JobCard job={job} />
                                                    </List.Item>
                                                ))}
                                        </List>
                                    )}
                                </div>
                            </>
                        )}
                    {!authLoading &&
                        !profileLoading &&
                        profileInfo &&
                        profileInfo.type === AccountTypes.REQUESTER && (
                            <>
                                <div>
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
                            </>
                        )}
                </Container>
            </Layout>
        </>
    );
}
