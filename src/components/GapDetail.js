import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const GapDetail = () => {
  const navigate = useNavigate();
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  
  const bgColor = useColorModeValue('ios.secondaryBackground', 'gray.900');
  const navBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const gapInfo = {
    date: 'Thursday, June 17, 2025',
    location: 'Paris',
    startEvent: {
      time: '12:00 PM',
      icon: '🏨',
      title: 'Hotel Le Marais Check-out',
      address: '123 Rue Saint-Antoine'
    },
    endEvent: {
      time: '8:00 PM',
      icon: '🍽️',
      title: 'Dinner at Le Comptoir',
      address: '15 Carrefour de l\'Odéon'
    },
    duration: '6 HOURS GAP'
  };

  const suggestions = [
    {
      id: 1,
      title: 'Store Luggage & Explore',
      items: [
        {
          icon: '🧳',
          name: 'Bounce Luggage Storage',
          details: '0.5 km from hotel • €8/day',
          activities: [
            'Musée d\'Orsay (2-3 hrs)',
            'Seine River walk to restaurant (1 hr)'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Extended Lunch Experience',
      items: [
        {
          icon: '🍷',
          name: '3-hour Lunch + Wine Tasting',
          details: 'Le Fumoir near Louvre • ★ 4.6',
          time: '1:00 PM - 4:00 PM'
        }
      ]
    },
    {
      id: 3,
      title: 'Early Check-in Next Hotel',
      items: [
        {
          icon: '🏨',
          name: 'Contact Hotel Lutetia',
          details: 'Request early check-in (scheduled Jun 18)'
        }
      ]
    }
  ];

  const otherGaps = [
    { date: 'Jun 20', description: '4 hours in Rome' },
    { date: 'Jun 25', description: 'Morning before flight' }
  ];

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
          <IconButton
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate('/')}
            aria-label="Back"
          />
          <Heading size="md" fontWeight="600">Gap Details</Heading>
          <Box w="40px" /> {/* Spacer for alignment */}
        </Flex>
      </Box>

      <Container maxW="container.md" py={6} flex="1">
        <Heading size="lg" mb={2}>
          {gapInfo.date} • {gapInfo.location}
        </Heading>

        <Box bg={cardBg} borderRadius="lg" p={6} mb={6} boxShadow="md">
          <Heading size="md" mb={4}>
            TIMELINE
          </Heading>
          <Divider mb={6} />

          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="600" mb={1}>
                {gapInfo.startEvent.time} {gapInfo.startEvent.icon} {gapInfo.startEvent.title}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {gapInfo.startEvent.address}
              </Text>
            </Box>

            <Flex direction="column" align="center" py={2}>
              <Box h="30px" w="2px" bgGradient="linear(to-b, orange.400, transparent)" />
              <Alert status="warning" borderRadius="md" my={2}>
                <AlertIcon />
                <Text fontWeight="600">
                  ⚠️ {gapInfo.duration}
                </Text>
              </Alert>
              <Box h="30px" w="2px" bgGradient="linear(to-b, transparent, orange.400)" />
            </Flex>

            <Box>
              <Text fontWeight="600" mb={1}>
                {gapInfo.endEvent.time} {gapInfo.endEvent.icon} {gapInfo.endEvent.title}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {gapInfo.endEvent.address}
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box bg={cardBg} borderRadius="lg" p={6} mb={6} boxShadow="md">
          <Heading size="md" mb={4}>
            💡 SMART SUGGESTIONS
          </Heading>
          <Divider mb={6} />

          <VStack spacing={6} align="stretch">
            {suggestions.map((suggestion, idx) => (
              <Box key={suggestion.id}>
                <Text fontWeight="600" mb={3}>
                  Option {idx + 1}: {suggestion.title}
                </Text>
                {suggestion.items.map((item, itemIdx) => (
                  <Box key={itemIdx} borderWidth="1px" borderRadius="md" p={4} mb={3}>
                    <Flex align="flex-start" gap={4}>
                      <Text fontSize="2xl">{item.icon}</Text>
                      <Box flex="1">
                        <Text fontWeight="600" mb={1}>
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color={textColor} mb={2}>
                          {item.details}
                        </Text>
                        {item.time && (
                          <Text fontSize="sm" color={textColor} mb={2}>
                            {item.time}
                          </Text>
                        )}
                        {item.activities && (
                          <Box mb={3}>
                            <Text fontSize="sm" mb={1}>
                              Then explore:
                            </Text>
                            <Box as="ul" pl={6}>
                              {item.activities.map((activity, actIdx) => (
                                <Text key={actIdx} as="li" fontSize="sm">
                                  {activity}
                                </Text>
                              ))}
                            </Box>
                          </Box>
                        )}
                        <Flex gap={2} flexWrap="wrap">
                          {suggestion.id === 1 && (
                            <Button size="sm" variant="outline" leftIcon={<AddIcon />}>
                              Add Activities
                            </Button>
                          )}
                          {suggestion.id === 2 && (
                            <>
                              <Button size="sm" variant="outline">
                                Book Now
                              </Button>
                              <Button size="sm" variant="ghost">
                                Learn More
                              </Button>
                            </>
                          )}
                          {suggestion.id === 3 && (
                            <Button size="sm" variant="outline">
                              Send Request
                            </Button>
                          )}
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </Box>
            ))}
          </VStack>

          <Flex gap={2} mt={6}>
            <Button variant="outline">Dismiss This Gap</Button>
            <Button variant="link">View More Ideas</Button>
          </Flex>
        </Box>

        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <Text fontWeight="600" mb={2}>
              ⚠️ Other Gaps in Your Trip ({otherGaps.length})
            </Text>
            <Box as="ul" pl={4}>
              {otherGaps.map((gap, idx) => (
                <Text key={idx} as="li" fontSize="sm">
                  {gap.date}: {gap.description}
                </Text>
              ))}
            </Box>
            <Button variant="link" size="sm" mt={2}>
              Review All Gaps
            </Button>
          </Box>
        </Alert>
      </Container>

      <Footer />
    </Flex>
  );
};

export default GapDetail;
