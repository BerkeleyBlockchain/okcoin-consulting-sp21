/* eslint-disable react/jsx-props-no-spreading */
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

import web3Utils from 'web3-utils';
import React from 'react';
import { useAtom } from 'jotai';
import { addressAtom, onboardAtom, balanceAtom } from '../../utils/atoms';
import AccountModal from '../AccountModal';
import NavItems from '../../constants/navbar';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [address] = useAtom(addressAtom);
  const [onboard] = useAtom(onboardAtom);
  const [balance] = useAtom(balanceAtom);

  return (
    <Box>
      <Flex
        bg={colorMode === 'light' ? 'white' : '#222222'}
        color={colorMode === 'light' ? '#222222' : 'white'}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.900'}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={6}>
            <DesktopNav />
          </Flex>
        </Flex>

        {address && onboard && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={3}
            align="center"
          >
            <>
              {typeof balance === 'string' ? (
                <Text
                  fontWeight="600"
                  color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
                  size="sm"
                >
                  {parseFloat(web3Utils.fromWei(balance, 'ether')).toPrecision(6)}
                </Text>
              ) : (
                <Spinner size="xs" />
              )}

              <Text
                fontWeight="700"
                color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
                size="sm"
                ml={1}
              >
                ETH
              </Text>
            </>
            <AccountModal address={address} onboard={onboard} />
          </Stack>
        )}
        <IconButton
          onClick={() => {
            toggleColorMode();
            onboard.config({ darkMode: colorMode !== 'dark' });
          }}
          icon={<MoonIcon />}
          ml={3}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack direction="row" spacing={4} alignItems="center">
      {colorMode === 'light' ? (
        <Image src="/static/logo_black.png" style={{ height: 40, width: 40 }} />
      ) : (
        <Image src="/static/logo_white.png" style={{ height: 40, width: 40 }} />
      )}
      <Text
        color="#111111"
        bgGradient="linear(to-l, #FF0080,  #7928CA)"
        fontWeight="extrabold"
        bgClip="text"
        fontSize={22}
      >
        OKDex
      </Text>
      {NavItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={4}
                href={navItem.href ?? '#'}
                fontSize="md"
                fontWeight={500}
                color={colorMode === 'light' ? '#222222' : 'gray.200'}
                _hover={{
                  textDecoration: 'none',
                  color: colorMode === 'light' ? '#222222' : 'white',
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={colorMode === 'light' ? 'white' : '#222222'}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  const { colorMode } = useColorMode();

  return (
    <Link
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: colorMode === 'light' ? 'pink.50' : 'gray.900' }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text transition="all .3s ease" _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize="md">{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack bg={colorMode === 'light' ? 'white' : '#222222'} p={4} display={{ md: 'none' }}>
      {NavItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={colorMode === 'light' ? 'gray.600' : 'gray.200'}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
