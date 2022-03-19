import React from 'react';
import classes from './accountInfoCard.module.less';
import Avatar from 'react-avatar';
import { FlexboxGrid } from 'rsuite';
import { useQuery } from 'react-query';
import { AccountService } from '../../services/accountService';

type AccountInfoCardProps = {
    accountId: string;
};

export const AccountInfoCard: React.FunctionComponent<AccountInfoCardProps> = ({
    accountId,
}) => {
    const { data: account, isLoading } = useQuery(
        accountId,
        () => AccountService.fetchUser(accountId),
        {
            enabled: !!accountId,
        }
    );

    return (
        <div className={classes.root}>
            <div className={classes.avatar}>
                <Avatar
                    round
                    alt={accountId}
                    name={accountId}
                    size="60"
                    textSizeRatio={2}
                />
            </div>
            <div className={classes.username}>{accountId}</div>
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={8}>
                    <div className={classes.item_info}>
                        <div className={classes.item_info_value}>0</div>
                        <div className={classes.item_info_label}>Ranks</div>
                    </div>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={8}>
                    <div className={classes.item_info}>
                        <div className={classes.item_info_value}>
                            {account
                                ? `${account.completedJobs.length}/${account.currentRequests}`
                                : '...'}
                        </div>
                        <div className={classes.item_info_label}>Tasks</div>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={8}>
                    <div className={classes.item_info}>
                        <div className={classes.item_info_value}>
                            {account ? account.totalStake ?? 0 : '...'}
                        </div>
                        <div className={classes.item_info_label}>Staking</div>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
};
