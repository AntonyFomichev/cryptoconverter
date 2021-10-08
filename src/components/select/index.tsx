import React from 'react';

import './styles.sass';

/**
 *
 * @param options Array of options in select field
 *
 */
export const Select = ({ options, ...props }) => {
  return (
    <div className='select-element'>
      <span>
        <select {...props}>
          {options.map((option: string) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </span>
    </div>
  );
};
