import { keyMirror } from 'utils/helpers';
import { Status } from 'types';

export const ActionTypes = keyMirror({
  GET_CRYPTO_PRICE_REQUEST: undefined,
  GET_CRYPTO_PRICE_SUCCESS: undefined,
  GET_CRYPTO_PRICE_FAILURE: undefined,
});

export const STATUS: Status = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};
