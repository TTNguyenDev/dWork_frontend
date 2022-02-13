import React, { useEffect } from 'react';
import { Modal, Button } from 'rsuite';
import { useLogin } from '../../hooks/useLogin';
import { ModalsController } from '../../utils/modalsController';

type connectWalletModalProps = {};

export const ConnectWalletModal: React.FunctionComponent<
    connectWalletModalProps
> = () => {
    const { loading, requestLogin } = useLogin();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        ModalsController.setController({ openConnectWalletModal: handleOpen });
    }, []);

    return (
        <Modal
            size="xs"
            backdrop
            keyboard={false}
            open={open}
            onClose={handleClose}
        >
            <Modal.Header>
                <Modal.Title>Connect the NEAR wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <Button
                    loading={loading}
                    onClick={requestLogin}
                    appearance="primary"
                >
                    Connect now
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
