import React from 'react';
import { Popover, Stack, Button } from 'rsuite';

export const popoverConfirm = (handleClick: () => void, ref: any) => (
    <Popover title="Are you sure?">
        <Stack spacing="5px">
            <Button
                appearance="primary"
                size="sm"
                onClick={() => {
                    handleClick();
                    ref?.current?.close();
                }}
            >
                Yes
            </Button>
            <Button size="sm" onClick={() => ref?.current?.close()}>
                Cancel
            </Button>
        </Stack>
    </Popover>
);
