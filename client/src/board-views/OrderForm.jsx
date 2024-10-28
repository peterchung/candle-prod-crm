import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import '../App.css';
import mondaySdk from 'monday-sdk-js';
// import 'monday-ui-react-core/dist/main.css';
import 'monday-ui-style/dist/index.min.css';
import { Dropdown } from 'monday-ui-react-core';

const OrderForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const allOptions = useMemo(
    () => [
      {
        value: 'Red',
        label: 'Red',
      },
      {
        value: 'Orange',
        label: 'Orange',
      },
      {
        value: 'Yellow',
        label: 'Yellow',
      },
      {
        value: 'Green',
        label: 'Green',
      },
      {
        value: 'Blue',
        label: 'Blue',
      },
      {
        value: 'Indigo',
        label: 'Indigo',
      },
      {
        value: 'Violet',
        label: 'Violet',
      },
    ],
    []
  );
  const options = useMemo(() => {
    if (!searchValue) return allOptions;
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [allOptions, searchValue]);
  const onInputChange = (value) => setSearchValue(value);
  return (
    <Dropdown
      options={options}
      multi
      placeholder='Select colors'
      className='dropdown-stories-styles_with-chips'
      onInputChange={onInputChange}
    />
  );
};

export default OrderForm;
