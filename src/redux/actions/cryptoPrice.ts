/**
 * @module Actions/CryptoPrice
 * @desc CryptoPrice Actions
 */
import { createAction } from 'utils/helpers';

import { ActionTypes } from 'redux/literals';

export const getCryptoPrice = createAction(
  ActionTypes.GET_CRYPTO_PRICE_REQUEST,
  (symbolQuery: string) => ({
    symbolQuery,
  })
);
