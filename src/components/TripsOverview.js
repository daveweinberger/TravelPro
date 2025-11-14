import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Tag,
  TagLabel,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  SearchIcon,
  AddIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const TripsOverview = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTrip, setEditingTrip] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDates, setEditedDates] = useState('');
  const [editedRoute, setEditedRoute] = useState('');

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setEditedName(trip.name);
    setEditedDates(trip.dates);
    setEditedRoute(trip.route);
    onOpen();
  };

  const handleSaveTrip = () => {
    // In a real app, this would update the backend
    toast({
      title: 'Trip updated',
      description: `${editedName} has been updated`,
      status: 'success',
      duration: 3000,
    });
    onClose();
  };

  const handleDuplicateTrip = (trip) => {
    toast({
      title: 'Trip duplicated',
      description: `Created a copy of ${trip.name}`,
      status: 'success',
      duration: 3000,
    });
  };

  const handleExportTrip = (trip) => {
    toast({
      title: 'Exporting trip',
      description: `Preparing ${trip.name} for export...`,
      status: 'info',
      duration: 3000,
    });
  };

  const handleArchiveTrip = (trip) => {
    toast({
      title: 'Trip archived',
      description: `${trip.name} moved to archives`,
      status: 'info',
      duration: 3000,
    });
  };

  const handleDeleteTrip = (trip) => {
    if (window.confirm(`Are you sure you want to delete ${trip.name}? This cannot be undone.`)) {
      toast({
        title: 'Trip deleted',
        description: `${trip.name} has been removed`,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleViewPastTrip = (trip) => {
    toast({
      title: 'Opening trip',
      description: `Loading ${trip.name}...`,
      status: 'info',
      duration: 2000,
    });
    // Navigate to trip view
    navigate('/');
  };

  const activeTrips = [
    {
      id: 1,
      flag: '🇫🇷',
      name: 'Europe Summer 2025',
      status: 'active',
      dates: 'June 15 - July 20, 2025',
      duration: '35 days',
      route: 'Paris → Rome → Barcelona → Amsterdam',
      stats: {
        gaps: 3,
        flights: 6,
        hotels: 8
      },
      next: 'Flight to Paris in 2 days'
    },
    {
      id: 2,
      flag: '🇹🇭',
      name: 'Southeast Asia Adventure',
      status: 'planned',
      dates: 'Sep 10 - Oct 15, 2025',
      duration: '35 days',
      route: 'Bangkok → Chiang Mai → Vietnam → Cambodia',
      stats: {
        complete: true,
        flights: 5,
        hotels: 12
      },
      next: 'Starts in 120 days'
    },
    {
      id: 3,
      flag: '🇯🇵',
      name: 'Japan Cherry Blossoms 2026',
      status: 'draft',
      dates: 'March 20 - April 10, 2026',
      duration: '21 days',
      route: 'Tokyo → Kyoto → Osaka → Hiroshima',
      stats: {
        flightsBooked: 0,
        flightsTotal: 8
      },
      next: 'Starts in 280 days'
    }
  ];

  const pastTrips = [
    { flag: '🇮🇹', name: 'Italy 2024' },
    { flag: '🇬🇷', name: 'Greece 2023' },
    { flag: '🇪🇸', name: 'Spain 2023' }
  ];

  const getStatusTag = (status) => {
    switch (status) {
      case 'active':
        return <Tag size="sm" colorScheme="blue">📌 Active</Tag>;
      case 'draft':
        return <Tag size="sm" variant="outline">Draft</Tag>;
      default:
        return null;
    }
  };

  const bgColor = useColorModeValue('ios.secondaryBackground', 'gray.900');
  const navBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex direction="column" minH="100vh" bg={bgColor}>
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
            <IconButton
              icon={<SearchIcon />}
              variant="ghost"
              aria-label="Search"
              onClick={() => navigate('/')}
            />
          </Flex>
        </Flex>
      </Box>

      <Container maxW="container.xl" py={6} flex="1">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">My Trips</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="brand">
            New Trip
          </Button>
        </Flex>

        <VStack spacing={4} align="stretch" mb={8}>
          {activeTrips.map((trip) => (
            <Box key={trip.id} bg={cardBg} borderRadius="lg" p={6} boxShadow="md">
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Flex align="center" gap={2}>
                  <Text fontSize="2xl">{trip.flag}</Text>
                  <Heading size="md">{trip.name}</Heading>
                </Flex>
                {getStatusTag(trip.status)}
              </Flex>

              <Divider mb={4} />

              <Text fontSize="sm" color={textColor} mb={2}>
                {trip.dates} • {trip.duration}
              </Text>
              <Text mb={4}>
                {trip.route}
              </Text>

              <Flex gap={2} flexWrap="wrap" mb={4}>
                  {trip.stats.gaps !== undefined && (
                    <Tag size="sm" colorScheme="orange">
                      ⚠️ {trip.stats.gaps} gaps detected
                    </Tag>
                  )}
                  {trip.stats.complete && (
                    <Tag size="sm" colorScheme="green">
                      ✓ Planning complete
                    </Tag>
                  )}
                  {trip.stats.flights !== undefined && (
                    <Tag size="sm" variant="outline">
                      ✈️ {trip.stats.flights} flights
                    </Tag>
                  )}
                  {trip.stats.hotels !== undefined && (
                    <Tag size="sm" variant="outline">
                      🏨 {trip.stats.hotels} hotels
                    </Tag>
                  )}
                  {trip.stats.flightsBooked !== undefined && (
                    <Tag size="sm" colorScheme="orange">
                      ⚠️ {trip.stats.flightsBooked} of {trip.stats.flightsTotal} flights booked
                    </Tag>
                  )}
                </Flex>

                <Text fontSize="sm" color={textColor} mb={4}>
                  {trip.next}
                </Text>

                <Flex gap={2}>
                  <Button colorScheme="brand" onClick={() => navigate('/')}>
                    View Trip
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<EditIcon />}
                    onClick={() => handleEditTrip(trip)}
                  >
                    Edit
                  </Button>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<span>⋮</span>}
                      variant="ghost"
                      aria-label="More options"
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleDuplicateTrip(trip)}>
                        📋 Duplicate Trip
                      </MenuItem>
                      <MenuItem onClick={() => handleExportTrip(trip)}>
                        📤 Export
                      </MenuItem>
                      <MenuItem onClick={() => handleArchiveTrip(trip)}>
                        📦 Archive
                      </MenuItem>
                      <MenuItem
                        color="red.500"
                        onClick={() => handleDeleteTrip(trip)}
                      >
                        🗑️ Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
            </Box>
          ))}
        </VStack>

        <Divider my={6} />

        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">Past Trips ({pastTrips.length})</Heading>
          <Button variant="link">View All</Button>
        </Flex>

        <Flex gap={2} flexWrap="wrap">
          {pastTrips.map((trip, idx) => (
            <Tag
              key={idx}
              size="lg"
              cursor="pointer"
              _hover={{ bg: 'gray.200' }}
              onClick={() => handleViewPastTrip(trip)}
            >
              <TagLabel>{trip.flag} {trip.name}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </Container>

      {/* Edit Trip Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg={cardBg}>
          <ModalHeader>Edit Trip</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Trip Name</FormLabel>
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="e.g., Europe Summer 2025"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Dates</FormLabel>
                <Input
                  value={editedDates}
                  onChange={(e) => setEditedDates(e.target.value)}
                  placeholder="e.g., June 15 - July 20, 2025"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Route</FormLabel>
                <Textarea
                  value={editedRoute}
                  onChange={(e) => setEditedRoute(e.target.value)}
                  placeholder="e.g., Paris → Rome → Barcelona"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSaveTrip}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Flex>
  );
};

export default TripsOverview;
