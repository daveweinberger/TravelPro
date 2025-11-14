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
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  useToast,
  useColorModeValue,
  Divider,
  IconButton,
  Select,
  FormControl,
  FormLabel,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useTripContext } from '../context/TripContext';

const TagManagementModal = ({ isOpen, onClose }) => {
  const { trips, availableTags, addNewTag, updateTag, deleteTag, addTagToTrip, removeTagFromTrip, getTagById } = useTripContext();
  const [newTagName, setNewTagName] = useState('');
  const [newTagEmoji, setNewTagEmoji] = useState('🏷️');
  const [newTagColor, setNewTagColor] = useState('blue');
  const [editingTag, setEditingTag] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('');
  const [editColor, setEditColor] = useState('');
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedText = useColorModeValue('gray.600', 'gray.400');

  const colorOptions = [
    'gray', 'red', 'orange', 'yellow', 'green', 'teal', 
    'blue', 'cyan', 'purple', 'pink'
  ];

  const emojiOptions = [
    '🏷️', '🏖️', '💼', '🌍', '🌏', '🌎', '✈️', '🏨', 
    '🎭', '🍽️', '🎨', '🏔️', '🏖️', '🌴', '🗼', '🏛️',
    '🎪', '🎢', '🎡', '🎠', '🎯', '🎲', '🎰', '🎳',
    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱',
    '🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸', '🇯🇵', '🇨🇳',
    '🇰🇷', '🇮🇳', '🇧🇷', '🇲🇽', '🇨🇦', '🇦🇺', '🇷🇺', '🇿🇦'
  ];

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addNewTag({
        name: newTagName.trim(),
        emoji: newTagEmoji,
        color: newTagColor
      });
      setNewTagName('');
      setNewTagEmoji('🏷️');
      setNewTagColor('blue');
      toast({
        title: 'Tag created',
        description: `"${newTagName}" is now available`,
        status: 'success',
        duration: 2000,
      });
    }
  };

  const handleStartEdit = (tag) => {
    setEditingTag(tag.id);
    setEditName(tag.name);
    setEditEmoji(tag.emoji);
    setEditColor(tag.color);
  };

  const handleSaveEdit = () => {
    if (editName.trim()) {
      updateTag(editingTag, {
        name: editName.trim(),
        emoji: editEmoji,
        color: editColor
      });
      setEditingTag(null);
      toast({
        title: 'Tag updated',
        status: 'success',
        duration: 2000,
      });
    }
  };

  const handleDeleteTag = (tagId) => {
    const tag = getTagById(tagId);
    if (window.confirm(`Delete "${tag.name}" tag? This will remove it from all trips.`)) {
      deleteTag(tagId);
      toast({
        title: 'Tag deleted',
        status: 'info',
        duration: 2000,
      });
    }
  };

  const handleAddTagToTrip = (tripId, tagId) => {
    addTagToTrip(tripId, tagId);
    toast({
      title: 'Tag added',
      status: 'success',
      duration: 1500,
    });
  };

  const handleRemoveTagFromTrip = (tripId, tagId) => {
    removeTagFromTrip(tripId, tagId);
    toast({
      title: 'Tag removed',
      status: 'info',
      duration: 1500,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={cardBg}>
        <ModalHeader>Manage Tags</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Create New Tag */}
            <Box>
              <Text fontWeight="600" mb={3}>Create New Tag</Text>
              <VStack spacing={3} align="stretch">
                <HStack>
                  <FormControl flex="1">
                    <FormLabel fontSize="sm">Name</FormLabel>
                    <Input
                      placeholder="Tag name..."
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                  </FormControl>
                  
                  <FormControl w="120px">
                    <FormLabel fontSize="sm">Emoji</FormLabel>
                    <Popover>
                      <PopoverTrigger>
                        <Button w="full" variant="outline">
                          {newTagEmoji}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                          <Grid templateColumns="repeat(8, 1fr)" gap={1}>
                            {emojiOptions.map(emoji => (
                              <Button
                                key={emoji}
                                size="sm"
                                onClick={() => setNewTagEmoji(emoji)}
                                variant={newTagEmoji === emoji ? 'solid' : 'ghost'}
                              >
                                {emoji}
                              </Button>
                            ))}
                          </Grid>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormControl w="120px">
                    <FormLabel fontSize="sm">Color</FormLabel>
                    <Select
                      value={newTagColor}
                      onChange={(e) => setNewTagColor(e.target.value)}
                      size="md"
                    >
                      {colorOptions.map(color => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </HStack>

                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="brand"
                  onClick={handleAddTag}
                  isDisabled={!newTagName.trim()}
                  w="full"
                >
                  Create Tag
                </Button>
              </VStack>
            </Box>

            <Divider />

            {/* Available Tags */}
            <Box>
              <Text fontWeight="600" mb={3}>All Tags ({availableTags.length})</Text>
              <VStack spacing={2} align="stretch">
                {availableTags.map(tag => (
                  <Box
                    key={tag.id}
                    p={3}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    {editingTag === tag.id ? (
                      <VStack spacing={2}>
                        <HStack w="full">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            size="sm"
                            flex="1"
                          />
                          <Popover>
                            <PopoverTrigger>
                              <Button size="sm" variant="outline">
                                {editEmoji}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverBody>
                                <Grid templateColumns="repeat(8, 1fr)" gap={1}>
                                  {emojiOptions.map(emoji => (
                                    <Button
                                      key={emoji}
                                      size="sm"
                                      onClick={() => setEditEmoji(emoji)}
                                      variant={editEmoji === emoji ? 'solid' : 'ghost'}
                                    >
                                      {emoji}
                                    </Button>
                                  ))}
                                </Grid>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                          <Select
                            value={editColor}
                            onChange={(e) => setEditColor(e.target.value)}
                            size="sm"
                            w="100px"
                          >
                            {colorOptions.map(color => (
                              <option key={color} value={color}>
                                {color}
                              </option>
                            ))}
                          </Select>
                        </HStack>
                        <HStack w="full">
                          <Button size="sm" onClick={() => setEditingTag(null)} flex="1">
                            Cancel
                          </Button>
                          <Button size="sm" colorScheme="brand" onClick={handleSaveEdit} flex="1">
                            Save
                          </Button>
                        </HStack>
                      </VStack>
                    ) : (
                      <Flex justify="space-between" align="center">
                        <Tag size="lg" colorScheme={tag.color} borderRadius="full">
                          <TagLabel>{tag.emoji} {tag.name}</TagLabel>
                        </Tag>
                        <HStack>
                          <IconButton
                            icon={<EditIcon />}
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartEdit(tag)}
                            aria-label="Edit tag"
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDeleteTag(tag.id)}
                            aria-label="Delete tag"
                          />
                        </HStack>
                      </Flex>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>

            <Divider />

            {/* Assign Tags to Trips */}
            <Box>
              <Text fontWeight="600" mb={3}>Assign Tags to Trips</Text>
              <VStack spacing={4} align="stretch">
                {trips.map(trip => (
                  <Box
                    key={trip.id}
                    p={4}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <Text fontWeight="600" mb={2}>
                      {trip.flag} {trip.name}
                    </Text>
                    
                    {/* Current Tags */}
                    <Flex gap={2} flexWrap="wrap" mb={3}>
                      {trip.tags.length > 0 ? (
                        trip.tags.map(tagId => {
                          const tag = getTagById(tagId);
                          return tag ? (
                            <Tag key={tagId} size="sm" colorScheme={tag.color} borderRadius="full">
                              <TagLabel>{tag.emoji} {tag.name}</TagLabel>
                              <TagCloseButton
                                onClick={() => handleRemoveTagFromTrip(trip.id, tagId)}
                              />
                            </Tag>
                          ) : null;
                        })
                      ) : (
                        <Text fontSize="sm" color={mutedText}>No tags assigned</Text>
                      )}
                    </Flex>

                    {/* Available Tags to Add */}
                    <Box>
                      <Text fontSize="sm" color={mutedText} mb={2}>Add tags:</Text>
                      <Flex gap={2} flexWrap="wrap">
                        {availableTags
                          .filter(tag => !trip.tags.includes(tag.id))
                          .map(tag => (
                            <Button
                              key={tag.id}
                              size="xs"
                              variant="outline"
                              colorScheme={tag.color}
                              onClick={() => handleAddTagToTrip(trip.id, tag.id)}
                            >
                              {tag.emoji} {tag.name}
                            </Button>
                          ))}
                      </Flex>
                    </Box>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Done</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TagManagementModal;
