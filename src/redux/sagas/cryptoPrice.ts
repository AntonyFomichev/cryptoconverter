/**
 * @module Sagas/CryptoPrice
 * @desc CryptoPrice
 */
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'redux/literals';
import { StoreAction } from 'types';

function fetchPrice(symbol: string) {
  console.log();
  return fetch(
    new Request(
      `https://api.binance.com/api/v3/ticker/price?symbol=` + symbol,
      {
        method: 'GET',
      }
    )
  ).then((res) => res.json());
}

/**
 * Get Cryptocurrency Price
 */
export function* getPriceBySymbol({ payload }: StoreAction) {
  const { symbolQuery } = payload;

  try {
    const { symbol, price } = yield call(fetchPrice, symbolQuery);

    yield put({
      type: ActionTypes.GET_CRYPTO_PRICE_SUCCESS,
      payload: { symbol, price },
    });
  } catch (err) {
    console.error(err);

    yield put({
      type: ActionTypes.GET_CRYPTO_PRICE_FAILURE,
      payload: err,
    });
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_CRYPTO_PRICE_REQUEST, getPriceBySymbol),
  ]);
}
