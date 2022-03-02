import React from 'react';
import Header from 'next/head';
import { Layout } from '../components/layout';
import classes from './index.module.less';
import { Button, Col, Container, FlexboxGrid, List, Stack } from 'rsuite';
import createTaskLogo from '../assets/logos/create-task.png';
import makeMoneyLogo from '../assets/logos/make-money.png';
import { useHomePage } from '../hooks/useHomePage';
import { Loader } from '../components/loader';
import { JobCard } from '../components/jobCard';
import { Job } from '../models/types/jobType';
import { TaskDetailsDrawer } from '../components/taskDetailsDrawer';

export default function Home() {
    const {
        authLoading,
        logged,
        createTaskBtnLoading,
        makeMoneyBtnLoading,
        handleCreateTaskBtnClick,
        handleMakeMoneyBtnClick,
        jobs,
        listJobsLoading,
        profileLoading,
        profileInfo,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useHomePage();

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [drawerData, setDrawerData] = React.useState<Job>();

    const handleViewDetails = React.useCallback((data: Job) => {
        setDrawerData(data);
        setOpenDrawer(true);
    }, []);

    return (
        <>
            <Header>
                <title>Home</title>
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
                    {!authLoading && !profileLoading && profileInfo && (
                        <>
                            <h3
                                style={{
                                    marginBottom: 15,
                                    textAlign: 'center',
                                }}
                            >
                                Tasks
                            </h3>
                            <div className={classes.search_wrapper}></div>
                            <div className={classes.list_jobs_wrapper}>
                                {listJobsLoading ? (
                                    <Loader />
                                ) : (
                                    <Stack
                                        direction="column"
                                        alignItems="stretch"
                                        spacing={30}
                                        className={classes.list_jobs}
                                    >
                                        {(!jobs || !jobs.length) && (
                                            <div>No jobs</div>
                                        )}
                                        {jobs &&
                                            !!jobs.length &&
                                            jobs.map((job: Job) => (
                                                <JobCard
                                                    job={job}
                                                    key={job.taskId}
                                                    handleViewDetails={
                                                        handleViewDetails
                                                    }
                                                />
                                            ))}
                                        <div style={{ textAlign: 'center' }}>
                                            <Button
                                                size="lg"
                                                appearance="primary"
                                                onClick={fetchNextPage}
                                                loading={isFetchingNextPage}
                                                disabled={!hasNextPage}
                                            >
                                                View More
                                            </Button>
                                        </div>
                                    </Stack>
                                )}
                                <TaskDetailsDrawer
                                    task={drawerData}
                                    open={openDrawer}
                                    setOpen={setOpenDrawer}
                                />
                            </div>
                            <div style={{ marginBottom: 50 }} />
                        </>
                    )}
                </Container>
            </Layout>
        </>
    );
}
