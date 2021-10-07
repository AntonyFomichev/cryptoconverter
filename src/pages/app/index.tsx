import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowEqualSelector } from 'utils/hooks';

import { getCryptoPrice } from 'redux/actions/cryptoPrice';

import { StoreState } from 'types';

import './styles.sass';

const App = () => {
  const dispatch = useDispatch();
  const cryptoPriceState = useShallowEqualSelector(
    (s: StoreState) => s.cryptoPrice
  );

  useEffect(() => {
    dispatch(getCryptoPrice('USDTRUB'));
  }, []);

  useEffect(() => {
    console.log(cryptoPriceState.cryptoPrice);
  }, [cryptoPriceState.cryptoPrice]);

  return (
    <div className='App'>
      <div>123123123</div>
    </div>
  );
};

export default App;
