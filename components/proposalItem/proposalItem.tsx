import React from 'react';
import { Badge, Button, Col, Panel, Row, Stack, Whisper } from 'rsuite';
import { useRejectWork } from '../../hooks/useRejectWork';
import { useApproveWork } from '../../hooks/useApproveWork';
import { Job, Proposal } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
import Avatar from 'react-avatar';
import { popoverConfirm } from '../popoverConfirm';

type ProposalItemProps = {
    data: Proposal;
    task: Job;
};

export const ProposalItem = ({ data, task }: ProposalItemProps) => {
    const { approveWorkLoading, handleApproveWork } = useApproveWork();
    const { rejectWorkLoading, handleRejectWork } = useRejectWork();

    const popoverConfirmRef =
        React.useRef<{ open: () => void; close: () => void }>();

    return (
        <Row key={data.accountId} style={{ marginBottom: 15 }}>
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
                                name={data.accountId}
                            />
                            <div>{data.accountId}</div>
                        </Stack>
                    </div>
                    {data.proofOfWork ? (
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{
                                __html: data.proofOfWork,
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
                    {data.isApproved && (
                        <Badge color="green" content="Approved" />
                    )}
                    {!data.isApproved &&
                        task.owner ===
                            BlockChainConnector.instance.account.accountId && (
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
                </Panel>
            </Col>
        </Row>
    );
};
