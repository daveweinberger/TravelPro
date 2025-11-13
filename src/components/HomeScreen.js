import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Chip,
  Container,
  Box,
  Paper,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  AccountCircle,
  Add as AddIcon,
  LocalOffer as TagIcon,
  FileUpload as UploadIcon,
  Lightbulb as LightbulbIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import TripDetails from './TripDetails';
import ListView from './ListView';
import ImportPlans from './ImportPlans';
import AlertsView from './AlertsView';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 15));
  const [selectedTrip, setSelectedTrip] = useState('all');
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const trips = [
    {
      id: 'europe-2025',
      name: 'EUROPE SUMMER 2025',
      tags: ['Vacation', 'Europe'],
      flag: '🇫🇷',
      events: [
        {
          date: new Date(2025, 5, 15),
          type: 'flight',
          time: '10:30 AM',
          title: 'Flight BA 2341: JFK → CDG',
          confirmation: 'ABC123',
          location: 'Paris',
          details: 'Terminal 7, Gate B22'
        },
        {
          date: new Date(2025, 5, 15),
          type: 'hotel',
          time: '3:00 PM',
          title: 'Hotel Le Marais Check-in',
          confirmation: 'HTL789',
          location: 'Paris',
          details: '123 Rue Saint-Antoine'
        },
        {
          date: new Date(2025, 5, 17),
          type: 'hotel',
          time: '12:00 PM',
          title: 'Hotel Le Marais Checkout',
          location: 'Paris'
        },
        {
          date: new Date(2025, 5, 17),
          type: 'gap',
          time: '2:00 PM - 8:00 PM',
          title: 'GAP: 6 hours',
          alert: true,
          location: 'Paris'
        },
        {
          date: new Date(2025, 5, 17),
          type: 'dining',
          time: '8:00 PM',
          title: 'Dinner: Le Comptoir',
          confirmation: 'RES456',
          location: 'Paris',
          details: 'Reservation for 2'
        },
        {
          date: new Date(2025, 5, 18),
          type: 'flight',
          time: '2:15 PM',
          title: 'Flight AF 5678: CDG → FCO',
          location: 'Paris → Rome',
          confirmation: 'XYZ456',
          details: 'Terminal 2E, Gate K41'
        },
        {
          date: new Date(2025, 5, 19),
          type: 'activity',
          time: '10:00 AM',
          title: 'Colosseum Tour',
          location: 'Rome'
        }
      ]
    },
    {
      id: 'asia-2025',
      name: 'SOUTHEAST ASIA',
      tags: ['Vacation', 'Asia'],
      flag: '🇹🇭',
      events: [
        {
          date: new Date(2025, 5, 18),
          type: 'planning',
          time: 'All day',
          title: 'Planning: Review hotel options in Bangkok',
          location: 'Bangkok'
        },
        {
          date: new Date(2025, 5, 19),
          type: 'planning',
          time: 'All day',
          title: 'Planning: Book flights to Chiang Mai',
          location: 'Bangkok'
        }
      ]
    }
  ];

  const tags = ['Europe', 'Asia', 'Work'];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <MenuItem onClick={() => { setMenuAnchorEl(null); navigate('/recommendations'); }}>
              <LightbulbIcon sx={{ mr: 1 }} /> Recommendations
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TravelPro
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Paper elevation={1} sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Typography variant="h4" component="h1">
                All Trips
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button variant="outlined" startIcon={<TagIcon />}>
                  Manage Tags
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => setShowImportDialog(!showImportDialog)}
                >
                  Add Plans
                </Button>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 200, mb: 1 }}>
                <InputLabel>Trip</InputLabel>
                <Select
                  value={selectedTrip}
                  label="Trip"
                  onChange={(e) => setSelectedTrip(e.target.value)}
                >
                  <MenuItem value="all">All Trips</MenuItem>
                  <MenuItem value="europe-2025">Europe Summer 2025</MenuItem>
                  <MenuItem value="asia-2025">Southeast Asia</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {tags.map(tag => (
                  <Chip key={tag} label={`🏷️ ${tag}`} color="primary" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="📅 Calendar" />
              <Tab label="📋 List View" />
              <Tab label={<Badge badgeContent={3} color="error">🔔 Alerts</Badge>} />
            </Tabs>
          </Box>

          <Box role="tabpanel" hidden={activeTab !== 0}>
            {activeTab === 0 && (
              <Box sx={{ mt: 2 }}>
                <Calendar 
                  trips={trips}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
                <Box sx={{ mt: 3 }}>
                  <TripDetails 
                    trips={trips}
                    selectedDate={selectedDate}
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Box role="tabpanel" hidden={activeTab !== 1}>
            {activeTab === 1 && (
              <Box sx={{ mt: 2 }}>
                <ListView trips={trips} />
              </Box>
            )}
          </Box>

          <Box role="tabpanel" hidden={activeTab !== 2}>
            {activeTab === 2 && (
              <Box sx={{ mt: 2 }}>
                <AlertsView />
              </Box>
            )}
          </Box>

          <Dialog 
            open={showImportDialog} 
            onClose={() => setShowImportDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Import Travel Plans</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 1 }}>
                <ImportPlans trips={trips} onClose={() => setShowImportDialog(false)} />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowImportDialog(false)}>Close</Button>
            </DialogActions>
          </Dialog>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Button variant="outlined" startIcon={<AddIcon />}>
              Add Event
            </Button>
            <Button variant="outlined" startIcon={<UploadIcon />}>
              Export
            </Button>
            <Button variant="outlined" startIcon={<LightbulbIcon />}>
              Suggestions
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomeScreen;
