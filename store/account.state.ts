import { hookstate, State } from '@hookstate/core';
import { AccountDto } from '../dtos';

export type AccountState = {
  loading: boolean;
  isRegistered?: boolean;
  isAdmin?: boolean;
  profile?: AccountDto;
};
export const AccountState: State<AccountState> = hookstate({
  loading: true,
} as AccountState);
