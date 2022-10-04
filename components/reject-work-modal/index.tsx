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
import { useRejectWorkModal } from '../../hooks';

export const RejectWorkModal = () => {
  const {
    rejectWorkModalState: {
      isOpen,
      rejectWorkState: { form, isLoading },
      currentProposalState,
    },
    rejectWorkModalMethods: { onClose, rejectWorkMethods },
  } = useRejectWorkModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={!isLoading}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton
          _focus={{ boxShadow: 'none' }}
          isDisabled={isLoading}
        />
        <form onSubmit={rejectWorkMethods.onSubmit}>
          <ModalBody>
            <Text
              fontSize="18px"
              mb="20px"
            >{`Reject the proof of ${currentProposalState.workerId.value}`}</Text>
            <Box>
              <VStack spacing="30px" align="stretch">
                <FormControl isInvalid={!!form.formState.errors.reason}>
                  <Input
                    hidden
                    {...form.register('reason', {
                      required: 'Reason is a required field',
                    })}
                  />
                  <Editor
                    onChange={(value) => {
                      form.setValue('reason', value);
                      form.trigger('reason');
                    }}
                    style={{
                      padding: 0,
                    }}
                    isInvalid={!!form.formState.errors.reason}
                    placeholder="Reason"
                  />
                  {form.formState.errors.reason && (
                    <FormErrorMessage>
                      {form.formState.errors.reason.message}
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
                onClick={rejectWorkMethods.onSubmit}
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
                CANCEL
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
