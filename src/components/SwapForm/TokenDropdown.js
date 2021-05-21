/* eslint-disable react/jsx-props-no-spreading */
import { HStack, Image, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import React from 'react';
import { components } from 'react-select';
import { useAtom } from 'jotai';
import BigNumber from 'bignumber.js';
import { balanceAtom, userOnboardAtom, tokenBalanceAtom, web3Atom } from '../../utils/atoms';
import Toasts from '../../constants/toasts';
import { getTokenBalance } from '../../utils/queryBalance';

const { Option, SingleValue } = components;

// Check token balances
async function handleDropdownSelect(token, web3, userBalance, userOnboard) {
  let tokenBal;
  console.log(userOnboard, userBalance);
  console.log(userOnboard && userBalance);
  if (userOnboard) {
    let balance = userBalance;
    console.log(balance);
    if (!userBalance) {
      balance = 0;
    }
    console.log('hi');
    const balanceData = {
      wallet: {
        provider: userOnboard.wallet.provider,
      },
      address: userOnboard.address,
      BigNumber,
      ethAmount: web3.utils.fromWei(balance.toString(), 'ether'),
    };
    tokenBal = await getTokenBalance(token)(balanceData).then((res) => {
      return res;
    });
    console.log(token, tokenBal);
  }
  console.log('hi', tokenBal);
  return tokenBal;
}

export const IconOptionIn = (props) => {
  const [, setTokenBalance] = useAtom(tokenBalanceAtom);
  const [userBalance] = useAtom(balanceAtom);
  console.log(userBalance);
  const [userOnboard] = useAtom(userOnboardAtom);
  const [web3] = useAtom(web3Atom);
  const toast = useToast();
  const { data } = props;
  return (
    <Option {...props}>
      <HStack
        onClick={async () => {
          console.log(process.env.REACT_APP_ENV);
          let dexNet;
          if (process.env.REACT_APP_ENV === 'production') {
            dexNet = 1;
          } else {
            dexNet = 42;
          }
          if (userOnboard.address) {
            if (userOnboard.network === dexNet) {
              const tb = await handleDropdownSelect(
                data.value,
                web3,
                userBalance,
                userOnboard
              ).then((res) => {
                return res;
              });
              setTokenBalance(tb);
            } else {
              toast(Toasts.networkMismatch);
            }
          }
        }}
      >
        <img src={data.icon} defaultsource={data.icon} alt={data.label} />
        <Text>{data.label}</Text>
      </HStack>
    </Option>
  );
};

export const IconOptionOut = (props) => {
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
        <Text color={useColorModeValue('gray.900', 'gray.200')}>{data.label}</Text>
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
