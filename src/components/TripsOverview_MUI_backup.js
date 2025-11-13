import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  AccountCircle,
  Add as AddIcon,
  Edit as EditIcon,
  MoreVert as MoreIcon,
  PushPin as PinIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Home as HomeIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/TripsOverview.css';

const TripsOverview = () => {
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  const activeTrips = [
    {
      id: 1,
      flag: '🇫🇷',
      name: 'Europe Summer 2025',
      status: 'active',
      dates: 'June 15 - July 20, 2025',
      duration: '35 days',
      route: 'Paris → Rome → Barcelona → Amsterdam',
      stats: {
        gaps: 3,
        flights: 6,
        hotels: 8
      },
      next: 'Flight to Paris in 2 days'
    },
    {
      id: 2,
      flag: '🇹🇭',
      name: 'Southeast Asia Adventure',
      status: 'planned',
      dates: 'Sep 10 - Oct 15, 2025',
      duration: '35 days',
      route: 'Bangkok → Chiang Mai → Vietnam → Cambodia',
      stats: {
        complete: true,
        flights: 5,
        hotels: 12
      },
      next: 'Starts in 120 days'
    },
    {
      id: 3,
      flag: '🇯🇵',
      name: 'Japan Cherry Blossoms 2026',
      status: 'draft',
      dates: 'March 20 - April 10, 2026',
      duration: '21 days',
      route: 'Tokyo → Kyoto → Osaka → Hiroshima',
      stats: {
        flightsBooked: 0,
        flightsTotal: 8
      },
      next: 'Starts in 280 days'
    }
  ];

  const pastTrips = [
    { flag: '🇮🇹', name: 'Italy 2024' },
    { flag: '🇬🇷', name: 'Greece 2023' },
    { flag: '🇪🇸', name: 'Spain 2023' }
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case 'active':
        return <Chip icon={<PinIcon />} label="Active" color="primary" size="small" />;
      case 'draft':
        return <Chip label="Draft" variant="outlined" size="small" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={() => setMenuAnchorEl(null)}
          >
            <MenuItem onClick={() => { setMenuAnchorEl(null); navigate('/'); }}>
              <HomeIcon sx={{ mr: 1 }} /> Home
            </MenuItem>
            <MenuItem onClick={() => { setMenuAnchorEl(null); navigate('/trips'); }}>
              <FlightIcon sx={{ mr: 1 }} /> My Trips
            </MenuItem>
            <MenuItem onClick={() => { setMenuAnchorEl(null); navigate('/recommendations'); }}>
              <LightbulbIcon sx={{ mr: 1 }} /> Recommendations
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TravelPro
          </Typography>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
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

      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">My Trips</Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            New Trip
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          {activeTrips.map((trip) => (
            <Card key={trip.id} elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5">{trip.flag}</Typography>
                    <Typography variant="h6">{trip.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusChip(trip.status)}
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {trip.dates} • {trip.duration}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {trip.route}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                  {trip.stats.gaps !== undefined && (
                    <Chip
                      icon={<WarningIcon />}
                      label={`${trip.stats.gaps} gaps detected`}
                      color="warning"
                      size="small"
                    />
                  )}
                  {trip.stats.complete && (
                    <Chip
                      icon={<CheckIcon />}
                      label="Planning complete"
                      color="success"
                      size="small"
                    />
                  )}
                  {trip.stats.flights !== undefined && (
                    <Chip
                      icon={<FlightIcon />}
                      label={`${trip.stats.flights} flights`}
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {trip.stats.hotels !== undefined && (
                    <Chip
                      icon={<HotelIcon />}
                      label={`${trip.stats.hotels} hotels`}
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {trip.stats.flightsBooked !== undefined && (
                    <Chip
                      icon={<WarningIcon />}
                      label={`${trip.stats.flightsBooked} of ${trip.stats.flightsTotal} flights booked`}
                      color="warning"
                      size="small"
                    />
                  )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {trip.next}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="contained" onClick={() => navigate('/')}>
                    View Trip
                  </Button>
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                  <IconButton size="small">
                    <MoreIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Past Trips ({pastTrips.length})</Typography>
          <Button variant="text">View All</Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {pastTrips.map((trip, idx) => (
            <Chip
              key={idx}
              label={`${trip.flag} ${trip.name}`}
              onClick={() => {}}
              sx={{ fontSize: '1rem', py: 2 }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TripsOverview;
