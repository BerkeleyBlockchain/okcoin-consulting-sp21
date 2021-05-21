/* eslint-disable react/jsx-props-no-spreading */
import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { components } from 'react-select';

const { Option, SingleValue } = components;

export const IconOption = (props) => {
  const { data } = props;
  return (
    <Option {...props}>
      <HStack>
        <Image src={data.icon} alt={data.label} />
        <Text color="gray.800">{data.label}</Text>
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
        <Text color="white">{data.label}</Text>
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
