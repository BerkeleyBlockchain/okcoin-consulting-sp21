/* eslint-disable react/jsx-props-no-spreading */
import { HStack, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { components } from 'react-select';

const { Option, SingleValue } = components;

export const IconOption = (props) => {
  const { data } = props;
  return (
    <Option {...props}>
      <HStack>
        <Image src={data.icon} />
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
        <Image src={data.icon} />
        <Text color={useColorModeValue('#222222', 'gray.200')}>{data.label}</Text>
      </HStack>
    </SingleValue>
  );
};

export const DropdownStyle = {
  menu: (provided) => {
    const { colorMode } = useColorMode();
    return {
      ...provided,
      width: 150,
      margin: 0,
      fontFamily: 'Poppins',
      fontWeight: '600',
      backgroundColor: colorMode === 'light' ? 'white' : '#222222',
      color: 'red',
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#A0AEBF',
  }),

  input: () => {
    const { colorMode } = useColorMode();
    return {
      color: colorMode === 'light' ? 'black' : 'white',
    };
  },

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

  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const { colorMode } = useColorMode();
    let bgColor = null;

    if (isDisabled) {
      bgColor = null;
    } else if (isSelected) {
      bgColor = colorMode === 'light' ? '#ADD2FF' : '#333333';
    } else if (isFocused) {
      bgColor = colorMode === 'light' ? '#D4E6FF' : '#333333';
    }

    const highlightColor = colorMode === 'light' ? '#C4DDFC' : '#333333';

    return {
      ...styles,
      backgroundColor: bgColor,
      color: colorMode === 'light' ? 'black' : 'white',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && highlightColor,
      },
    };
  },

  placeholder: (provided) => ({
    ...provided,
    color: 'gray',
    fontSize: 19,
    marginTop: 1,
    fontWeight: '400',
  }),
};
