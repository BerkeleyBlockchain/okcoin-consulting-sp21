/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { components } from 'react-select';
import Tokens from '../../constants/tokens';
import { getTokenIconPNG32 } from '../../utils/getTokenIcon';

const { Option, SingleValue } = components;

export const IconOption = (props) => {
  const { data } = props;
  return (
    <Option {...props}>
      <HStack>
        <img src={data.icon} defaultsource={data.icon} alt={data.label} />
        <Text>{data.label}</Text>
      </HStack>
    </Option>
  );
};

export const ValueOption = (props) => {
  const { data } = props;
  return (
    <SingleValue {...props}>
      <HStack>
        <img src={data.icon} defaultsource={data.icon} alt={data.label} />
        <Text>{data.label}</Text>
      </HStack>
    </SingleValue>
  );
};

// display tokens
export const TokenArray = Tokens.tokens.map((symbol) => ({
  value: symbol,
  label: symbol,
  icon: getTokenIconPNG32(symbol),
}));

export const DropdownStyle = {
  menu: (provided) => ({
    ...provided,
    width: 150,
    margin: 0,
    fontFamily: 'Poppins',
    fontWeight: '600',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#A0AEBF',
  }),

  control: () => ({
    width: 160,
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 4,
    color: '#A0AEBF',
    fontFamily: 'Poppins',
    fontWeight: '600',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: '#A0AEBF',
    fontSize: 19,
    marginTop: 1,
    fontWeight: '400',
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};
