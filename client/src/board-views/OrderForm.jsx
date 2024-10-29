import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import '../App.css';
import mondaySdk from 'monday-sdk-js';
// import 'monday-ui-react-core/dist/main.css';
import 'monday-ui-style/dist/index.min.css';
import {
  Dropdown,
  TextField,
  Accordion,
  AccordionItem,
  Flex,
  Box,
  Button,
} from 'monday-ui-react-core';
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

async function updateProductionOrdersBoard(itemData) {
  try {
    const token = await monday.get('sessionToken');
    console.log('token', token);
    const response = await axios.post(
      'https://c8e7-173-73-226-98.ngrok-free.app/monday/add_order',
      {
        itemData: itemData,
      },
      {
        headers: {
          authorization: token.data,
          'order-view-request': true,
        },
      }
    );

    console.log(
      'back in orderform component with success message',
      response.data
    );
  } catch (err) {
    console.error('Error details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
  }
}
const getFragranceAndSetOptions = async (setAllFragrances) => {
  const itemNames = await getItemCategory();
  const newFragrances = Object.entries(itemNames).map(([id, fragranceObj]) => ({
    value: fragranceObj.category,
    label: fragranceObj.name,
  }));

  setAllFragrances(newFragrances);
  // return newFragrances;
};

async function getItemCategory() {
  const response = await axios.get(
    'https://c8e7-173-73-226-98.ngrok-free.app/get_fragrance_list'
  );
  return response.data;
}

const OrderForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const [context, setContext] = useState();
  const [allFragrances, setAllFragrances] = useState([]);
  const [selectedFragrances, setSelectedFragrances] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [candleInscription, setCandleInscription] = useState('');
  const [boxQuantity, setBoxQuantity] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    monday.listen('context', (res) => {
      setContext(res.data);
    });

    getFragranceAndSetOptions(setAllFragrances);
  }, []);

  const allOptions = useMemo(() => allFragrances, [allFragrances]);

  const options = useMemo(() => {
    if (searchValue === '') return allOptions;
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [allOptions, searchValue]);

  const onInputChange = (value) => {
    console.log('current serach val', value);
    setSearchValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFragranceCount()) {
      return alert(
        `Please select exactly ${
          Number(boxQuantity) * 3
        } fragrances (3 per box)`
      );
    }

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      candleInscription,
      boxQuantity,
      selectedFragrances,
      city,
      state,
    };

    await updateProductionOrdersBoard(formData);
    return alert(`Order successfully submitted!`);
  };

  const validateFragranceCount = () => {
    const requiredFragrances = Number(boxQuantity) * 3;
    return selectedFragrances.length === requiredFragrances;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction={Flex.directions.COLUMN}
        gap={Flex.gaps.MEDIUM}
        align={Flex.align.CENTER}
      >
        <div style={{ width: '800px' }}>
          <Box marginBottom={Box.marginBottoms.LARGE}>
            <Accordion defaultIndex={[3]} allowMultiple>
              <AccordionItem title='1. Order Details'>
                <Flex
                  direction={Flex.directions.COLUMN}
                  gap={Flex.gaps.MEDIUM}
                  align={Flex.align.CENTER}
                >
                  <div style={{ width: '700px' }}>
                    <TextField
                      placeholder='For my best friend forever'
                      title='Candle inscription'
                      value={candleInscription}
                      onChange={(value) => setCandleInscription(value)}
                    />
                    <TextField
                      placeholder='Enter box quantity'
                      title='Quantity (box)'
                      required
                      value={boxQuantity}
                      onChange={(value) => setBoxQuantity(value)}
                    />
                    <div style={{ width: '700px' }}>
                      <Dropdown
                        options={options}
                        multi
                        // multiline
                        isVirtualized
                        placeholder='Select fragrances'
                        className='dropdown-stories-styles_with-chips'
                        onInputChange={onInputChange}
                        onChange={(value) => setSelectedFragrances(value)}
                      />
                    </div>
                  </div>
                </Flex>
              </AccordionItem>
              <AccordionItem title='2. Customer Contact Information'>
                <Flex
                  direction={Flex.directions.COLUMN}
                  gap={Flex.gaps.MEDIUM}
                  align={Flex.align.CENTER}
                >
                  <div style={{ width: '700px' }}>
                    <TextField
                      placeholder='John'
                      title='First Name'
                      required
                      value={firstName}
                      onChange={(value) => setFirstName(value)}
                    />
                    <TextField
                      placeholder='Doe'
                      title='Last Name'
                      required
                      value={lastName}
                      onChange={(value) => setLastName(value)}
                    />
                    <TextField
                      placeholder='email@monday.com'
                      title='Email'
                      required
                      type={TextField.types.EMAIL}
                      value={email}
                      onChange={(value) => setEmail(value)}
                    />
                    <TextField
                      placeholder='Digits only (e.g.1234567890)'
                      title='Phone'
                      required
                      type={TextField.types.TEL}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                    />
                  </div>
                </Flex>
              </AccordionItem>
              <AccordionItem title='3. Shipping Address'>
                <Flex
                  direction={Flex.directions.COLUMN}
                  gap={Flex.gaps.MEDIUM}
                  align={Flex.align.CENTER}
                >
                  <div style={{ width: '700px' }}>
                    <TextField
                      placeholder='New York'
                      title='City'
                      required
                      value={city}
                      onChange={(value) => setCity(value)}
                    />
                    <TextField
                      placeholder='NY'
                      title='State'
                      required
                      value={state}
                      onChange={(value) => setState(value)}
                    />
                  </div>
                </Flex>
              </AccordionItem>
            </Accordion>
          </Box>
        </div>
        <Box marginBottom={Box.marginBottoms.XXL}>
          <Button type={Button.types.SUBMIT}>Submit</Button>
        </Box>
      </Flex>
    </form>
  );
};

export default OrderForm;
