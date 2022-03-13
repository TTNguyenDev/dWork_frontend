import React from 'react';
import {
    Badge,
    Button,
    Col,
    Divider,
    Drawer,
    Grid,
    Panel,
    Popover,
    Row,
    Stack,
    Whisper,
} from 'rsuite';
import { useRejectWork } from '../../hooks/useRejectWork';
import { useApproveWork } from '../../hooks/useApproveWork';
import { Job, JobType, Proposal } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
import { useMarkATaskAsCompleted } from '../../hooks/useMarkATaskAsCompleted';
import Avatar from 'react-avatar';
import * as dateFns from 'date-fns';
import { useQuery } from 'react-query';
import { JobService } from '../../services/jobService';
import { Loader } from '../loader';
interface TaskDetailsDrawerProps {
    taskId?: string;
    type?: JobType;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ProposalItem = ({
    p,
    task,
    setOpen,
}: {
    p: Proposal;
    task: Job;
    setOpen: (open: boolean) => void;
}) => {
    const { approveWorkLoading, handleApproveWork } = useApproveWork();
    const { rejectWorkLoading, handleRejectWork } = useRejectWork();

    const triggerRef = React.useRef<{ open: () => void; close: () => void }>();
    const openPopoverConfirm = () => triggerRef?.current?.open();
    const closePopoverConfirm = () => triggerRef?.current?.close();

    const speaker = (handleClick: () => void, loading: boolean) => (
        <Popover title="Are you sure?">
            <Stack spacing="5px">
                <Button
                    appearance="primary"
                    size="sm"
                    loading={loading}
                    onClick={() => {
                        handleClick();
                        closePopoverConfirm();
                    }}
                >
                    Yes
                </Button>
                <Button
                    size="sm"
                    disabled={loading}
                    onClick={closePopoverConfirm}
                >
                    Cancel
                </Button>
            </Stack>
        </Popover>
    );

    return (
        <Row key={p.accountId} style={{ marginBottom: 15 }}>
            <Col xs={24} sm={24} md={24}>
                <Panel bordered>
                    <div style={{ marginBottom: 15 }}>
                        <Stack
                            style={{
                                color: '#555',
                            }}
                            spacing={5}
                        >
                            <Avatar
                                size="1.5em"
                                textSizeRatio={1.75}
                                round
                                name={p.accountId}
                            />
                            <div>{p.accountId}</div>
                        </Stack>
                    </div>
                    {p.proofOfWork ? (
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{
                                __html: p.proofOfWork,
                            }}
                            style={{
                                marginBottom: 15,
                                maxWidth: 800,
                            }}
                        />
                    ) : (
                        <p
                            style={{
                                marginBottom: 15,
                            }}
                        >
                            <i>Empty</i>
                        </p>
                    )}
                    <div style={{ marginBottom: 15 }} />
                    {p.isApproved && <Badge color="green" content="Approved" />}
                    {!p.isApproved &&
                        task.owner ===
                            BlockChainConnector.instance.account.accountId && (
                            <Stack justifyContent="flex-end" spacing={10}>
                                <Whisper
                                    placement="top"
                                    trigger="click"
                                    controlId={`approve-${p.accountId}`}
                                    ref={triggerRef}
                                    speaker={speaker(() => {
                                        handleApproveWork({
                                            taskId: task.taskId,
                                            workerId: p.accountId,
                                        });
                                    }, approveWorkLoading)}
                                >
                                    <Button
                                        appearance="primary"
                                        disabled={rejectWorkLoading}
                                        loading={approveWorkLoading}
                                    >
                                        Approve
                                    </Button>
                                </Whisper>
                                <Whisper
                                    placement="top"
                                    trigger="click"
                                    controlId={`reject-${p.accountId}`}
                                    ref={triggerRef}
                                    speaker={speaker(() => {
                                        handleRejectWork({
                                            taskId: task.taskId,
                                            workerId: p.accountId,
                                        });
                                    }, rejectWorkLoading)}
                                >
                                    <Button
                                        appearance="ghost"
                                        disabled={approveWorkLoading}
                                        loading={rejectWorkLoading}
                                    >
                                        Reject
                                    </Button>
                                </Whisper>
                            </Stack>
                        )}
                </Panel>
            </Col>
        </Row>
    );
};

export const TaskDetailsDrawer: React.FunctionComponent<
    TaskDetailsDrawerProps
> = ({ taskId, type, open, setOpen }) => {
    const { markATaskAsCompletedLoading, handleMarkATaskAsCompleted } =
        useMarkATaskAsCompleted();

    const { data: task, isLoading } = useQuery(
        taskId!,
        () => JobService.fetchJobById(taskId!),
        {
            enabled: !!taskId,
        }
    );

    return (
        <Drawer full open={open} onClose={() => setOpen(false)}>
            {isLoading || !task ? (
                <Loader />
            ) : (
                <>
                    <Drawer.Header>
                        <Drawer.Title>
                            <Stack justifyContent="space-between">
                                <div>Task details</div>
                                {type !== 'completed' &&
                                    task.owner ===
                                        BlockChainConnector.instance.account
                                            .accountId &&
                                    (task.availableUntil < Date.now() ||
                                        (task.availableUntil >= Date.now() &&
                                            task.maxParticipants ===
                                                task.proposals.filter(
                                                    (p) => p.isApproved
                                                ).length)) && (
                                        <Button
                                            size="sm"
                                            appearance="primary"
                                            loading={
                                                markATaskAsCompletedLoading
                                            }
                                            onClick={() =>
                                                handleMarkATaskAsCompleted({
                                                    taskId: task.taskId,
                                                }).then(() => setOpen(false))
                                            }
                                        >
                                            Mark task as completed
                                        </Button>
                                    )}
                            </Stack>
                        </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Grid fluid>
                            <Row>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>ID</h6>
                                    <p style={{ marginBottom: 15 }}>
                                        {task.taskId}
                                    </p>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>Title</h6>
                                    <p style={{ marginBottom: 15 }}>
                                        {task.title}
                                    </p>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <h6 style={{ marginBottom: 5 }}>Owner</h6>
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
                                    <Panel bordered>
                                        <div
                                            className="ql-editor"
                                            dangerouslySetInnerHTML={{
                                                __html: task.description,
                                            }}
                                            style={{ maxWidth: 800 }}
                                        />
                                    </Panel>
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
                                    {task.proposals.map((p) => (
                                        <ProposalItem
                                            key={p.accountId}
                                            p={p}
                                            task={task}
                                            setOpen={setOpen}
                                        />
                                    ))}
                                </Grid>
                                <div style={{ marginBottom: 15 }} />
                            </>
                        ) : (
                            'Empty'
                        )}
                    </Drawer.Body>
                </>
            )}{' '}
        </Drawer>
    );
};
