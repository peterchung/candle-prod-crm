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

  console.log('fragrances', allFragrances);

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

  const onChange = (value) => {
    setSelectedFragrances((prevSelected) => [...prevSelected, value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

    console.log('Form Data:', formData);
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
            <Accordion
              defaultIndex={[2]}
              allowMultiple
              style={{ width: '500px' }}
            >
              <AccordionItem title='1. Customer Contact Information'>
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
              <AccordionItem title='2. Shipping Address'>
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
        <div style={{ width: '800px' }}>
          {/* <h5>Candle inscription</h5> */}
          <TextField
            placeholder='For my best friend forever'
            title='Candle inscription'
            size={TextField.sizes.MEDIUM}
            value={candleInscription}
            onChange={(value) => setCandleInscription(value)}
          />
          {/* <h5>Quantity (box)</h5> */}
          <TextField
            placeholder='Enter box quantity'
            title='Quantity (box)'
            required={true}
            requiredAsterisk={true}
            size={TextField.sizes.MEDIUM}
            type={TextField.types.NUMBER}
            style={{ fontWeight: 'bold' }}
            value={boxQuantity}
            onChange={(value) => setBoxQuantity(value)}
          />
          {/* <Box marginTop={Box.marginYs.MEDIUM}> */}
          {/* <h5>Fragrances</h5> */}
          <Dropdown
            options={options}
            multi
            multiline
            placeholder='Select fragrances'
            className='dropdown-stories-styles_with-chips'
            onInputChange={onInputChange}
            onChange={onChange}
            style={{ width: '300px' }}
          />
          {/* </Box> */}
        </div>
        <Box marginBottom={Box.marginBottoms.XXL}>
          <Button type={Button.types.SUBMIT}>Submit</Button>
        </Box>
      </Flex>
    </form>
  );
};

export default OrderForm;
