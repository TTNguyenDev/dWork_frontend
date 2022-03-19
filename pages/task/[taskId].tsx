import React from 'react';
import Header from 'next/head';
import { Layout } from '../../components/layout';
import classes from './task.module.less';
import {
    Button,
    Col,
    Container,
    Divider,
    Grid,
    Panel,
    Row,
    Stack,
} from 'rsuite';
import { Loader } from '../../components/loader';
import { useQuery } from 'react-query';
import { ProposalItem } from '../../components/proposalItem';
import { SubmitWorkButton } from '../../components/submitWorkButton';
import { useMarkATaskAsCompleted } from '../../hooks/useMarkATaskAsCompleted';
import { JobService } from '../../services/jobService';
import { BlockChainConnector } from '../../utils/blockchain';
import Avatar from 'react-avatar';
import * as dateFns from 'date-fns';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Wrapper } from '../../components/wrapper';

export default function TaskDetailsPage() {
    const router = useRouter();
    const taskId = router.query.taskId as string;

    const { markATaskAsCompletedLoading, handleMarkATaskAsCompleted } =
        useMarkATaskAsCompleted();

    const { data: task, isLoading } = useQuery(
        taskId,
        () => JobService.fetchJobById(taskId),
        {
            enabled: !!taskId,
        }
    );

    const isNotAvailable = task
        ? task.availableUntil < Date.now() ||
          (task.availableUntil >= Date.now() &&
              task.maxParticipants ===
                  task.proposals.filter((p) => p.isApproved).length)
        : undefined;

    return (
        <>
            <Header>
                <title>{task ? task.title : taskId}</title>
            </Header>
            <Layout activeKey="one">
                <Container className={classes.container}>
                    <h3 className={classes.title}>
                        {task ? task.title : taskId}
                    </h3>
                    <div>
                        <Grid fluid>
                            <Row gutter={30}>
                                <Col xs={24} sm={24} md={18}>
                                    <div className={classes.left}>
                                        {isLoading || !task ? (
                                            <Loader />
                                        ) : (
                                            <div style={{ margin: '0 -7.5px' }}>
                                                <Grid fluid>
                                                    <Row gutter={15}>
                                                        <Col
                                                            xs={12}
                                                            sm={8}
                                                            md={8}
                                                        >
                                                            <Wrapper
                                                                className={[
                                                                    classes.info_card,
                                                                    classes.bg_gr_purple,
                                                                ].join(' ')}
                                                            >
                                                                <h6
                                                                    className={
                                                                        classes.info_card_title
                                                                    }
                                                                >
                                                                    Bounty prize
                                                                </h6>
                                                                <p
                                                                    className={
                                                                        classes.info_card_content
                                                                    }
                                                                >
                                                                    {`${task.price} NEAR`}
                                                                </p>
                                                            </Wrapper>
                                                        </Col>
                                                        <Col
                                                            xs={12}
                                                            sm={8}
                                                            md={8}
                                                        >
                                                            <Wrapper
                                                                className={[
                                                                    classes.info_card,
                                                                    classes.bg_gr_blue,
                                                                ].join(' ')}
                                                            >
                                                                <h6
                                                                    className={
                                                                        classes.info_card_title
                                                                    }
                                                                >
                                                                    Applicants
                                                                </h6>
                                                                <p
                                                                    className={
                                                                        classes.info_card_content
                                                                    }
                                                                >
                                                                    {`${task.proposals.length}/${task.maxParticipants}`}
                                                                </p>
                                                            </Wrapper>
                                                        </Col>
                                                        <Col
                                                            xs={24}
                                                            sm={8}
                                                            md={8}
                                                        >
                                                            <Wrapper
                                                                className={[
                                                                    classes.info_card,
                                                                    classes.bg_gr_green,
                                                                ].join(' ')}
                                                            >
                                                                <h6
                                                                    className={
                                                                        classes.info_card_title
                                                                    }
                                                                >
                                                                    Deadline
                                                                </h6>
                                                                <div
                                                                    className={
                                                                        classes.info_card_content
                                                                    }
                                                                >
                                                                    {moment(
                                                                        task.availableUntil
                                                                    ).format(
                                                                        'DD/MM/YYYY hh:mm'
                                                                    )}
                                                                </div>
                                                            </Wrapper>
                                                        </Col>
                                                    </Row>
                                                    {/* <Row>
                                        <Col xs={24}>
                                            <div
                                                style={{
                                                    marginTop: 15,
                                                    textAlign: 'right',
                                                }}
                                            >
                                                {task.owner ===
                                                    BlockChainConnector.instance
                                                        .account.accountId &&
                                                    isNotAvailable && (
                                                        <Button
                                                            size="sm"
                                                            appearance="primary"
                                                            loading={
                                                                markATaskAsCompletedLoading
                                                            }
                                                            onClick={() =>
                                                                handleMarkATaskAsCompleted(
                                                                    {
                                                                        taskId: task.taskId,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            Mark task as
                                                            completed
                                                        </Button>
                                                    )}
                                                <SubmitWorkButton task={task} />
                                            </div>
                                        </Col>
                                    </Row> */}
                                                </Grid>
                                                {/* <Divider /> */}
                                                {/* <h6
                                    style={{ marginBottom: 5 }}
                                >{`Proposals (${task.proposals.length})`}</h6>
                                <div style={{ marginBottom: 15 }} />
                                {task.proposals.length ? (
                                    <>
                                        <Grid fluid>
                                            {task.owner ===
                                                BlockChainConnector.instance
                                                    .account.accountId &&
                                                task.proposals.map((p) => (
                                                    <ProposalItem
                                                        key={p.accountId}
                                                        data={p}
                                                        task={task}
                                                    />
                                                ))}
                                            {task.proposals
                                                .filter(
                                                    (p) =>
                                                        p.accountId ===
                                                        BlockChainConnector
                                                            .instance.account
                                                            .accountId
                                                )
                                                .map((p) => (
                                                    <ProposalItem
                                                        key={p.accountId}
                                                        data={p}
                                                        task={task}
                                                    />
                                                ))}
                                        </Grid>
                                        <div style={{ marginBottom: 15 }} />
                                    </>
                                ) : (
                                    'Empty'
                                )} */}
                                            </div>
                                        )}
                                        {isLoading || !task ? (
                                            <Loader />
                                        ) : (
                                            <Wrapper
                                                className={classes.task_desc}
                                            >
                                                <h6
                                                    className={
                                                        classes.task_desc_title
                                                    }
                                                >
                                                    Description
                                                </h6>
                                                <div style={{ maxWidth: 800 }}>
                                                    <div
                                                        className="ql-editor"
                                                        dangerouslySetInnerHTML={{
                                                            __html: task.description,
                                                        }}
                                                    />
                                                </div>
                                            </Wrapper>
                                        )}
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6}>
                                    <Wrapper
                                        className={classes.owner_info}
                                        style={{ marginBottom: 20 }}
                                    >
                                        Owner info
                                    </Wrapper>
                                    <Button
                                        appearance="primary"
                                        size="lg"
                                        style={{ width: '100%' }}
                                    >
                                        Submit Now
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Container>
            </Layout>
        </>
    );
}
