import React from 'react';
import { Modal, Button, Message } from 'rsuite';
import { ModalsController } from '../../utils/modalsController';

export const DespositInfomationModal: React.FunctionComponent = () => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<{
        amount?: number;
        reason?: string;
        action?: any;
    }>({});

    const handleOpen = React.useCallback(() => setOpen(true), []);
    const handleClose = React.useCallback(() => setOpen(false), []);

    React.useEffect(() => {
        ModalsController.setController({
            openDepositInfomationModal: handleOpen,
            closeDepositInfomationModal: handleClose,
            setDataDepositInfomationModal: setData as any,
        });
    }, []);

    return (
        <Modal
            size="sm"
            keyboard={false}
            open={open}
            onClose={handleClose}
            overflow={false}
        >
            <Modal.Header>
                <Modal.Title>Deposit Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Message showIcon type="info" header="Note">
                    You need to stake <b>{data.amount} Ⓝ</b> as a registration
                    fee.
                </Message>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    appearance="primary"
                    type="submit"
                    onClick={data.action}
                >
                    Continue
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
