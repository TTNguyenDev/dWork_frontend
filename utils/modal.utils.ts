import { ModalStateType } from '../core/types';

export const ModalUtils: {
  storageDeposit: ModalStateType;
  approveWork: ModalStateType;
  rejectWork: ModalStateType;
} = Object.freeze({
  storageDeposit: {
    onOpen: () => {},
    onClose: () => {},
  },
  approveWork: {
    onOpen: () => {},
    onClose: () => {},
  },
  rejectWork: {
    onOpen: () => {},
    onClose: () => {},
  },
});
