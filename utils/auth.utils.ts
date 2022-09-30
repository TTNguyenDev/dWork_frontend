import { AccountState } from '../store';
import { ModalUtils } from './modal.utils';

export const AuthUtils = {
  authCheckAndExec(exec: () => any) {
    const isRegistered = AccountState.isRegistered.value;
    if (isRegistered) return exec();
    else {
      ModalUtils.storageDeposit.onOpen();
    }
  },
};
