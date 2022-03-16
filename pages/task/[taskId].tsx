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
                    <h3 style={{ marginBottom: 30 }}>
                        {task ? task.title : taskId}
                    </h3>

                    {isLoading || !task ? (
                        <Loader />
                    ) : (
                        <>
                            <div>
                                <Grid fluid>
                                    <Row>
                                        <Col xs={24} sm={24} md={8}>
                                            <h6 style={{ marginBottom: 5 }}>
                                                ID
                                            </h6>
                                            <p style={{ marginBottom: 15 }}>
                                                {task.taskId}
                                            </p>
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <h6 style={{ marginBottom: 5 }}>
                                                Title
                                            </h6>
                                            <p style={{ marginBottom: 15 }}>
                                                {task.title}
                                            </p>
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <h6 style={{ marginBottom: 5 }}>
                                                Owner
                                            </h6>
                                            <Stack
                                                style={{ color: '#555' }}
                                                spacing={5}
                                            >
                                                <Avatar
                                                    size="1.5em"
                                                    textSizeRatio={1.75}
                                                    round
                                                    name={task.owner}
                                                />
                                                <div>{task.owner}</div>
                                            </Stack>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24} sm={24} md={8}>
                                            <h6 style={{ marginBottom: 5 }}>
                                                Bounty prize
                                            </h6>
                                            <p
                                                style={{ marginBottom: 15 }}
                                            >{`${task.price} Ⓝ`}</p>
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <h6 style={{ marginBottom: 5 }}>
                                                Deadline
                                            </h6>
                                            <div style={{ marginBottom: 15 }}>
                                                <span
                                                    style={{
                                                        color:
                                                            task.availableUntil >=
                                                            Date.now()
                                                                ? 'green'
                                                                : 'red',
                                                    }}
                                                >
                                                    {dateFns.format(
                                                        task.availableUntil,
                                                        'yyyy-MM-dd HH:mm'
                                                    )}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <h6 style={{ marginBottom: 5 }}>
                                                Max participants
                                            </h6>
                                            <p style={{ marginBottom: 15 }}>
                                                {task.maxParticipants}
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={24}>
                                            <h6 style={{ marginBottom: 5 }}>
                                                Description
                                            </h6>

                                            <div
                                                className="ql-editor"
                                                dangerouslySetInnerHTML={{
                                                    __html: task.description,
                                                }}
                                                style={{
                                                    padding: 0,
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
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
                                    </Row>
                                </Grid>
                                <Divider />
                                <h6
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
                                )}
                            </div>
                        </>
                    )}
                </Container>
            </Layout>
        </>
    );
}
