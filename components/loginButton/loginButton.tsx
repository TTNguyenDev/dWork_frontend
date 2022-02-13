import React from 'react';
import { Button } from 'rsuite';
import { useLogin } from '../../hooks/useLogin';
import classes from './brand.module.less';

interface LoginButtonProps {
    loading: boolean;
    requestLogin: () => void;
}

export const LoginButton: React.FunctionComponent<LoginButtonProps> = ({
    loading,
    requestLogin,
}) => {
    return (
        <Button appearance="primary" loading={loading} onClick={requestLogin}>
            Connect the wallet
        </Button>
    );
};
