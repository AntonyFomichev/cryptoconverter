import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { StoreState, UseInputType, UseSelectType } from 'types';

export function useShallowEqualSelector<TReturn>(
  selector: (state: StoreState) => TReturn
) {
  return useSelector(selector, shallowEqual);
}

export function useInput({
  type,
  defaultValue,
  required,
  ...options
}: UseInputType) {
  const [value, setValue] = useState('0');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputComponent = (
    <input
      type={type}
      onChange={onChange}
      required={required}
      placeholder={'0'}
      {...options}
    />
  );

  return [value, setValue, inputComponent];
}
