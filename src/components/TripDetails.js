import React from 'react';
import { format, isSameDay } from 'date-fns';
import {
  Box,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Flex,
  Tag,
  TagLabel,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const TripDetails = ({ trips, selectedDate }) => {
  const getEventsForDate = (date) => {
    const events = [];
    trips.forEach(trip => {
      trip.events.forEach(event => {
        if (isSameDay(event.date, date)) {
          events.push({ ...event, trip });
        }
      });
    });
    return events;
  };

  const getIconForType = (type) => {
    const icons = {
      flight: '✈️',
      hotel: '🏨',
      activity: '🎫',
      dining: '🍽️',
      planning: '📋',
      gap: '⚠️'
    };
    return icons[type] || '📎';
  };

  const events = getEventsForDate(selectedDate);
  
  if (events.length === 0) {
    return (
      <Box
        bg="white"
        borderRadius="lg"
        p={8}
        textAlign="center"
        boxShadow="base"
      >
        <Text color="gray.600" mb={4}>
          No events scheduled for {format(selectedDate, 'MMMM d, yyyy')}
        </Text>
        <Button leftIcon={<AddIcon />} colorScheme="brand">
          Add Event
        </Button>
      </Box>
    );
  }

  const groupedEvents = events.reduce((acc, event) => {
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
    <VStack spacing={4} align="stretch">
      {Object.values(groupedEvents).map(({ trip, events }) => (
        <Box
          key={trip.id}
          bg="white"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
        >
          <Flex
            justify="space-between"
            align="center"
            p={4}
            borderBottomWidth="1px"
            flexWrap="wrap"
            gap={2}
          >
            <Heading size="md" fontWeight="600">
              {trip.flag} {trip.name}
            </Heading>
            <Flex gap={2} flexWrap="wrap">
              {trip.tags.map(tag => (
                <Tag key={tag} size="sm" colorScheme="blue" borderRadius="full">
                  <TagLabel>🏷️ {tag}</TagLabel>
                </Tag>
              ))}
            </Flex>
          </Flex>
          
          <Box p={4}>
            <VStack spacing={4} align="stretch">
              {events.map((event, idx) => (
                <Box key={idx}>
                  {idx > 0 && <Divider my={2} />}
                  {event.type === 'gap' ? (
                    <Alert status="warning" borderRadius="md">
                      <AlertIcon />
                      <Box flex="1">
                        <Text fontWeight="600" mb={1}>
                          {event.time} ({event.title})
                        </Text>
                        <Flex gap={2} mt={2}>
                          <Button size="sm" variant="outline" colorScheme="orange">
                            View Suggestions
                          </Button>
                          <Button size="sm" variant="ghost">
                            Dismiss
                          </Button>
                        </Flex>
                      </Box>
                    </Alert>
                  ) : (
                    <Flex gap={4} align="flex-start">
                      <Text fontSize="2xl">{getIconForType(event.type)}</Text>
                      <Box flex="1">
                        <Text fontWeight="600" fontSize="sm" color="gray.700">
                          {event.time}
                        </Text>
                        <Text fontSize="md" fontWeight="500" mt={1}>
                          {event.title}
                        </Text>
                        {event.location && (
                          <Text fontSize="sm" color="gray.600" mt={1}>
                            📍 {event.location}
                          </Text>
                        )}
                        {event.confirmation && (
                          <Text fontSize="sm" color="gray.600" mt={1}>
                            Conf: {event.confirmation}
                          </Text>
                        )}
                      </Box>
                      <Button size="sm" variant="ghost" colorScheme="brand">
                        View Details
                      </Button>
                    </Flex>
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default TripDetails;
