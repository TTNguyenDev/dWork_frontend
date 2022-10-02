import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Editor } from '../../core/components';
import { useSubmitWork } from '../../hooks';

export const SumitWorkForm = ({ taskId }: { taskId?: string }) => {
  const {
    submitWorkState: { form, isLoading },
    submitWorkMethods: { onSubmit },
  } = useSubmitWork({ taskId });

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Box>
          <VStack spacing="30px" align="stretch">
            <FormControl isInvalid={!!form.formState.errors.proof}>
              <Input
                hidden
                {...form.register('proof', {
                  required: 'Proof is a required field',
                })}
              />
              <Editor
                onChange={(value) => {
                  form.setValue('proof', value);
                  form.trigger('proof');
                }}
                style={{
                  padding: 0,
                }}
                isInvalid={!!form.formState.errors.proof}
                placeholder="Proof of Work"
              />
              {form.formState.errors.proof && (
                <FormErrorMessage>
                  {form.formState.errors.proof.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <Flex justifyContent="end">
              <Button
                type="submit"
                variant="connectWallet"
                w="200px"
                isLoading={isLoading}
              >
                SUBMIT
              </Button>
            </Flex>
          </VStack>
        </Box>
      </form>
    </Box>
  );
};
