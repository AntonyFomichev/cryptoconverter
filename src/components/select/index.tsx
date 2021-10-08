import React from 'react';

import './styles.sass';

export const Select = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((option: string) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};
