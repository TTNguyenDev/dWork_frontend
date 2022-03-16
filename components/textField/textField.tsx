import React from 'react';
import { Form, Input, InputNumber } from 'rsuite';

const Textarea = React.forwardRef((props, ref: any) => (
    <Input {...props} as="textarea" ref={ref} />
));

export const TextField = React.forwardRef(
    (
        props: {
            name: string;
            label: string;
            type?: 'text' | 'textarea' | 'number';
            rows?: number;
            readOnly?: boolean;
            value?: any;
            style?: any;
            checkTrigger?: any;
        },
        ref: any
    ) => {
        const { name, label, type, ...rest } = props;
        return (
            <Form.Group controlId={name} ref={ref}>
                <Form.ControlLabel>{label}</Form.ControlLabel>
                <Form.Control
                    name={name}
                    accepter={
                        type === 'textarea'
                            ? Textarea
                            : type === 'number'
                            ? InputNumber
                            : undefined
                    }
                    {...rest}
                />
            </Form.Group>
        );
    }
);
