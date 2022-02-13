import React from 'react';
import Header from 'next/head';
import { Layout } from '../components/layout';
import classes from './index.module.less';
import { Button, Col, Container, FlexboxGrid, Grid, List, Row } from 'rsuite';
import createTaskLogo from '../assets/logos/create-task.png';
import makeMoneyLogo from '../assets/logos/make-money.png';
import { useHomePage } from '../hooks/useHomePage';
import { Loader } from '../components/loader';
import { JobCard } from '../components/jobCard';
import { Job } from '../models/types/jobType';
import { AccountTypes } from '../models/types/accountType';

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
    } = useHomePage();

    return (
        <>
            <Header>
                <title>Homepage</title>
            </Header>
            <Layout activeKey="one">
                <Container className={classes.container}>
                    {authLoading && <Loader />}
                    {!authLoading && !profileInfo && (
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
                                        <desc
                                            className={classes.card_intro_desc}
                                        >
                                            Human intelligence through an API.
                                            Access a global, on-demand, 24/7
                                            workforce.
                                        </desc>
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
                                            <desc
                                                className={
                                                    classes.card_intro_desc
                                                }
                                            >
                                                Make money in your spare time.
                                                Get paid for completing simple
                                                tasks.
                                            </desc>
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
                </Container>
            </Layout>
        </>
    );
}
