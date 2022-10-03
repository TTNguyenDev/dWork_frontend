import { ModalStateType } from '../core/types';

export const ModalUtils: {
  storageDeposit: ModalStateType;
  approveWork: ModalStateType;
  rejectWork: ModalStateType;
  createReport: ModalStateType;
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
  createReport: {
    onOpen: () => {},
    onClose: () => {},
  },
});
