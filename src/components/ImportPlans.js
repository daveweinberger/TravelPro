import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Select,
  Divider,
  Input,
  IconButton,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import {
  AddIcon,
  CopyIcon,
  InfoIcon,
  AttachmentIcon,
} from '@chakra-ui/icons';

const ImportPlans = ({ trips, onClose }) => {
  const [selectedTrip, setSelectedTrip] = useState('europe-2025');
  const [dragActive, setDragActive] = useState(false);
  const toast = useToast();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      toast({
        title: 'Files uploaded',
        description: `${e.dataTransfer.files.length} file(s) ready for processing`,
        status: 'success',
        duration: 3000,
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('import@travelpro.app');
    toast({
      title: 'Email copied',
      description: 'import@travelpro.app copied to clipboard',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Box>
      <Flex align="center" gap={4} mb={6} flexWrap="wrap">
        <Text>Add plans to:</Text>
        <Select
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
          maxW="250px"
          size="sm"
        >
          {trips.map(trip => (
            <option key={trip.id} value={trip.id}>
              {trip.flag} {trip.name}
            </option>
          ))}
        </Select>
        <Text>or</Text>
        <Button leftIcon={<AddIcon />} variant="outline" size="sm">
          New Trip
        </Button>
      </Flex>

      {/* Upload Documents Section */}
      <Box bg="white" borderRadius="lg" p={6} mb={6} boxShadow="base">
        <Heading size="md" textAlign="center" mb={4}>
          📄 Upload Documents
        </Heading>
        
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor={dragActive ? 'brand.500' : 'gray.300'}
          borderRadius="lg"
          p={8}
          textAlign="center"
          bg={dragActive ? 'brand.50' : 'gray.50'}
          cursor="pointer"
          transition="all 0.2s"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          _hover={{ borderColor: 'brand.500', bg: 'brand.50' }}
          mb={4}
        >
          <AttachmentIcon boxSize={12} color="gray.400" mb={2} />
          <Text fontSize="lg" mb={2}>
            Drop files here or click
          </Text>
        </Box>

        <Text fontSize="sm" color="gray.600" textAlign="center" mb={1}>
          Supported: PDF, PNG, JPG, HEIC
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb={4}>
          Max size: 10 MB per file
        </Text>

        <Flex justify="center">
          <Button leftIcon={<AttachmentIcon />} colorScheme="brand">
            Choose Files
          </Button>
        </Flex>
      </Box>

      <Divider my={6}>
        <Text fontSize="sm" color="gray.500">OR</Text>
      </Divider>

      {/* Forward Email Section */}
      <Box bg="white" borderRadius="lg" p={6} mb={6} boxShadow="base">
        <Heading size="md" textAlign="center" mb={4}>
          📧 Forward Email
        </Heading>

        <Text mb={3}>Forward confirmation emails to:</Text>

        <Flex gap={2} mb={4}>
          <Input
            value="import@travelpro.app"
            isReadOnly
            size="sm"
          />
          <IconButton
            icon={<CopyIcon />}
            onClick={handleCopyEmail}
            colorScheme="brand"
            aria-label="Copy email"
          />
        </Flex>

        <Text fontSize="sm" mb={2}>
          We'll automatically extract:
        </Text>
        <Box as="ul" pl={6} mb={3}>
          <Text as="li" fontSize="sm">Flight confirmations</Text>
          <Text as="li" fontSize="sm">Hotel reservations</Text>
          <Text as="li" fontSize="sm">Car rentals</Text>
          <Text as="li" fontSize="sm">Activity bookings</Text>
          <Text as="li" fontSize="sm">Restaurant reservations</Text>
        </Box>

        <Button leftIcon={<InfoIcon />} variant="link" size="sm">
          How it works
        </Button>
      </Box>

      <Divider my={6}>
        <Text fontSize="sm" color="gray.500">OR</Text>
      </Divider>

      {/* Manual Entry Section */}
      <Box bg="white" borderRadius="lg" p={6} mb={6} boxShadow="base">
        <Heading size="md" textAlign="center" mb={4}>
          ✍️ Manual Entry
        </Heading>

        <Flex gap={2} flexWrap="wrap" justify="center">
          <Button leftIcon={<span>✈️</span>} variant="outline">
            Add Flight
          </Button>
          <Button leftIcon={<span>🏨</span>} variant="outline">
            Add Hotel
          </Button>
          <Button leftIcon={<span>🚗</span>} variant="outline">
            Add Car
          </Button>
          <Button leftIcon={<span>🎭</span>} variant="outline">
            Add Activity
          </Button>
        </Flex>
      </Box>

      {/* Pro Tip */}
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <Box>
          <Text fontWeight="600" fontSize="sm">Pro Tip:</Text>
          <Text fontSize="sm">
            You can also screenshot your confirmations and upload them directly!
          </Text>
        </Box>
      </Alert>
    </Box>
  );
};

export default ImportPlans;
