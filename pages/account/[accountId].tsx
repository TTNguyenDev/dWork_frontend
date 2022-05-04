import React from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './account.module.less';
import { Button, Col, Container, Divider, Row, Stack } from 'rsuite';
import { AccountTypes } from '../../models/types/accountType';
import { ListTasks } from '../../components/listTasks';
import { AccountInfoCard } from '../../components/accountInfoCard';
import { Wrapper } from '../../components/wrapper';
import { AccountTasksFilter } from '../../components/accountTasksFilter';
import { useListJobs } from '../../hooks/useListJobs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TaskStatus } from '../../models/types/jobType';

export default function AccountPage() {
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
        defaultFilter: {
            type: 'account',
            status: TaskStatus.AVAILABLE,
            maxAvailableUntil: '',
            minAvailableUntil: Date.now(),
        },
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
                                            editable
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
                                        {/*<Button
                                            style={{ width: '100%' }}
                                            appearance="subtle"
                                        >
                                            Settings
                                        </Button>*/}
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
                </Container>
            </Layout>
        </>
    );
}
