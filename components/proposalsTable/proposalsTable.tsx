import React from 'react';
import { Table, Button } from 'rsuite';
import { useSelectProposal } from '../../hooks/useSelectProposal';
import { AccountTypes } from '../../models/types/accountType';
import { Job, JobStatus, Proposal } from '../../models/types/jobType';
import { BlockChainConnector } from '../../utils/blockchain';
import classes from './proposalsTable.module.less';

interface ProposalsTableProps {
    task: Job;
    proposals: Proposal[];
    loading?: boolean;
}

export const ProposalsTable: React.FunctionComponent<ProposalsTableProps> = ({
    task,
    proposals,
    loading,
}) => {
    const { accountType, selectProposalLoading, handleSelectProposal } =
        useSelectProposal();

    return (
        <Table
            data={(proposals as any) ?? []}
            autoHeight
            hover
            loading={loading}
        >
            <Table.Column resizable>
                <Table.HeaderCell>Account Id</Table.HeaderCell>
                <Table.Cell dataKey="accountId" />
            </Table.Column>
            <Table.Column resizable>
                <Table.HeaderCell>Cover letter</Table.HeaderCell>
                <Table.Cell dataKey="coverLetter" />
            </Table.Column>
            <Table.Column resizable>
                <Table.HeaderCell>Hour estimation</Table.HeaderCell>
                <Table.Cell dataKey="hourEstimation" />
            </Table.Column>
            <Table.Column resizable>
                <Table.HeaderCell>Total received</Table.HeaderCell>
                <Table.Cell dataKey="totalReceived" />
            </Table.Column>
            {accountType === AccountTypes.REQUESTER &&
                task.owner === BlockChainConnector.instance.account.accountId &&
                task.status === JobStatus.READY_FOR_APPLY && (
                    <Table.Column resizable>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.Cell>
                            {(proposal: Proposal) => (
                                <>
                                    {task.status ===
                                        JobStatus.READY_FOR_APPLY && (
                                        <Button
                                            size="xs"
                                            loading={selectProposalLoading}
                                            onClick={() =>
                                                handleSelectProposal({
                                                    taskId: task.taskId,
                                                    index: proposals.indexOf(
                                                        proposal
                                                    ),
                                                    totalReceived:
                                                        proposal.totalReceived,
                                                })
                                            }
                                        >
                                            Approve
                                        </Button>
                                    )}
                                </>
                            )}
                        </Table.Cell>
                    </Table.Column>
                )}
        </Table>
    );
};
