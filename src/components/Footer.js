import React from 'react';
import {
  Box,
  Container,
  Flex,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      as="footer"
      bg={bg}
      borderTopWidth="1px"
      borderColor={borderColor}
      py={4}
      mt="auto"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Text fontSize="sm" color={textColor}>
            © 2025 TravelPro. Built for advanced travelers.
          </Text>
          
          <Flex align="center" gap={4}>
            <Text fontSize="sm" color={textColor}>
              {colorMode === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Text>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle dark mode"
              size="sm"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
