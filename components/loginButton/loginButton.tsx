import Link from 'next/link';
import React from 'react';
import { Button } from 'rsuite';
import { useLogin } from '../../hooks/useLogin';
import classes from './brand.module.less';

interface LoginButtonProps {}

export const LoginButton: React.FunctionComponent<LoginButtonProps> = () => {
    const { loading, requestLogin } = useLogin();
    return (
        <Button loading={loading} onClick={requestLogin}>
            Connect the wallet
        </Button>
    );
};
