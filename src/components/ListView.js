import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@mui/material';
import {
  Add as AddIcon,
  AttachFile as AttachFileIcon
} from '@mui/icons-material';
import '../styles/ListView.css';

const ListView = ({ trips }) => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('this-week');

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

  // Flatten all events with their trip info
  const allEvents = trips.flatMap(trip =>
    trip.events.map(event => ({ ...event, trip }))
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
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            label="Type"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="flight">✈️ Flights</MenuItem>
            <MenuItem value="hotel">🏨 Hotels</MenuItem>
            <MenuItem value="activity">🎭 Activities</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Date</InputLabel>
          <Select
            value={dateFilter}
            label="Date"
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <MenuItem value="this-week">This Week</MenuItem>
            <MenuItem value="this-month">This Month</MenuItem>
            <MenuItem value="all-upcoming">All Upcoming</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            <Paper key={dateKey} elevation={2} sx={{ overflow: 'hidden' }}>
              <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
                <Typography variant="h6">
                  📅 {format(date, 'EEEE, MMMM d, yyyy').toUpperCase()}
                </Typography>
              </Box>

              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {Object.values(eventsByTrip).map(({ trip, events }) => (
                    <Box key={trip.id}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {trip.flag} {trip.name}
                          </Typography>
                          {trip.tags.map(tag => (
                            <Chip key={tag} label={`🏷️ ${tag}`} size="small" color="primary" />
                          ))}
                        </Box>
                        <Divider />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
                        {events.map((event, idx) => (
                          <Box key={idx}>
                            {event.type === 'gap' ? (
                              <Alert severity="warning" sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                  {getIconForType(event.type)} {event.time}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  6 hours unplanned
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Button size="small" variant="outlined">
                                    View Suggestions
                                  </Button>
                                  <Button size="small" variant="text">
                                    Dismiss
                                  </Button>
                                </Box>
                              </Alert>
                            ) : (
                              <Box className="list-event-item">
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                  <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
                                    {getIconForType(event.type)}
                                  </Typography>
                                  <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {event.time} • {event.title}
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
                                    {event.details && (
                                      <Typography variant="body2" color="text.secondary">
                                        {event.details}
                                      </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                      <Button size="small" variant="text">
                                        View Details
                                      </Button>
                                      {(event.type === 'flight' || event.type === 'hotel') && (
                                        <Button size="small" variant="text" startIcon={<AttachFileIcon />}>
                                          {event.type === 'flight' ? 'Attachment' : 'Confirmation'}
                                        </Button>
                                      )}
                                      {event.type === 'planning' && (
                                        <Button size="small" variant="text" startIcon={<AddIcon />}>
                                          Add Event
                                        </Button>
                                      )}
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Paper>
          );
        })}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="outlined">Load More Days...</Button>
      </Box>
    </Box>
  );
};

export default ListView;
