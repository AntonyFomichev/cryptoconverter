/**
 * @module Reducers/CryptoPrice
 * @desc CryptoPrice Reducers
 */
import { createReducer } from 'utils/helpers';
import { ActionTypes, STATUS } from 'redux/literals';

import { ICryptoPriceState } from 'types';

export const cryptoPriceState: ICryptoPriceState = {
  cryptoPrice: {
    symbol: '',
    price: '',
  },
  symbolQuery: '',
  errorMessage: '',
  status: STATUS.IDLE,
};

/* eslint-disable */
export default {
  cryptoPrice: createReducer<ICryptoPriceState>(
    {
      [ActionTypes.GET_CRYPTO_PRICE_REQUEST]: (draft, { payload }) => {
        const { symbolQuery } = payload;

        draft.symbolQuery = symbolQuery;
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.GET_CRYPTO_PRICE_SUCCESS]: (draft, { payload }) => {
        draft.cryptoPrice = payload;
        draft.status = STATUS.SUCCESS;
      },
      [ActionTypes.GET_CRYPTO_PRICE_FAILURE]: (draft, { payload }) => {
        draft.errorMessage = payload.errorMessage;
        draft.status = STATUS.ERROR;
      },
    },
    cryptoPriceState
  ),
};
