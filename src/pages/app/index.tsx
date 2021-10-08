import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { Select } from 'components/select';
import { Input } from 'components/input';

import { getCryptoPrice } from 'redux/actions';
import { coinList } from 'utils/constants';
import { useShallowEqualSelector } from 'utils/hooks';

import { StoreState } from 'types';
import './styles.sass';

const App = () => {
  const dispatch = useDispatch();
  const {
    cryptoPrice: { price },
  } = useShallowEqualSelector((s: StoreState) => s.cryptoPrice);

  /* Variable for select value changed */
  const changedState = useRef('');

  /* Inputs */
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  /* Selects */
  const [firstSymbolValue, setFirstSymbolValue] = useState(coinList[0]);
  const [secondSymbolValue, setSecondSymbolValue] = useState(coinList[1]);

  /* Rule for Binance API exchanging */
  const exchangeRule =
    firstSymbolValue === 'USDT' ||
    (firstSymbolValue === 'BTC' && secondSymbolValue !== 'USDT') ||
    (firstSymbolValue === 'ETH' && secondSymbolValue === 'BNB');

  /* When symbols changing, fetch price from Binance */
  useEffect(() => {
    getPriceBySymbols();
  }, [firstSymbolValue, secondSymbolValue]);

  /* When price changing, calculate price for number fields */
  useEffect(() => {
    if (changedState.current === 'firstSymbol') {
      setFirstValue(calculatePrice('secondSymbol', secondValue));
    } else if (changedState.current === 'secondSymbol') {
      setSecondValue(calculatePrice('firstSymbol', firstValue));
    }

    changedState.current = '';
  }, [price]);

  /* Fetch price */
  function getPriceBySymbols() {
    if (firstSymbolValue === secondSymbolValue) {
      return;
    }

    dispatch(
      getCryptoPrice(
        exchangeRule
          ? `${secondSymbolValue}${firstSymbolValue}`
          : `${firstSymbolValue}${secondSymbolValue}`
      )
    );
  }

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === 'firstSymbol') {
      /* If one symbol equal changedField, swap them */
      if (e.target.value === secondSymbolValue) {
        swapPriceFields();

        setSecondSymbolValue(firstSymbolValue);
        setFirstSymbolValue(e.target.value);

        return;
      }

      setFirstSymbolValue(e.target.value);
    }

    if (e.target.name === 'secondSymbol') {
      /* If one symbol equal changedField, swap them */
      if (e.target.value === firstSymbolValue) {
        swapPriceFields();

        setFirstSymbolValue(secondSymbolValue);
        setSecondSymbolValue(e.target.value);

        return;
      }

      setSecondSymbolValue(e.target.value);
    }

    changedState.current = e.target.name;
  };

  const calculatePrice = (fieldName: string, fieldValue: string) => {
    if (fieldName === 'firstSymbol') {
      return `${parseFloat(fieldValue) * parseFloat(price)}`;
    }

    return `${parseFloat(fieldValue) / parseFloat(price)}`;
  };

  const swapPriceFields = () => {
    const tmpValue = firstValue;

    setFirstValue(secondValue);
    setSecondValue(tmpValue);
  };

  const swapSymbolFields = () => {
    const tmpValue = firstSymbolValue;

    setFirstSymbolValue(secondSymbolValue);
    setSecondSymbolValue(tmpValue);
  };

  const swapFields = () => {
    swapSymbolFields();
    swapPriceFields();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'firstSymbol') {
      setSecondValue(calculatePrice(e.target.name, e.target.value));
      setFirstValue(e.target.value);
    }

    if (e.target.name === 'secondSymbol') {
      setFirstValue(calculatePrice(e.target.name, e.target.value));
      setSecondValue(e.target.value);
    }
  };

  return (
    <div className='app'>
      <h1>Конвертер криптовалют</h1>

      <div className='converter-wrapper'>
        <div className='converter-side-a'>
          <div>
            <Input
              type='number'
              name='firstSymbol'
              onChange={onChangeInput}
              value={firstValue}
              placeholder={'0'}
              min='0'
            />

            <Select
              options={coinList}
              name='firstSymbol'
              onChange={onChangeSelect}
              value={firstSymbolValue}
            />
          </div>
        </div>

        <div className='converter-equals'>
          <button onClick={debounce(swapFields, 300)}>=</button>
        </div>

        <div className='converter-side-b'>
          <div>
            <Input
              type='number'
              name='secondSymbol'
              onChange={onChangeInput}
              value={secondValue}
              placeholder={'0'}
              min='0'
            />

            <Select
              options={coinList}
              name='secondSymbol'
              onChange={onChangeSelect}
              value={secondSymbolValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
