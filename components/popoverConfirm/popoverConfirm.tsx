import React from 'react';
import { Popover, Stack, Button } from 'rsuite';

type PopoverConfirmProps = {
    handleClick: () => void;
    loading: boolean;
    triggerRef: any;
};

export const PopoverConfirm = React.forwardRef(
    ({ handleClick, loading, triggerRef }: any, ref: any) => {
        const closePopoverConfirm = () => triggerRef?.current?.close();

        return (
            <Popover title="Are you sure?" ref={ref}>
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
    }
);
