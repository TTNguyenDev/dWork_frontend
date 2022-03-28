import React from 'react';
import { Badge, Button, Col, Panel, Row, Stack, Whisper } from 'rsuite';
import { useRejectWork } from '../../hooks/useRejectWork';
import { useApproveWork } from '../../hooks/useApproveWork';
import { Task, Proposal } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
import Avatar from 'react-avatar';
import { popoverConfirm } from '../popoverConfirm';
import classes from './proposalItem.module.less';
import { BsChevronDown } from 'react-icons/bs';

type ProposalItemProps = {
    data: Proposal;
    task: Task;
};

export const ProposalItem = ({ data, task }: ProposalItemProps) => {
    const { approveWorkLoading, handleApproveWork } = useApproveWork();
    const { rejectWorkLoading, handleRejectWork } = useRejectWork();

    const popoverConfirmRef =
        React.useRef<{ open: () => void; close: () => void }>();

    const [isExpand, setIsExpand] = React.useState(true);
    const handleToggle = () => setIsExpand(!isExpand);

    return (
        <Row key={data.accountId} style={{ marginBottom: 15 }}>
            <Col xs={24} sm={24} md={24}>
                <Panel bordered>
                    <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
                        <Stack
                            justifyContent="space-between"
                            alignItems="center"
                        >
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
                                    name={data.accountId}
                                />
                                <div>{data.accountId}</div>
                                {data.isApproved && (
                                    <Badge
                                        color="green"
                                        content="Approved"
                                        style={{
                                            padding: '2px 10px',
                                            borderRadius: 20,
                                            fontWeight: 700,
                                        }}
                                    />
                                )}
                                {data.isRejected && (
                                    <Badge
                                        color="red"
                                        content="Rejected"
                                        style={{
                                            padding: '2px 10px',
                                            borderRadius: 20,
                                            fontWeight: 700,
                                        }}
                                    />
                                )}
                            </Stack>
                            <BsChevronDown
                                size={18}
                                style={{
                                    cursor: 'pointer',
                                    transform: isExpand ? 'rotate(180deg)' : '',
                                }}
                                onClick={handleToggle}
                            />
                        </Stack>
                    </div>

                    <div
                        className={classes.proof}
                        style={{
                            display: isExpand ? 'block' : 'none',
                            marginTop: 15,
                        }}
                    >
                        {data.proofOfWork ? (
                            <div
                                className="ql-editor"
                                dangerouslySetInnerHTML={{
                                    __html: data.proofOfWork,
                                }}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 800,
                                    fontWeight: 500,
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
                        {!data.isApproved &&
                            !data.isRejected &&
                            task.owner ===
                                BlockChainConnector.instance.account
                                    .accountId && (
                                <Stack justifyContent="flex-end" spacing={10}>
                                    <Whisper
                                        placement="top"
                                        trigger="click"
                                        controlId={`approve-${data.accountId}`}
                                        ref={popoverConfirmRef}
                                        speaker={popoverConfirm(() => {
                                            handleApproveWork({
                                                taskId: task.taskId,
                                                workerId: data.accountId,
                                            });
                                        }, popoverConfirmRef)}
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
                                        controlId={`reject-${data.accountId}`}
                                        ref={popoverConfirmRef}
                                        speaker={popoverConfirm(() => {
                                            handleRejectWork({
                                                taskId: task.taskId,
                                                workerId: data.accountId,
                                            });
                                        }, popoverConfirmRef)}
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
                    </div>
                </Panel>
            </Col>
        </Row>
    );
};
