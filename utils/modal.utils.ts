import { ModalStateType } from '../core/types';

export const ModalUtils: {
  storageDeposit: ModalStateType;
  approveWork: ModalStateType;
  rejectWork: ModalStateType;
  createReport: ModalStateType;
  approveReport: ModalStateType;
  rejectReport: ModalStateType;
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
  approveReport: {
    onOpen: () => {},
    onClose: () => {},
  },
  rejectReport: {
    onOpen: () => {},
    onClose: () => {},
  },
});
