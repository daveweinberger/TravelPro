import React, { useState } from 'react';
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
import Calendar from './Calendar';
import TripDetails from './TripDetails';
import ListView from './ListView';
import ImportPlans from './ImportPlans';
import AlertsView from './AlertsView';
import Footer from './Footer';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 15));
  const [selectedTrip, setSelectedTrip] = useState('all');
  const [activeTab, setActiveTab] = useState(0);

  const trips = [
    {
      id: 'europe-2025',
      name: 'EUROPE SUMMER 2025',
      tags: ['Vacation', 'Europe'],
      flag: '🇫🇷',
      events: [
        {
          date: new Date(2025, 5, 15),
          type: 'flight',
          time: '10:30 AM',
          title: 'Flight BA 2341: JFK → CDG',
          confirmation: 'ABC123',
          location: 'Paris',
          details: 'Terminal 7, Gate B22'
        },
        {
          date: new Date(2025, 5, 15),
          type: 'hotel',
          time: '3:00 PM',
          title: 'Hotel Le Marais Check-in',
          confirmation: 'HTL789',
          location: 'Paris',
          details: '123 Rue Saint-Antoine'
        },
        {
          date: new Date(2025, 5, 17),
          type: 'hotel',
          time: '12:00 PM',
          title: 'Hotel Le Marais Checkout',
          location: 'Paris'
        },
        {
          date: new Date(2025, 5, 17),
          type: 'gap',
          time: '2:00 PM - 8:00 PM',
          title: 'GAP: 6 hours',
          alert: true,
          location: 'Paris'
        },
        {
          date: new Date(2025, 5, 17),
          type: 'dining',
          time: '8:00 PM',
          title: 'Dinner: Le Comptoir',
          confirmation: 'RES456',
          location: 'Paris',
          details: 'Reservation for 2'
        },
        {
          date: new Date(2025, 5, 18),
          type: 'flight',
          time: '2:15 PM',
          title: 'Flight AF 5678: CDG → FCO',
          location: 'Paris → Rome',
          confirmation: 'XYZ456',
          details: 'Terminal 2E, Gate K41'
        },
        {
          date: new Date(2025, 5, 19),
          type: 'activity',
          time: '10:00 AM',
          title: 'Colosseum Tour',
          location: 'Rome'
        }
      ]
    },
    {
      id: 'asia-2025',
      name: 'SOUTHEAST ASIA',
      tags: ['Vacation', 'Asia'],
      flag: '🇹🇭',
      events: [
        {
          date: new Date(2025, 5, 18),
          type: 'planning',
          time: 'All day',
          title: 'Planning: Review hotel options in Bangkok',
          location: 'Bangkok'
        },
        {
          date: new Date(2025, 5, 19),
          type: 'planning',
          time: 'All day',
          title: 'Planning: Book flights to Chiang Mai',
          location: 'Bangkok'
        }
      ]
    }
  ];

  const tags = ['Europe', 'Asia', 'Work'];
  
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
              <Button leftIcon={<span>🏷️</span>} variant="outline" size="sm">
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
              <option value="europe-2025">🇫🇷 Europe Summer 2025</option>
              <option value="asia-2025">🇹🇭 Southeast Asia</option>
            </Select>
            <Flex gap={2} flexWrap="wrap">
              {tags.map(tag => (
                <Tag key={tag} size="md" colorScheme="blue" borderRadius="full">
                  <TagLabel>🏷️ {tag}</TagLabel>
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
                  <Badge colorScheme="red" borderRadius="full">3</Badge>
                </Flex>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <Box mt={4}>
                  <Calendar
                    trips={trips}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                  <Box mt={6}>
                    <TripDetails
                      trips={trips}
                      selectedDate={selectedDate}
                    />
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel px={0}>
                <Box mt={4}>
                  <ListView trips={trips} />
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

      <Footer />
    </Flex>
  );
};

export default HomeScreen;
