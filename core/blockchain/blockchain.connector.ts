export interface IBlockchainConnector<T = any> {
  conn: T;
  connect(): Promise<T>;
}
