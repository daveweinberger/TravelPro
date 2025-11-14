import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import {
  Box,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Flex,
  VStack,
  Tag,
  TagLabel,
  Select,
  Divider,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, AttachmentIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import EventDetailsModal from './EventDetailsModal';

const ListView = ({ trips }) => {
  const navigate = useNavigate();
  const { dismissGap, getTagById } = useTripContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('this-week');
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('brand.500', 'brand.600');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const mutedText = useColorModeValue('gray.600', 'gray.400');

  const getIconForType = (type) => {
    const icons = {
      flight: '✈️',
      hotel: '🏨',
      activity: '🎭',
      dining: '🍽️',
      planning: '📋',
      gap: '⚠️'
    };
    return icons[type] || '📎';
  };

  const handleViewDetails = (event, trip) => {
    setSelectedEvent(event);
    setSelectedTrip(trip);
    onOpen();
  };

  const handleDismissGap = (tripId, eventId) => {
    dismissGap(tripId, eventId);
    toast({
      title: 'Gap dismissed',
      status: 'info',
      duration: 2000,
    });
  };

  const handleViewSuggestions = () => {
    navigate('/gap/1');
  };

  // Flatten all events with their trip info, filter out dismissed gaps
  const allEvents = trips.flatMap(trip =>
    trip.events
      .filter(event => event.type !== 'gap' || !event.dismissed)
      .map(event => ({ ...event, trip }))
  );

  // Group events by date
  const eventsByDate = allEvents.reduce((acc, event) => {
    const dateKey = format(event.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: event.date,
        events: []
      };
    }
    acc[dateKey].events.push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <Box>
      <Flex gap={4} mb={6} flexWrap="wrap">
        <Box>
          <Text fontSize="sm" mb={2} fontWeight="500">Type</Text>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            size="sm"
            w="150px"
          >
            <option value="all">All</option>
            <option value="flight">✈️ Flights</option>
            <option value="hotel">🏨 Hotels</option>
            <option value="activity">🎭 Activities</option>
          </Select>
        </Box>

        <Box>
          <Text fontSize="sm" mb={2} fontWeight="500">Date</Text>
          <Select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            size="sm"
            w="150px"
          >
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="all-upcoming">All Upcoming</option>
          </Select>
        </Box>
      </Flex>

      <VStack spacing={6} align="stretch">
        {sortedDates.map(dateKey => {
          const { date, events } = eventsByDate[dateKey];
          
          // Group events by trip for this date
          const eventsByTrip = events.reduce((acc, event) => {
            const tripId = event.trip.id;
            if (!acc[tripId]) {
              acc[tripId] = {
                trip: event.trip,
                events: []
              };
            }
            acc[tripId].events.push(event);
            return acc;
          }, {});

          return (
            <Box
              key={dateKey}
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
            >
              <Box bg={headerBg} color="white" p={4}>
                <Heading size="md" fontWeight="600">
                  📅 {format(date, 'EEEE, MMMM d, yyyy').toUpperCase()}
                </Heading>
              </Box>

              <Box p={4}>
                <VStack spacing={6} align="stretch">
                  {Object.values(eventsByTrip).map(({ trip, events }) => (
                    <Box key={trip.id}>
                      <Flex align="center" gap={2} mb={2}>
                        <Heading size="sm" fontWeight="600">
                          {trip.flag} {trip.name}
                        </Heading>
                        {trip.tags.map(tagId => {
                          const tag = getTagById(tagId);
                          return tag ? (
                            <Tag key={tagId} size="sm" colorScheme={tag.color} borderRadius="full">
                              <TagLabel>{tag.emoji} {tag.name}</TagLabel>
                            </Tag>
                          ) : null;
                        })}
                      </Flex>
                      <Divider mb={4} />

                      <VStack spacing={4} align="stretch" pl={4}>
                        {events.map((event, idx) => (
                          <Box key={idx}>
                            {event.type === 'gap' ? (
                              <Alert status="warning" borderRadius="md">
                                <AlertIcon />
                                <Box flex="1">
                                  <Text fontWeight="600" fontSize="sm" mb={1}>
                                    {getIconForType(event.type)} {event.time}
                                  </Text>
                                  <Text fontSize="sm" color={textColor} mb={2}>
                                    6 hours unplanned
                                  </Text>
                                  <Flex gap={2}>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      colorScheme="orange"
                                      onClick={handleViewSuggestions}
                                    >
                                      View Suggestions
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleDismissGap(trip.id, event.id)}
                                    >
                                      Dismiss
                                    </Button>
                                  </Flex>
                                </Box>
                              </Alert>
                            ) : (
                              <Flex gap={4} align="flex-start">
                                <Text fontSize="2xl">{getIconForType(event.type)}</Text>
                                <Box flex="1">
                                  <Text fontWeight="600" fontSize="md">
                                    {event.time} • {event.title}
                                  </Text>
                                  {event.location && (
                                    <Text fontSize="sm" color={mutedText} mt={1}>
                                      📍 {event.location}
                                    </Text>
                                  )}
                                  {event.confirmation && (
                                    <Text fontSize="sm" color={mutedText} mt={1}>
                                      Conf: {event.confirmation}
                                    </Text>
                                  )}
                                  {event.details && (
                                    <Text fontSize="sm" color={mutedText} mt={1}>
                                      {event.details}
                                    </Text>
                                  )}
                                  <Flex gap={2} mt={2} flexWrap="wrap">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      colorScheme="brand"
                                      onClick={() => handleViewDetails(event, trip)}
                                    >
                                      View Details
                                    </Button>
                                    {(event.type === 'flight' || event.type === 'hotel') && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        leftIcon={<AttachmentIcon />}
                                        onClick={() => handleViewDetails(event, trip)}
                                      >
                                        {event.type === 'flight' ? 'Attachment' : 'Confirmation'}
                                      </Button>
                                    )}
                                    {event.type === 'planning' && (
                                      <Button size="sm" variant="ghost" leftIcon={<AddIcon />}>
                                        Add Event
                                      </Button>
                                    )}
                                  </Flex>
                                </Box>
                              </Flex>
                            )}
                            {idx < events.length - 1 && <Divider mt={4} />}
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Box>
          );
        })}
      </VStack>

      <Flex justify="center" mt={6}>
        <Button variant="outline">Load More Days...</Button>
      </Flex>

      <EventDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        event={selectedEvent}
        trip={selectedTrip}
      />
    </Box>
  );
};

export default ListView;
