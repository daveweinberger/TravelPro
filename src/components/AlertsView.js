import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Tag,
  TagLabel,
  VStack,
  Flex,
  Alert,
  AlertIcon,
  Divider,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const AlertsView = () => {
  const [activeView, setActiveView] = useState('gaps');
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const buttonBg = useColorModeValue('gray.100', 'gray.700');
  const activeButtonBg = useColorModeValue('brand.500', 'brand.600');

  const gapAlerts = [
    {
      priority: 'high',
      title: '6-hour gap in Paris',
      trip: { flag: '🇫🇷', name: 'EUROPE SUMMER', tags: ['Vacation', 'Europe'] },
      date: 'Thursday, June 17',
      time: '2:00 PM - 8:00 PM',
      between: [
        'Hotel Le Marais checkout (12:00 PM)',
        'Dinner at Le Comptoir (8:00 PM)'
      ],
      suggestions: 12
    },
    {
      priority: 'medium',
      title: '4-hour gap in Rome',
      trip: { flag: '🇫🇷', name: 'EUROPE SUMMER', tags: ['Vacation', 'Europe'] },
      date: 'Saturday, June 20',
      time: '10:00 AM - 2:00 PM',
      between: [
        'Colosseum tour end (10:00 AM)',
        'Vatican Museums entry (2:00 PM)'
      ],
      suggestions: 8
    },
    {
      priority: 'low',
      title: 'Morning gap before flight',
      trip: { flag: '🇫🇷', name: 'EUROPE SUMMER', tags: ['Vacation', 'Europe'] },
      date: 'Monday, June 25',
      time: '6:00 AM - 10:00 AM',
      between: [
        'Hotel checkout (6:00 AM)',
        'Flight departure (10:00 AM)'
      ],
      recommendations: 'Airport lounge, breakfast'
    }
  ];

  const upcomingReminders = [
    {
      timing: '2 days before departure',
      title: 'Check-in for Flight BA 2341',
      trip: '🇫🇷 EUROPE SUMMER'
    },
    {
      timing: '7 days before departure',
      title: 'Notify bank about international travel',
      trip: '🇫🇷 EUROPE SUMMER + 🇹🇭 SOUTHEAST ASIA'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Box>
      {/* Segmented Control */}
      <Flex gap={2} mb={6} flexWrap="wrap">
        <Button
          size="md"
          bg={activeView === 'gaps' ? activeButtonBg : buttonBg}
          color={activeView === 'gaps' ? 'white' : 'inherit'}
          onClick={() => setActiveView('gaps')}
          leftIcon={<Text>⚠️</Text>}
          rightIcon={<Badge colorScheme="red" ml={1}>3</Badge>}
          _hover={{ bg: activeView === 'gaps' ? activeButtonBg : 'gray.200' }}
        >
          Gaps
        </Button>
        <Button
          size="md"
          bg={activeView === 'upcoming' ? activeButtonBg : buttonBg}
          color={activeView === 'upcoming' ? 'white' : 'inherit'}
          onClick={() => setActiveView('upcoming')}
          leftIcon={<Text>📅</Text>}
          rightIcon={<Badge colorScheme="blue" ml={1}>5</Badge>}
          _hover={{ bg: activeView === 'upcoming' ? activeButtonBg : 'gray.200' }}
        >
          Upcoming
        </Button>
        <Button
          size="md"
          bg={activeView === 'resolved' ? activeButtonBg : buttonBg}
          color={activeView === 'resolved' ? 'white' : 'inherit'}
          onClick={() => setActiveView('resolved')}
          leftIcon={<Text>✓</Text>}
          rightIcon={<Badge colorScheme="green" ml={1}>12</Badge>}
          _hover={{ bg: activeView === 'resolved' ? activeButtonBg : 'gray.200' }}
        >
          Resolved
        </Button>
      </Flex>

      {/* Content Area */}
      <Box>
        {activeView === 'gaps' && (
            <VStack spacing={6} align="stretch">
              {/* Gap Alerts Section */}
              <Box bg={cardBg} borderRadius="lg" overflow="hidden" boxShadow="md">
                <Box bg="orange.100" p={4}>
                  <Heading size="md" color="orange.800">⚠️ GAP ALERTS</Heading>
                </Box>
                <Box p={4}>
                  <VStack spacing={4} align="stretch">
                    {gapAlerts.map((alert, idx) => (
                      <Box
                        key={idx}
                        borderWidth="1px"
                        borderLeftWidth="4px"
                        borderLeftColor={`${getPriorityColor(alert.priority)}.500`}
                        borderRadius="md"
                        p={4}
                      >
                        <Tag
                          size="sm"
                          colorScheme={getPriorityColor(alert.priority)}
                          mb={2}
                        >
                          ⚠️ {alert.priority.toUpperCase()} PRIORITY
                        </Tag>
                        
                        <Heading size="sm" mb={2}>
                          {alert.title}
                        </Heading>
                        
                        <Flex align="center" gap={2} mb={2} flexWrap="wrap">
                          <Text fontSize="sm" fontWeight="600">
                            {alert.trip.flag} {alert.trip.name}
                          </Text>
                          {alert.trip.tags.map(tag => (
                            <Tag key={tag} size="sm" colorScheme="blue" borderRadius="full">
                              <TagLabel>🏷️ {tag}</TagLabel>
                            </Tag>
                          ))}
                        </Flex>

                        <Text fontSize="sm" color={textColor} mb={2}>
                          {alert.date} • {alert.time}
                        </Text>

                        <Text fontSize="sm" fontWeight="600" mb={1}>
                          Between:
                        </Text>
                        <Box as="ul" pl={6} mb={2}>
                          {alert.between.map((item, i) => (
                            <Text key={i} as="li" fontSize="sm">
                              {item}
                            </Text>
                          ))}
                        </Box>

                        {alert.suggestions && (
                          <Text fontSize="sm" mb={3}>
                            Suggestions ready ({alert.suggestions})
                          </Text>
                        )}
                        {alert.recommendations && (
                          <Text fontSize="sm" mb={3}>
                            Recommendations: {alert.recommendations}
                          </Text>
                        )}

                        <Flex gap={2} flexWrap="wrap">
                          <Button size="sm" colorScheme="brand">
                            View Suggestions
                          </Button>
                          <Button size="sm" variant="outline">
                            Dismiss
                          </Button>
                          <Button size="sm" variant="ghost">
                            Snooze
                          </Button>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Box>

              {/* Upcoming Reminders Section */}
              <Box bg={cardBg} borderRadius="lg" overflow="hidden" boxShadow="md">
                <Box bg="blue.100" p={4}>
                  <Heading size="md" color="blue.800">📅 UPCOMING REMINDERS</Heading>
                </Box>
                <Box p={4}>
                  <VStack spacing={4} align="stretch">
                    {upcomingReminders.map((reminder, idx) => (
                      <Box key={idx} borderWidth="1px" borderRadius="md" p={4}>
                        <Text fontSize="sm" color={textColor} mb={1}>
                          📱 {reminder.timing}
                        </Text>
                        <Text fontWeight="600" mb={1}>
                          {reminder.title}
                        </Text>
                        <Text fontSize="sm" color={textColor} mb={3}>
                          {reminder.trip}
                        </Text>
                        <Flex gap={2}>
                          <Button size="sm" variant="outline">
                            ✓ Mark Complete
                          </Button>
                          <Button size="sm" variant="ghost">
                            Snooze
                          </Button>
                        </Flex>
                      </Box>
                    ))}
                    <Button variant="link" size="sm">
                      View All (3 more)
                    </Button>
                  </VStack>
                </Box>
              </Box>

              {/* Smart Insights */}
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box flex="1">
                  <Text fontWeight="600" mb={2}>
                    💡 SMART INSIGHTS
                  </Text>
                  <Box as="ul" pl={4}>
                    <Text as="li" fontSize="sm">
                      3 gaps could be filled with museum visits
                    </Text>
                    <Text as="li" fontSize="sm">
                      Consider Paris Museum Pass (saves €45)
                    </Text>
                    <Text as="li" fontSize="sm">
                      Weather forecast: Rain expected Jun 17-18
                    </Text>
                  </Box>
                </Box>
              </Alert>

              <Flex gap={2}>
                <Button variant="outline">Mark All as Read</Button>
                <Button variant="outline">Settings</Button>
              </Flex>
            </VStack>
        )}

        {activeView === 'upcoming' && (
          <Box textAlign="center" py={8}>
            <Text color={textColor}>Upcoming reminders view</Text>
          </Box>
        )}

        {activeView === 'resolved' && (
          <Box textAlign="center" py={8}>
            <Text color={textColor}>Resolved alerts view</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AlertsView;
