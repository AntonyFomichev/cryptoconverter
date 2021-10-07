import { Dispatch } from 'redux';
import { ValueOf } from 'type-fest';

export interface Status {
  ERROR: 'error';
  IDLE: 'idle';
  READY: 'ready';
  RUNNING: 'running';
  SUCCESS: 'success';
}

export interface StoreState {
  cryptoPrice: ICryptoPriceState;
}

export interface WithDispatch {
  dispatch: Dispatch;
}

export interface ICryptoPrice {
  symbol: string;
  price: string;
}

export interface ICryptoPriceState {
  cryptoPrice: ICryptoPrice;
  symbolQuery: string;
  errorMessage: string;
  status: ValueOf<Status>;
}
