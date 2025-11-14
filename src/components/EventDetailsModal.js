import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  IconButton,
  useToast,
  useColorModeValue,
  Flex,
  Tag,
} from '@chakra-ui/react';
import { AttachmentIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { useTripContext } from '../context/TripContext';

const EventDetailsModal = ({ isOpen, onClose, event, trip }) => {
  const { updateEvent, deleteEvent, addAttachment, removeAttachment } = useTripContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event || {});
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedText = useColorModeValue('gray.600', 'gray.400');

  if (!event || !trip) return null;

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

  const handleSave = () => {
    updateEvent(trip.id, event.id, editedEvent);
    setIsEditing(false);
    toast({
      title: 'Event updated',
      status: 'success',
      duration: 2000,
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(trip.id, event.id);
      onClose();
      toast({
        title: 'Event deleted',
        status: 'info',
        duration: 2000,
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const attachment = {
        id: `att-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date()
      };
      addAttachment(trip.id, event.id, attachment);
      toast({
        title: 'Attachment added',
        description: file.name,
        status: 'success',
        duration: 2000,
      });
    }
  };

  const handleRemoveAttachment = (attachmentId) => {
    removeAttachment(trip.id, event.id, attachmentId);
    toast({
      title: 'Attachment removed',
      status: 'info',
      duration: 2000,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={cardBg}>
        <ModalHeader>
          <Flex align="center" gap={3}>
            <Text fontSize="2xl">{getIconForType(event.type)}</Text>
            <Box>
              <Text fontSize="lg" fontWeight="600">
                {event.title}
              </Text>
              <Text fontSize="sm" color={mutedText} fontWeight="normal">
                {trip.flag} {trip.name}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {isEditing ? (
              <>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={editedEvent.title}
                    onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Time</FormLabel>
                  <Input
                    value={editedEvent.time}
                    onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    value={editedEvent.location || ''}
                    onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Confirmation</FormLabel>
                  <Input
                    value={editedEvent.confirmation || ''}
                    onChange={(e) => setEditedEvent({ ...editedEvent, confirmation: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Details</FormLabel>
                  <Textarea
                    value={editedEvent.details || ''}
                    onChange={(e) => setEditedEvent({ ...editedEvent, details: e.target.value })}
                    rows={3}
                  />
                </FormControl>
              </>
            ) : (
              <>
                <Box>
                  <Text fontSize="sm" color={mutedText} mb={1}>Date & Time</Text>
                  <Text fontWeight="500">
                    {format(event.date, 'EEEE, MMMM d, yyyy')} • {event.time}
                  </Text>
                </Box>

                {event.location && (
                  <Box>
                    <Text fontSize="sm" color={mutedText} mb={1}>Location</Text>
                    <Text fontWeight="500">📍 {event.location}</Text>
                  </Box>
                )}

                {event.confirmation && (
                  <Box>
                    <Text fontSize="sm" color={mutedText} mb={1}>Confirmation</Text>
                    <Text fontWeight="500">{event.confirmation}</Text>
                  </Box>
                )}

                {event.details && (
                  <Box>
                    <Text fontSize="sm" color={mutedText} mb={1}>Details</Text>
                    <Text>{event.details}</Text>
                  </Box>
                )}

                <Divider />

                <Box>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontSize="sm" color={mutedText}>Attachments</Text>
                    <Button
                      as="label"
                      size="sm"
                      leftIcon={<AttachmentIcon />}
                      variant="outline"
                      cursor="pointer"
                    >
                      Add File
                      <Input
                        type="file"
                        display="none"
                        onChange={handleFileUpload}
                      />
                    </Button>
                  </Flex>

                  {event.attachments && event.attachments.length > 0 ? (
                    <VStack spacing={2} align="stretch">
                      {event.attachments.map((attachment) => (
                        <Flex
                          key={attachment.id}
                          justify="space-between"
                          align="center"
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          borderRadius="md"
                        >
                          <HStack>
                            <AttachmentIcon />
                            <Box>
                              <Text fontSize="sm" fontWeight="500">{attachment.name}</Text>
                              <Text fontSize="xs" color={mutedText}>
                                {(attachment.size / 1024).toFixed(1)} KB
                              </Text>
                            </Box>
                          </HStack>
                          <IconButton
                            icon={<DeleteIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleRemoveAttachment(attachment.id)}
                            aria-label="Remove attachment"
                          />
                        </Flex>
                      ))}
                    </VStack>
                  ) : (
                    <Text fontSize="sm" color={mutedText}>No attachments</Text>
                  )}
                </Box>
              </>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          {isEditing ? (
            <HStack>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button colorScheme="brand" onClick={handleSave}>
                Save Changes
              </Button>
            </HStack>
          ) : (
            <HStack>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                leftIcon={<EditIcon />}
                colorScheme="brand"
                onClick={() => {
                  setEditedEvent(event);
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            </HStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailsModal;
