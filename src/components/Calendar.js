import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

const Calendar = ({ trips, selectedDate, onDateSelect }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startDayOfWeek = getDay(monthStart);
  const emptyDays = Array(startDayOfWeek).fill(null);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const dayBg = useColorModeValue('white', 'gray.700');
  const dayBorder = useColorModeValue('gray.200', 'gray.600');
  const dayText = useColorModeValue('gray.800', 'gray.100');
  const weekdayText = useColorModeValue('gray.600', 'gray.400');
  const selectedBg = useColorModeValue('brand.50', 'brand.900');
  const selectedText = useColorModeValue('brand.600', 'brand.200');
  const alertBg = useColorModeValue('red.50', 'red.900');
  const alertBorder = useColorModeValue('red.400', 'red.500');
  const hoverBorder = useColorModeValue('brand.500', 'brand.400');

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

  const hasAlert = (date) => {
    const events = getEventsForDate(date);
    return events.some(e => e.alert || e.type === 'gap');
  };

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      p={{ base: 3, md: 5 }}
      boxShadow="base"
    >
      <Heading
        size="md"
        textAlign="center"
        mb={4}
        fontWeight="600"
      >
        {format(selectedDate, 'MMMM yyyy')}
      </Heading>
      
      {/* Weekday Headers */}
      <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={2}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <Text
            key={day}
            textAlign="center"
            fontWeight="600"
            color={weekdayText}
            fontSize="sm"
            py={2}
          >
            {day}
          </Text>
        ))}
      </Grid>
      
      {/* Calendar Days */}
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {emptyDays.map((_, index) => (
          <Box key={`empty-${index}`} minH="60px" />
        ))}
        
        {daysInMonth.map(day => {
          const events = getEventsForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const alert = hasAlert(day);
          
          return (
            <Box
              key={day.toString()}
              minH={{ base: '60px', md: '80px' }}
              p={2}
              borderWidth="1px"
              borderColor={
                isSelected ? hoverBorder : 
                alert ? alertBorder : 
                dayBorder
              }
              borderRadius="md"
              cursor="pointer"
              bg={
                isSelected ? selectedBg : 
                alert ? alertBg : 
                dayBg
              }
              transition="all 0.2s"
              _hover={{
                borderColor: hoverBorder,
                boxShadow: 'md',
                transform: 'translateY(-2px)',
              }}
              onClick={() => onDateSelect(day)}
              display="flex"
              flexDirection="column"
            >
              <Flex justify="space-between" align="center" mb={1}>
                <Text
                  fontWeight="600"
                  fontSize="sm"
                  color={isSelected ? selectedText : dayText}
                >
                  {format(day, 'd')}
                </Text>
                {alert && (
                  <Text fontSize="xs">⚠️</Text>
                )}
              </Flex>
              
              <Flex gap={1} flexWrap="wrap" mt="auto">
                {events.slice(0, 3).map((event, idx) => (
                  <Text
                    key={idx}
                    fontSize={{ base: 'xs', md: 'sm' }}
                    title={event.title}
                  >
                    {event.trip.flag}
                  </Text>
                ))}
                {events.length > 3 && (
                  <Text
                    fontSize="xs"
                    color={weekdayText}
                    fontWeight="600"
                  >
                    +{events.length - 3}
                  </Text>
                )}
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Calendar;
