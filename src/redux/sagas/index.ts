import { all, fork } from 'redux-saga/effects';

import cryptoPrice from './cryptoPrice';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(cryptoPrice)]);
}
