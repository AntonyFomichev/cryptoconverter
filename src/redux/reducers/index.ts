import { persistCombineReducers } from 'redux-persist';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import cryptoPrice, { cryptoPriceState } from './cryptoPrice';

import { StoreState } from 'types/state';

export const initialState = {
  cryptoPrice: cryptoPriceState,
};

export default persistCombineReducers<StoreState>(
  {
    key: 'rrsb',
    stateReconciler: autoMergeLevel2,
    storage,
    whitelist: ['app', 'user'],
    timeout: 0,
  },
  { ...cryptoPrice }
);
