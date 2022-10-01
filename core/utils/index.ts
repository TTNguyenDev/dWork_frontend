export * from './cache';

export function debounce(func: any, timeout = 300) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, timeout);
  };
}

export function parseToUsername(accountId: string) {
  return accountId.replace('.testnet', '').replace('.near', '');
}
