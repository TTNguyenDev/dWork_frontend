import React from 'react';
import { Modal, Button, Form, Message } from 'rsuite';
import { useSubmitWork } from '../../hooks/useSubmitWork';
import { TextField } from '../textField';
import { Editor } from '../editor';

type SubmitWorkModalProps = {
    taskId: string;
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
};

export const SubmitWorkModal: React.FunctionComponent<SubmitWorkModalProps> = ({
    taskId,
    open,
    handleOpen,
    handleClose,
}) => {
    const { model, submitWorkLoading, handleFormChange, handleFormSubmit } =
        useSubmitWork();

    const [proofValue, setDescValue] = React.useState<string>('');

    const handleEditorChange = React.useCallback((value: string) => {
        setDescValue(value);
    }, []);

    return (
        <Modal
            size="sm"
            backdrop="static"
            keyboard={false}
            open={open}
            onClose={handleClose}
            overflow={false}
        >
            <Modal.Header>
                <Modal.Title>Submit work</Modal.Title>
            </Modal.Header>
            <Form
                model={model}
                fluid
                onChange={handleFormChange}
                onSubmit={(payload) => {
                    handleFormSubmit(payload, taskId, proofValue, handleClose);
                }}
                formDefaultValue={{
                    taskId,
                }}
            >
                <Modal.Body>
                    <TextField name="taskId" label="Id" readOnly />
                    <Editor
                        onChange={handleEditorChange}
                        style={{
                            padding: 0,
                        }}
                        placeholder="Description"
                    />
                    {/* <TextField
                        name="proof"
                        label="Proof"
                        type="textarea"
                        rows={5}
                    /> */}
                    <div style={{ marginBottom: 50 }} />
                    <Message showIcon type="info" header="Note">
                        You need to deposit <b>0.01 NEAR</b> to submit your
                        work. We do this to avoid spam submissions. You will get
                        a refund after the requester checks your post.
                    </Message>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        appearance="primary"
                        type="submit"
                        loading={submitWorkLoading}
                    >
                        Submit
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
