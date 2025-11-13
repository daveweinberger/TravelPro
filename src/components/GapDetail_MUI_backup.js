import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  AccountCircle,
  Add as AddIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  Backpack as LuggageIcon,
  LocalBar as WineIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/GapDetail.css';

const GapDetail = () => {
  const navigate = useNavigate();
  const [userAnchorEl, setUserAnchorEl] = useState(null);

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
          icon: <LuggageIcon />,
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
          icon: <WineIcon />,
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
          icon: <HotelIcon />,
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gap Details
          </Typography>
          <IconButton
            color="inherit"
            onClick={(e) => setUserAnchorEl(e.currentTarget)}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={userAnchorEl}
            open={Boolean(userAnchorEl)}
            onClose={() => setUserAnchorEl(null)}
          >
            <MenuItem onClick={() => setUserAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setUserAnchorEl(null)}>Settings</MenuItem>
            <MenuItem onClick={() => setUserAnchorEl(null)}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {gapInfo.date} • {gapInfo.location}
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            TIMELINE
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box className="timeline">
            <Box className="timeline-event">
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {gapInfo.startEvent.time} {gapInfo.startEvent.icon} {gapInfo.startEvent.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {gapInfo.startEvent.address}
              </Typography>
            </Box>

            <Box className="timeline-gap">
              <Box className="gap-line" />
              <Alert severity="warning" sx={{ my: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ⚠️ {gapInfo.duration}
                </Typography>
              </Alert>
              <Box className="gap-line" />
            </Box>

            <Box className="timeline-event">
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {gapInfo.endEvent.time} {gapInfo.endEvent.icon} {gapInfo.endEvent.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {gapInfo.endEvent.address}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            💡 SMART SUGGESTIONS
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {suggestions.map((suggestion, idx) => (
              <Box key={suggestion.id}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Option {idx + 1}: {suggestion.title}
                </Typography>
                {suggestion.items.map((item, itemIdx) => (
                  <Card key={itemIdx} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{ fontSize: '2rem' }}>{item.icon}</Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {item.details}
                          </Typography>
                          {item.time && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {item.time}
                            </Typography>
                          )}
                          {item.activities && (
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                Then explore:
                              </Typography>
                              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                                {item.activities.map((activity, actIdx) => (
                                  <Typography key={actIdx} component="li" variant="body2">
                                    {activity}
                                  </Typography>
                                ))}
                              </Box>
                            </Box>
                          )}
                          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            {suggestion.id === 1 && (
                              <Button variant="outlined" size="small" startIcon={<AddIcon />}>
                                Add Activities
                              </Button>
                            )}
                            {suggestion.id === 2 && (
                              <>
                                <Button variant="outlined" size="small">
                                  Book Now
                                </Button>
                                <Button variant="text" size="small">
                                  Learn More
                                </Button>
                              </>
                            )}
                            {suggestion.id === 3 && (
                              <Button variant="outlined" size="small">
                                Send Request
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="outlined">Dismiss This Gap</Button>
            <Button variant="text">View More Ideas</Button>
          </Box>
        </Paper>

        <Alert severity="warning" icon={<WarningIcon />}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            ⚠️ Other Gaps in Your Trip ({otherGaps.length})
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {otherGaps.map((gap, idx) => (
              <Typography key={idx} component="li" variant="body2">
                {gap.date}: {gap.description}
              </Typography>
            ))}
          </Box>
          <Button variant="text" size="small" sx={{ mt: 1 }}>
            Review All Gaps
          </Button>
        </Alert>
      </Container>
    </Box>
  );
};

export default GapDetail;
