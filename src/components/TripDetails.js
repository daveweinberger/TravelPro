import React from 'react';
import { format, isSameDay } from 'date-fns';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Alert,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import '../styles/TripDetails.css';

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
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          No events scheduled for {format(selectedDate, 'MMMM d, yyyy')}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Event
        </Button>
      </Paper>
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.values(groupedEvents).map(({ trip, events }) => (
        <Card key={trip.id} elevation={2}>
          <CardHeader
            title={
              <Typography variant="h6">
                {trip.flag} {trip.name}
              </Typography>
            }
            action={
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {trip.tags.map(tag => (
                  <Chip key={tag} label={`🏷️ ${tag}`} size="small" color="primary" />
                ))}
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {events.map((event, idx) => (
                <Box key={idx}>
                  {idx > 0 && <Divider sx={{ mb: 2 }} />}
                  {event.type === 'gap' ? (
                    <Alert severity="warning">
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        {event.time} ({event.title})
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button size="small" variant="outlined">
                          View Suggestions
                        </Button>
                        <Button size="small" variant="text">
                          Dismiss
                        </Button>
                      </Box>
                    </Alert>
                  ) : (
                    <Box className="event-content">
                      <Box className="event-icon-large">{getIconForType(event.type)}</Box>
                      <Box className="event-details">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {event.time}
                        </Typography>
                        <Typography variant="body1">
                          {event.title}
                        </Typography>
                        {event.location && (
                          <Typography variant="body2" color="text.secondary">
                            📍 {event.location}
                          </Typography>
                        )}
                        {event.confirmation && (
                          <Typography variant="body2" color="text.secondary">
                            Conf: {event.confirmation}
                          </Typography>
                        )}
                      </Box>
                      <Box className="event-actions">
                        <Button size="small" variant="text">
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TripDetails;
