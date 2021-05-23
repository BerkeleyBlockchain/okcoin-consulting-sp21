/* eslint-disable react/jsx-props-no-spreading */
import { HStack, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { components } from 'react-select';

const { Option, SingleValue } = components;

export const IconOption = (props) => {
  const { data } = props;
  return (
    <Option {...props}>
      <HStack>
        <Image src={data.icon} alt={data.label} />
        <Text color={useColorModeValue('#222222', 'gray.200')}>{data.label}</Text>
      </HStack>
    </Option>
  );
};

export const ValueOption = (props) => {
  const { data } = props;
  return (
    <SingleValue {...props}>
      <HStack>
        <Image src={data.icon} alt={data.label} />
        <Text color={useColorModeValue('#222222', 'gray.200')}>{data.label}</Text>
      </HStack>
    </SingleValue>
  );
};

export const DropdownStyle = {
  menu: (provided) => ({
    ...provided,
    width: 150,
    margin: 0,
    fontFamily: 'Poppins',
    fontWeight: '600',
    background: useColorModeValue('gray.200', '#222222'),
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: useColorModeValue('#222222', 'gray.200'),
  }),

  option: (provider) => ({
    ...provider,
    '&:hover': {
      background: useColorModeValue('#DEEBFF', '#333333'),
    },
  }),

  control: () => ({
    width: 160,
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 4,
    color: useColorModeValue('#222222', 'gray.200'),
    fontFamily: 'Poppins',
    fontWeight: '600',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: useColorModeValue('#222222', 'gray.200'),
    fontSize: 19,
    marginTop: 1,
    fontWeight: '400',
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 500ms';

    return { ...provided, opacity, transition };
  },
};
