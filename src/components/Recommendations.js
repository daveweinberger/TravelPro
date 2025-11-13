import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Tag,
  TagLabel,
  Select,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  AddIcon,
  HamburgerIcon,
  BellIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Recommendations = () => {
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState('europe-2025');
  
  const bgColor = useColorModeValue('ios.secondaryBackground', 'gray.900');
  const navBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex direction="column" minH="100vh" bg={bgColor}>
      {/* Navigation Bar */}
      <Box
        bg={navBg}
        borderBottomWidth="1px"
        borderColor={borderColor}
        px={4}
        py={3}
        position="sticky"
        top={0}
        zIndex={10}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label="Menu"
            />
            <MenuList>
              <MenuItem onClick={() => navigate('/')}>🏠 Home</MenuItem>
              <MenuItem onClick={() => navigate('/trips')}>✈️ My Trips</MenuItem>
              <MenuItem onClick={() => navigate('/recommendations')}>💡 Recommendations</MenuItem>
            </MenuList>
          </Menu>

          <Heading size="md" fontWeight="600">TravelPro</Heading>

          <Flex gap={2}>
            <IconButton icon={<BellIcon />} variant="ghost" aria-label="Notifications" />
            <IconButton icon={<SearchIcon />} variant="ghost" aria-label="Search" />
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<span>👤</span>}
                variant="ghost"
                aria-label="User menu"
              />
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <Container maxW="container.xl" py={6} flex="1">
        <Box bg={cardBg} borderRadius="lg" p={6} boxShadow="base">
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Recommendations</Heading>

            <Box>
              <Text fontSize="sm" mb={2} fontWeight="500">Suggestions for</Text>
              <Select
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(e.target.value)}
                maxW="250px"
                size="sm"
              >
                <option value="europe-2025">🇫🇷 Europe Summer 2025</option>
                <option value="asia-2025">🇹🇭 Southeast Asia</option>
              </Select>
            </Box>

            {/* Placeholder Content */}
            <Box textAlign="center" py={12}>
              <Text fontSize="4xl" mb={4}>💡</Text>
              <Heading size="md" mb={4}>Smart Recommendations</Heading>
              <Text color={textColor} mb={6}>
                This feature provides personalized travel suggestions based on your itinerary.
              </Text>
              <VStack spacing={4} align="stretch" maxW="md" mx="auto">
                <Box bg="blue.50" p={4} borderRadius="md">
                  <Text fontWeight="600" mb={2}>🎯 For You</Text>
                  <Text fontSize="sm">Personalized suggestions based on your interests</Text>
                </Box>
                <Box bg="orange.50" p={4} borderRadius="md">
                  <Text fontWeight="600" mb={2}>⚠️ Fill Gaps</Text>
                  <Text fontSize="sm">Activities to fill schedule gaps</Text>
                </Box>
                <Box bg="green.50" p={4} borderRadius="md">
                  <Text fontWeight="600" mb={2}>📍 By Location</Text>
                  <Text fontSize="sm">Attractions and dining by destination</Text>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>

      <Footer />
    </Flex>
  );
};

export default Recommendations;
