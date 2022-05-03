import React from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './index.module.less';
import { Button, Col, Container, FlexboxGrid } from 'rsuite';
import createTaskLogo from '../../assets/logos/create-task.png';
import makeMoneyLogo from '../../assets/logos/make-money.png';
import { useHomePage } from '../../hooks/useHomePage';
import { Loader } from '../../components/loader';
import { ListTasks } from '../../components/listTasks';
import { TaskFilter } from '../../components/tasksFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

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
        filter,
        setTaskFilter,
        applyTaskFilter,
    } = useHomePage();

    const app = useSelector((state: RootState) => state.app);

    return (
        <>
            <Header>
                <title>Home</title>
            </Header>
            <Layout activeKey="one">
                {app.data.cacheReady ? (
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
                                    <FlexboxGrid.Item
                                        as={Col}
                                        colspan={24}
                                        md={6}
                                    >
                                        <section className={classes.card_intro}>
                                            <div
                                                className={
                                                    classes.card_intro_logo
                                                }
                                            >
                                                <img src={createTaskLogo.src} />
                                            </div>
                                            <h3
                                                className={
                                                    classes.card_intro_title
                                                }
                                            >
                                                Create Task
                                            </h3>
                                            <div
                                                className={
                                                    classes.card_intro_desc
                                                }
                                            >
                                                Human intelligence through an
                                                API. Access a global, on-demand,
                                                24/7 workforce.
                                            </div>
                                            {logged && (
                                                <Button
                                                    appearance="primary"
                                                    className={
                                                        classes.card_intro_btn
                                                    }
                                                    loading={
                                                        createTaskBtnLoading
                                                    }
                                                    onClick={
                                                        handleCreateTaskBtnClick
                                                    }
                                                >
                                                    Create a Requester account
                                                </Button>
                                            )}
                                        </section>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item
                                        as={Col}
                                        colspan={24}
                                        md={6}
                                    >
                                        <section className={classes.card_intro}>
                                            <div
                                                className={
                                                    classes.card_intro_body
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.card_intro_logo
                                                    }
                                                >
                                                    <img
                                                        src={makeMoneyLogo.src}
                                                    />
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
                                                    Make money in your spare
                                                    time. Get paid for
                                                    completing simple tasks.
                                                </div>
                                            </div>
                                            {logged && (
                                                <Button
                                                    appearance="primary"
                                                    className={
                                                        classes.card_intro_btn
                                                    }
                                                    loading={
                                                        makeMoneyBtnLoading
                                                    }
                                                    onClick={
                                                        handleMakeMoneyBtnClick
                                                    }
                                                >
                                                    Create a Worker account
                                                </Button>
                                            )}
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
                                        display: 'none',
                                    }}
                                >
                                    Tasks
                                </h3>
                                <div className={classes.wrapper}>
                                    <div className={classes.top}>
                                        <TaskFilter
                                            filter={filter}
                                            setTaskFilter={setTaskFilter}
                                            applyTaskFilter={applyTaskFilter}
                                        />
                                    </div>
                                    <div className={classes.main}>
                                        <ListTasks
                                            tasks={jobs}
                                            isLoading={listJobsLoading}
                                            fetchNextPage={fetchNextPage}
                                            isFetchingNextPage={
                                                isFetchingNextPage
                                            }
                                            hasNextPage={hasNextPage}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 50 }} />
                            </>
                        )}
                    </Container>
                ) : (
                    <Loader />
                )}
            </Layout>
        </>
    );
}
