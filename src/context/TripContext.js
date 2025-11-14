import React, { createContext, useContext, useState } from 'react';

const TripContext = createContext();

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within TripProvider');
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([
    {
      id: 'europe-2025',
      name: 'EUROPE SUMMER 2025',
      tags: ['tag-1', 'tag-2'], // Vacation, Europe
      flag: '🇫🇷',
      events: [
        {
          id: 'evt-1',
          date: new Date(2025, 5, 15),
          type: 'flight',
          time: '10:30 AM',
          title: 'Flight BA 2341: JFK → CDG',
          confirmation: 'ABC123',
          location: 'Paris',
          details: 'Terminal 7, Gate B22',
          attachments: []
        },
        {
          id: 'evt-2',
          date: new Date(2025, 5, 15),
          type: 'hotel',
          time: '3:00 PM',
          title: 'Hotel Le Marais Check-in',
          confirmation: 'HTL789',
          location: 'Paris',
          details: '123 Rue Saint-Antoine',
          attachments: []
        },
        {
          id: 'evt-3',
          date: new Date(2025, 5, 17),
          type: 'hotel',
          time: '12:00 PM',
          title: 'Hotel Le Marais Checkout',
          location: 'Paris',
          attachments: []
        },
        {
          id: 'evt-4',
          date: new Date(2025, 5, 17),
          type: 'gap',
          time: '2:00 PM - 8:00 PM',
          title: 'GAP: 6 hours',
          alert: true,
          location: 'Paris',
          dismissed: false
        },
        {
          id: 'evt-5',
          date: new Date(2025, 5, 17),
          type: 'dining',
          time: '8:00 PM',
          title: 'Dinner: Le Comptoir',
          confirmation: 'RES456',
          location: 'Paris',
          details: 'Reservation for 2',
          attachments: []
        },
        {
          id: 'evt-6',
          date: new Date(2025, 5, 18),
          type: 'flight',
          time: '2:15 PM',
          title: 'Flight AF 5678: CDG → FCO',
          location: 'Paris → Rome',
          confirmation: 'XYZ456',
          details: 'Terminal 2E, Gate K41',
          attachments: []
        },
        {
          id: 'evt-7',
          date: new Date(2025, 5, 19),
          type: 'activity',
          time: '10:00 AM',
          title: 'Colosseum Tour',
          location: 'Rome',
          attachments: []
        }
      ]
    },
    {
      id: 'asia-2025',
      name: 'SOUTHEAST ASIA',
      tags: ['tag-1', 'tag-3'], // Vacation, Asia
      flag: '🇹🇭',
      events: [
        {
          id: 'evt-8',
          date: new Date(2025, 5, 18),
          type: 'planning',
          time: 'All day',
          title: 'Planning: Review hotel options in Bangkok',
          location: 'Bangkok',
          attachments: []
        },
        {
          id: 'evt-9',
          date: new Date(2025, 5, 19),
          type: 'planning',
          time: 'All day',
          title: 'Planning: Book flights to Chiang Mai',
          location: 'Bangkok',
          attachments: []
        }
      ]
    }
  ]);

  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [availableTags, setAvailableTags] = useState([
    { id: 'tag-1', name: 'Vacation', emoji: '🏖️', color: 'blue' },
    { id: 'tag-2', name: 'Europe', emoji: '🇪🇺', color: 'purple' },
    { id: 'tag-3', name: 'Asia', emoji: '🌏', color: 'green' },
    { id: 'tag-4', name: 'Work', emoji: '💼', color: 'gray' },
    { id: 'tag-5', name: 'Business', emoji: '🤝', color: 'orange' }
  ]);

  // Add tag to a trip
  const addTagToTrip = (tripId, tagId) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId && !trip.tags.includes(tagId)) {
        return { ...trip, tags: [...trip.tags, tagId] };
      }
      return trip;
    }));
  };

  // Remove tag from a trip
  const removeTagFromTrip = (tripId, tagId) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, tags: trip.tags.filter(t => t !== tagId) };
      }
      return trip;
    }));
  };

  // Add new tag to available tags
  const addNewTag = (tagData) => {
    const newTag = {
      id: `tag-${Date.now()}`,
      name: tagData.name,
      emoji: tagData.emoji || '🏷️',
      color: tagData.color || 'blue'
    };
    setAvailableTags([...availableTags, newTag]);
    return newTag;
  };

  // Update existing tag
  const updateTag = (tagId, updates) => {
    setAvailableTags(availableTags.map(tag =>
      tag.id === tagId ? { ...tag, ...updates } : tag
    ));
  };

  // Delete tag
  const deleteTag = (tagId) => {
    // Remove from available tags
    setAvailableTags(availableTags.filter(tag => tag.id !== tagId));
    // Remove from all trips
    setTrips(trips.map(trip => ({
      ...trip,
      tags: trip.tags.filter(t => t !== tagId)
    })));
  };

  // Get tag by ID
  const getTagById = (tagId) => {
    return availableTags.find(tag => tag.id === tagId);
  };

  // Dismiss gap alert
  const dismissGap = (tripId, eventId) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          events: trip.events.map(event => {
            if (event.id === eventId && event.type === 'gap') {
              return { ...event, dismissed: true };
            }
            return event;
          })
        };
      }
      return trip;
    }));
  };

  // Add attachment to event
  const addAttachment = (tripId, eventId, attachment) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          events: trip.events.map(event => {
            if (event.id === eventId) {
              return {
                ...event,
                attachments: [...(event.attachments || []), attachment]
              };
            }
            return event;
          })
        };
      }
      return trip;
    }));
  };

  // Remove attachment from event
  const removeAttachment = (tripId, eventId, attachmentId) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          events: trip.events.map(event => {
            if (event.id === eventId) {
              return {
                ...event,
                attachments: event.attachments.filter(a => a.id !== attachmentId)
              };
            }
            return event;
          })
        };
      }
      return trip;
    }));
  };

  // Update event
  const updateEvent = (tripId, eventId, updates) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          events: trip.events.map(event => {
            if (event.id === eventId) {
              return { ...event, ...updates };
            }
            return event;
          })
        };
      }
      return trip;
    }));
  };

  // Add new event
  const addEvent = (tripId, newEvent) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          events: [...trip.events, { ...newEvent, id: `evt-${Date.now()}` }]
        };
      }
      return trip;
    }));
  };

  // Delete event
  const deleteEvent = (tripId, eventId) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          events: trip.events.filter(event => event.id !== eventId)
        };
      }
      return trip;
    }));
  };

  const value = {
    trips,
    setTrips,
    selectedEventDetails,
    setSelectedEventDetails,
    availableTags,
    addTagToTrip,
    removeTagFromTrip,
    addNewTag,
    updateTag,
    deleteTag,
    getTagById,
    dismissGap,
    addAttachment,
    removeAttachment,
    updateEvent,
    addEvent,
    deleteEvent
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
