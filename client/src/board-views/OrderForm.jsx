import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import '../App.css';
import mondaySdk from 'monday-sdk-js';
// import 'monday-ui-react-core/dist/main.css';
import 'monday-ui-style/dist/index.min.css';
import { Dropdown } from 'monday-ui-react-core';
import axios from 'axios';

const monday = mondaySdk();

// async function getItemIds() {
//   try {
//     const response = await monday.get('itemIds');
//     return response.data;
//   } catch (err) {
//     console.error('err', err);
//   }
// }

// TODO: Modify to handle updating production orders board
// async function updateProductionOrdersBoard(itemIds) {
//   try {
//     const token = await monday.get('sessionToken');
//     console.log('token', token);
//     const response = await axios.post(
//       'https://c8e7-173-73-226-98.ngrok-free.app/monday/get_fragrance_list',
//       {
//         itemIds: itemIds,
//       },
//       {
//         headers: {
//           authorization: token.data,
//           'order-view-request': true,
//         },
//       }
//     );

//     console.log('back in orderform component with names', response.data);
//   } catch (err) {
//     console.error('Error details:', {
//       message: err.message,
//       response: err.response?.data, // Get error response from server
//       status: err.response?.status,
//     });
//   }
// }
const getFragranceAndSetOptions = async (setAllFragrances) => {
  const itemNames = await getItemNames();
  const newFragrances = Object.entries(itemNames).map(([id, name]) => ({
    value: name,
    label: name,
  }));

  setAllFragrances(newFragrances);
};

async function getItemNames() {
  const response = await axios.get(
    'https://c8e7-173-73-226-98.ngrok-free.app/get_fragrance_list'
  );
  return response.data;
}

const OrderForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const [context, setContext] = useState();
  const [allFragrances, setAllFragrances] = useState([]);

  useEffect(() => {
    monday.listen('context', (res) => {
      setContext(res.data);
    });

    getFragranceAndSetOptions(setAllFragrances);
  }, []);

  const allOptions = useMemo(() => allFragrances, [allFragrances]);

  const options = useMemo(() => {
    if (!searchValue) return allOptions;
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [allOptions, searchValue]);
  const onInputChange = (value) => {
    setSearchValue(value);
  };

  return (
    <Dropdown
      options={options}
      multi
      placeholder='Select fragrances'
      className='dropdown-stories-styles_with-chips'
      onInputChange={onInputChange}
    />
  );
};

export default OrderForm;
