import React from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Input, Stack } from 'rsuite';
import { AccountService } from '../../services/accountService';
import { BlockChainConnector } from '../../utils/blockchain';
import classes from './accountBio.module.less';

interface AccountBioProps {
    accountId: string;
    bio?: string;
    editable?: boolean;
}

export const AccountBio: React.FunctionComponent<AccountBioProps> = ({
    accountId,
    bio,
    editable,
}) => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = React.useState(false);
    const [updateBioLoading, setUpdateBioLoading] = React.useState(false);
    const inputBioRef = React.useRef<HTMLInputElement>();

    return (
        <div className={classes.root}>
            {editable &&
            accountId === BlockChainConnector.instance.account.accountId ? (
                !isEditing ? (
                    <>
                        {bio && <div className={classes.bio}>{bio}</div>}
                        <div>
                            <Button
                                size="sm"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {bio ? 'Update bio' : 'Add bio'}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Input
                            className={classes.bio_input}
                            placeholder="Describe you"
                            inputRef={inputBioRef}
                        />
                        <Stack spacing={5} justifyContent="flex-end">
                            <Button
                                size="sm"
                                loading={updateBioLoading}
                                onClick={async () => {
                                    setUpdateBioLoading(true);
                                    try {
                                        if (inputBioRef.current?.value)
                                            await AccountService.updateBio(
                                                inputBioRef.current.value
                                            );

                                        queryClient.invalidateQueries(
                                            accountId
                                        );
                                        setIsEditing(!isEditing);
                                    } catch (error) {
                                        toast(
                                            'Sorry! There was an error updating bio',
                                            {
                                                type: 'error',
                                            }
                                        );
                                    } finally {
                                        setUpdateBioLoading(false);
                                    }
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                size="sm"
                                disabled={updateBioLoading}
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </>
                )
            ) : (
                bio && <div className={classes.bio}> {bio}</div>
            )}
        </div>
    );
};
