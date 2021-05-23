import React from 'react';
import { Box, Image, Text, ListItem, OrderedList, Link, Flex } from '@chakra-ui/react';

export default function DocsView() {
  return (
    <Flex bgColor="#fff" marginTop="10">
      <Box p={10} fontFamily="Poppins" fontSize="14" width="90%" marginLeft="10">
        <Text fontSize="3xl" letterSpacing="wide" fontWeight="bold">
          OKDEX Documentation
        </Text>
        <br />
        <Text fontSize="medium">
          Welcome to OKDEX! The pages that follow contain comprehensive documentation of our DEX and
          its ecosystem. For a high level overview of our DEX and its freatures see check below.
        </Text>
        <br />
        <Text fontSize="medium" letterSpacing="wide">
          The OKCoin DEX Aggregator is a product meant to act as a ladder for OKCoin users to enter
          the DeFi space and cement trader loyalty to OKCoin as a preferred fiat on/off ramp for
          DeFi activities such as trading, farming, and liquidity provisioning. While the DEX
          Aggregator space is competitive, there are several methods employed to differentiate this
          product from the rest of the fray. In chief, the OKCoin DEX aggregator utilizes a UI and
          UX that enables newer traders to hurdle the stiff barrier to entry DeFi trading is often
          accompanied by, giving new users confidence in how to manage a trade and execute
          transactions. Learning materials are present every step of mitigating a typically
          difficult learning curve towards one that is more pleasant.
        </Text>
        <br />
        <Text fontSize="medium" letterSpacing="wide">
          In addition, given the aggregator’s ties to OKCoin, therein lies leverage absent amongst
          all other DEX Aggregators. Even 1Inch, the biggest player in the space, only has a
          connection to CEXs in the sense of its governance token $1INCH. This aggregator will have
          the backing of OKCoin, allowing it to swiftly achieve credibility amongst DeFi. With
          potential airdrops, bonuses, and other user-incentivizing measures potentially taking
          place in the future, there is ample space for this aggregator to grow. Lastly, innovation
          is the final factor which differentiates OKCoin’s aggregator.
        </Text>
        <br />
        <Text fontSize="2xl" letterSpacing="wide" fontWeight="bold">
          What is a DEX and DEX aggregator?
        </Text>
        <br />
        <Text fontSize="medium" letterSpacing="wide">
          DEX is a shorthand for decentralized exchange, which is a cryptocurrency trading platform
          that utilizes smart contract functionalities to allow users to keep control over their
          funds while trading their crypto. DEXs are great for users who do not trust centralized
          exchanges to manage their funds. However, DEXs may not have enough liquidity for certain
          token pools and prevent users from trading their cryptocurrencies. Also, there are so many
          DEXs online with different swap execution fees, making it hard for price-sensitive users
          to determine what platform to use. DEX aggregator solves these issues by combining
          liquidity from different DEXs and therefore offering better swap rates and deeper
          liquidity.
        </Text>
        <br />
        <Text fontSize="medium">Aggregator</Text>
        <OrderedList fontSize="medium">
          <ListItem>Provide deeper liquidity for a token pool </ListItem>
          <ListItem>Find the best execution price</ListItem>
          <ListItem>Traders always retain control over their funds</ListItem>
          <ListItem>Improve decentralized trading experience with easy to use UI </ListItem>
        </OrderedList>
        <br />
        <Text fontSize="2xl" letterSpacing="wide" fontWeight="bold">
          Technical Architecture
        </Text>
        <br />
        <Box marginLeft="5">
          <Text fontSize="medium">
            <Text fontWeight="bold">Ethereum</Text> The aggregator is built to provide the Ethereum
            blockchain, but will also cater towards the Binance Smart Chain (BSC) post-launch
            (simply by changing Metamask networks and adding BSC). To interact with the aggregator,
            users are first asked to connect via wallet and may subsequently trade ERC-20 tokens
            provided amongst the list.
            <br /> <br />
            <Text fontWeight="bold"> Web3 </Text> Concurrent with other DeFi platforms, you will
            have to connect to the aggregator via a Web 3 wallet such as MetaMask. A guide can be
            found
            <Link
              color="blue"
              href="https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047?gi=9aa8533eb88e"
            >
              {' '}
              here
            </Link>
            <br /> <br />
            <Text fontWeight="bold" fontSize="medium">
              0xAPI{' '}
            </Text>{' '}
            OKDEX uses 0xAPI to find out the cheapest route to perform the swap.0x is a protocol
            that facilitates the peer-to-peer exchange of Ethereum-based assets. The protocol serves
            as an open standard and common building block for any developer needing exchange
            functionality.A guide can be found
            <Link color="blue" href="https://0x.org/docs/core-concepts">
              {' '}
              here
            </Link>
          </Text>
          <br />
          <Image src="/static/okdexflow.jpg" alt="OKDEX Flow" />
        </Box>
        <br />
        <Text fontSize="2xl" letterSpacing="wide" fontWeight="bold" id="12">
          Value Discussion
        </Text>
        <br />
        <Text fontSize="medium">
          DeFi volume is growing exponentially and CEXs are making active efforts to engage with
          DeFi traders to maintain their allegiance to using their specific CEX as a fiat on/off
          ramp. Examples include the following: Binance Smart Chain and $BNB Open Ocean Aggregator
          Acquisition by Binance $FTT Token of FTX Coinbase Wallet Mobile Application Thus, it’s
          clear that CEXs that do not expand and/or cater to DeFi traders are failing to innovate
          and falling behind. Hence it is crucial, OKCoin pursues items such as a DEX Aggregator to
          maintain relevance and pace with competitors.
        </Text>
        <br />
        <Text fontSize="2xl" letterSpacing="wide" fontWeight="bold">
          How to use OKDEX?
        </Text>
        <Text> Heres a quick video on how to use OKDEX. Enjoy :) </Text> <br />
        <iframe
          src="https://www.youtube.com/embed/6PmOA3aaud8"
          title="okdex tutorial"
          style={{ width: '80%', height: 400 }}
        />
      </Box>
      <Box marginTop={20} height="2xl" width="20%" />
    </Flex>
  );
}
