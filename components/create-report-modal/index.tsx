import {
  ModalFooter,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  FormLabel,
} from '@chakra-ui/react';
import { Editor } from '../../core/components';
import { useCreateReportModal } from '../../hooks';

export const CreateReportModal = () => {
  const {
    createReportModalState: {
      isOpen,
      createReportState: { form, isLoading },
      currentReportState,
    },
    createReportModalMethods: { onClose, createReportMethods },
  } = useCreateReportModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={!isLoading}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton
          _focus={{ boxShadow: 'none' }}
          isDisabled={isLoading}
        />
        <form onSubmit={createReportMethods.onSubmit}>
          <ModalBody>
            <Text
              fontSize="18px"
              mb="20px"
            >{`Report ${currentReportState.taskId.value}`}</Text>
            <Box>
              <VStack spacing="30px" align="stretch">
                <FormControl isInvalid={!!form.formState.errors.report}>
                  <Input
                    hidden
                    {...form.register('report', {
                      required: 'Content is a required field',
                    })}
                  />
                  <Editor
                    onChange={(value) => {
                      form.setValue('report', value);
                      form.trigger('report');
                    }}
                    style={{
                      padding: 0,
                    }}
                    isInvalid={!!form.formState.errors.report}
                    placeholder="Report content..."
                  />
                  {form.formState.errors.report && (
                    <FormErrorMessage>
                      {form.formState.errors.report.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                variant="primary"
                size="sm"
                isLoading={isLoading}
                onClick={createReportMethods.onSubmit}
                padding="8px 16px"
              >
                SUBMIT
              </Button>
              <Button
                borderColor="#333"
                variant="secondary"
                size="sm"
                onClick={onClose}
                padding="8px 16px"
                isDisabled={isLoading}
              >
                CANCLE
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
