import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowEqualSelector } from 'utils/hooks';

import { getCryptoPrice } from 'redux/actions/cryptoPrice';
import { coinList } from 'utils/constants';
import { StoreState } from 'types';

import './styles.sass';

const App = () => {
  const dispatch = useDispatch();
  const {
    cryptoPrice: { price },
  } = useShallowEqualSelector((s: StoreState) => s.cryptoPrice);

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

  useEffect(() => {
    if (exchangeRule) {
      getPriceBySymbols(`${secondSymbolValue}${firstSymbolValue}`);
    } else {
      getPriceBySymbols(`${firstSymbolValue}${secondSymbolValue}`);
    }
  }, [firstSymbolValue, secondSymbolValue]);

  useEffect(() => {
    if (changedState.current === 'firstSymbol') {
      setFirstValue(calculatePrice('secondSymbol', secondValue));
    } else if (changedState.current === 'secondSymbol') {
      setSecondValue(calculatePrice('firstSymbol', firstValue));
    }

    changedState.current = '';
  }, [price]);

  const getPriceBySymbols = (query: string) => {
    dispatch(getCryptoPrice(query));
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === 'firstSymbol') {
      if (e.target.value === secondSymbolValue) {
        swapPriceFields();

        setSecondSymbolValue(firstSymbolValue);
        setFirstSymbolValue(e.target.value);

        return;
      }

      setFirstSymbolValue(e.target.value);
    }

    if (e.target.name === 'secondSymbol') {
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
    console.log(price);
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
            <input
              type='number'
              name='firstSymbol'
              onChange={onChangeInput}
              value={firstValue}
              placeholder={'0'}
              min='0'
            />

            <span>
              <select
                name='firstSymbol'
                onChange={onChangeSelect}
                value={firstSymbolValue}
              >
                {coinList.map((coin: string) => (
                  <option key={coin}>{coin}</option>
                ))}
              </select>
            </span>
          </div>
        </div>

        <div className='converter-equals'>
          <p>=</p>
        </div>

        <div className='converter-side-b'>
          <div>
            <input
              type='number'
              name='secondSymbol'
              onChange={onChangeInput}
              value={secondValue}
              placeholder={'0'}
              min='0'
            />

            <span>
              <select
                name='secondSymbol'
                onChange={onChangeSelect}
                value={secondSymbolValue}
              >
                {coinList.map((coin: string) => (
                  <option key={coin}>{coin}</option>
                ))}
              </select>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
