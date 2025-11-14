import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  IconButton,
  Badge,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  BellIcon,
  SearchIcon,
  AddIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import Calendar from './Calendar';
import TripDetails from './TripDetails';
import ListView from './ListView';
import ImportPlans from './ImportPlans';
import AlertsView from './AlertsView';
import TagManagementModal from './TagManagementModal';
import Footer from './Footer';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isTagModalOpen, onOpen: onTagModalOpen, onClose: onTagModalClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 15));
  const [selectedTrip, setSelectedTrip] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  
  const { trips, availableTags } = useTripContext();

  // Filter trips based on selection and tags
  const filteredTrips = useMemo(() => {
    let filtered = trips;
    
    // Filter by selected trip
    if (selectedTrip !== 'all') {
      filtered = filtered.filter(trip => trip.id === selectedTrip);
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(trip =>
        selectedTags.some(tag => trip.tags.includes(tag))
      );
    }
    
    return filtered;
  }, [trips, selectedTrip, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Count active gaps
  const activeGapsCount = useMemo(() => {
    return trips.reduce((count, trip) => {
      return count + trip.events.filter(e => e.type === 'gap' && !e.dismissed).length;
    }, 0);
  }, [trips]);
  
  const bgColor = useColorModeValue('ios.secondaryBackground', 'gray.900');
  const navBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Flex direction="column" minH="100vh" bg={bgColor}>
      {/* iOS-style Navigation Bar */}
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
              icon={<BellIcon />}
              variant="ghost"
              aria-label="Notifications"
              position="relative"
            >
              <Badge
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                fontSize="xs"
              >
                3
              </Badge>
            </IconButton>
            <IconButton
              icon={<SearchIcon />}
              variant="ghost"
              aria-label="Search"
            />
          </Flex>
        </Flex>
      </Box>

      <Container maxW="container.xl" py={6} flex="1">
        <Box bg={cardBg} borderRadius="lg" p={6} boxShadow="base">
          {/* Header */}
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">All Trips</Heading>
            <Flex gap={2}>
              <Button
                leftIcon={<span>🏷️</span>}
                variant="outline"
                size="sm"
                onClick={onTagModalOpen}
              >
                Manage Tags
              </Button>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="brand"
                size="sm"
                onClick={onOpen}
              >
                Add Plans
              </Button>
            </Flex>
          </Flex>

          {/* Filters */}
          <Box mb={4}>
            <Select
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              maxW="250px"
              mb={3}
              size="sm"
            >
              <option value="all">All Trips</option>
              {trips.map(trip => (
                <option key={trip.id} value={trip.id}>
                  {trip.flag} {trip.name}
                </option>
              ))}
            </Select>
            <Flex gap={2} flexWrap="wrap">
              {availableTags.map(tag => (
                <Tag
                  key={tag.id}
                  size="md"
                  colorScheme={selectedTags.includes(tag.id) ? tag.color : 'gray'}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => toggleTag(tag.id)}
                  variant={selectedTags.includes(tag.id) ? 'solid' : 'outline'}
                >
                  <TagLabel>{tag.emoji} {tag.name}</TagLabel>
                  {selectedTags.includes(tag.id) && <TagCloseButton />}
                </Tag>
              ))}
            </Flex>
          </Box>

          {/* Tabs */}
          <Tabs index={activeTab} onChange={setActiveTab} colorScheme="brand">
            <TabList>
              <Tab>📅 Calendar</Tab>
              <Tab>📋 List View</Tab>
              <Tab>
                <Flex align="center" gap={2}>
                  🔔 Alerts
                  {activeGapsCount > 0 && (
                    <Badge colorScheme="red" borderRadius="full">{activeGapsCount}</Badge>
                  )}
                </Flex>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <Box mt={4}>
                  <Calendar
                    trips={filteredTrips}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                  <Box mt={6}>
                    <TripDetails
                      trips={filteredTrips}
                      selectedDate={selectedDate}
                    />
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel px={0}>
                <Box mt={4}>
                  <ListView trips={filteredTrips} />
                </Box>
              </TabPanel>

              <TabPanel px={0}>
                <Box mt={4}>
                  <AlertsView />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Action Buttons */}
          <Flex gap={2} mt={6} pt={6} borderTopWidth="1px">
            <Button leftIcon={<AddIcon />} variant="outline" size="sm">
              Add Event
            </Button>
            <Button leftIcon={<span>📤</span>} variant="outline" size="sm">
              Export
            </Button>
            <Button leftIcon={<span>💡</span>} variant="outline" size="sm">
              Suggestions
            </Button>
          </Flex>
        </Box>
      </Container>

      {/* Import Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader>Import Travel Plans</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ImportPlans trips={trips} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Tag Management Modal */}
      <TagManagementModal isOpen={isTagModalOpen} onClose={onTagModalClose} />

      <Footer />
    </Flex>
  );
};

export default HomeScreen;
