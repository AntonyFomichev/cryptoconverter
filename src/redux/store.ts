import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
} from 'redux';
import { persistStore } from 'redux-persist';

import rootSaga from 'redux/sagas';
import rootReducer from './reducers';

import middleware, { sagaMiddleware } from 'utils/middleware';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (
  initialState: any = {},
  additionalMiddleware: Middleware[] = []
) => {
  const store: Store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...additionalMiddleware, ...middleware))
  );

  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
};
