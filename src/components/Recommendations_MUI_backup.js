import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Divider,
  Alert,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu
} from '@mui/material';
import {
  Add as AddIcon,
  Info as InfoIcon,
  Map as MapIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Lightbulb as TipIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  AccountCircle,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/Recommendations.css';

const Recommendations = () => {
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState('europe-2025');
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  const gapRecommendations = [
    {
      id: 1,
      name: "Musée d'Orsay",
      icon: '🎨',
      rating: 4.8,
      price: 2,
      description: 'Impressionist masterpieces',
      duration: '2-3 hours',
      distance: '1.2 km from hotel'
    },
    {
      id: 2,
      name: 'Sainte-Chapelle',
      icon: '🏛️',
      rating: 4.7,
      price: 1,
      description: 'Stunning Gothic architecture',
      duration: '1-2 hours',
      distance: '0.8 km from hotel'
    },
    {
      id: 3,
      name: 'Seine River Walk & Café',
      icon: '☕',
      rating: 4.9,
      price: 1,
      description: 'Relaxing riverside stroll',
      duration: '2-3 hours',
      distance: 'Near hotel'
    }
  ];

  const preTripRecommendations = [
    {
      id: 1,
      icon: '💳',
      title: 'Notify your bank about travel',
      description: 'Jun 15 - Jul 20 in France, Italy',
      type: 'action'
    },
    {
      id: 2,
      icon: '📱',
      title: 'Download offline maps',
      description: 'Paris, Rome city maps',
      type: 'action'
    },
    {
      id: 3,
      icon: '🎫',
      title: 'Museum Pass',
      description: 'Paris Museum Pass saves €45 for your plans',
      type: 'info'
    }
  ];

  const locationRecommendations = [
    {
      id: 1,
      name: 'Eiffel Tower',
      icon: '🗼',
      rating: 4.6,
      price: 3,
      description: 'Iconic landmark with city views',
      duration: '2-3 hours',
      distance: '3.5 km away',
      note: '🎫 Book ahead recommended'
    },
    {
      id: 2,
      name: 'Louvre Museum',
      icon: '🎨',
      rating: 4.8,
      price: 3,
      description: "World's largest art museum",
      duration: '3-4 hours',
      distance: '2.1 km away',
      note: '🎫 Tickets selling fast for your dates'
    }
  ];

  const diningRecommendations = [
    {
      id: 1,
      icon: '🥐',
      title: 'Breakfast near your hotel',
      name: 'Café des Musées',
      rating: 4.4,
      distance: '0.3 km',
      description: 'Classic French café'
    },
    {
      id: 2,
      icon: '🍷',
      title: 'Dinner with a view',
      name: 'Les Ombres',
      rating: 4.5,
      price: 4,
      description: 'Eiffel Tower views'
    }
  ];

  const getPriceSymbol = (price) => {
    return '💰'.repeat(price);
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
              <AddIcon sx={{ mr: 1 }} /> My Trips
            </MenuItem>
            <MenuItem onClick={() => { setMenuAnchorEl(null); navigate('/recommendations'); }}>
              <TipIcon sx={{ mr: 1 }} /> Recommendations
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
        <Paper elevation={1} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Recommendations
          </Typography>

          <FormControl size="small" sx={{ minWidth: 250, mb: 2 }}>
            <InputLabel>Suggestions for</InputLabel>
            <Select
              value={selectedTrip}
              label="Suggestions for"
              onChange={(e) => setSelectedTrip(e.target.value)}
            >
              <MenuItem value="europe-2025">🇫🇷 Europe Summer 2025</MenuItem>
              <MenuItem value="asia-2025">🇹🇭 Southeast Asia</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="🎯 For You" />
              <Tab label="⚠️ Gaps" />
              <Tab label="📍 By Location" />
              <Tab label="⏰ By Date" />
            </Tabs>
          </Box>
        </Box>

        {/* For You Tab */}
        {activeTab === 0 && (
          <Box>
            <Card elevation={2} sx={{ mb: 3 }}>
              <Box sx={{ bgcolor: 'warning.light', p: 2 }}>
                <Typography variant="h6">⚠️ FILL THE GAP</Typography>
              </Box>
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Thursday, June 17 • 2:00 PM - 8:00 PM
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  6 hours in Paris
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Based on your interests: Museums, Architecture
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {gapRecommendations.map((rec) => (
                    <Card key={rec.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6">{rec.icon}</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {rec.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label={`★ ${rec.rating}`} size="small" />
                            <Chip label={getPriceSymbol(rec.price)} size="small" />
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {rec.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {rec.duration} • {rec.distance}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button variant="contained" size="small" startIcon={<AddIcon />}>
                            Add to Trip
                          </Button>
                          <Button variant="outlined" size="small" startIcon={<InfoIcon />}>
                            Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="text">View All (12 more)</Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={2}>
              <Box sx={{ bgcolor: 'info.light', p: 2 }}>
                <Typography variant="h6">📍 BEFORE YOUR TRIP</Typography>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CheckIcon color="success" />
                  <Typography variant="body2">
                    Visa requirements: None needed (US passport)
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                  ⚠️ Recommended:
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {preTripRecommendations.map((rec) => (
                    <Card key={rec.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Typography variant="h6">{rec.icon}</Typography>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {rec.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {rec.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {rec.type === 'action' ? (
                                <>
                                  <Button variant="outlined" size="small" startIcon={<AddIcon />}>
                                    Add Reminder
                                  </Button>
                                  <Button variant="text" size="small">
                                    Dismiss
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button variant="outlined" size="small">
                                    Learn More
                                  </Button>
                                  <Button variant="text" size="small">
                                    Dismiss
                                  </Button>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* By Location Tab */}
        {activeTab === 2 && (
          <Box>
            <Card elevation={2} sx={{ mb: 3 }}>
              <Box sx={{ bgcolor: 'primary.light', p: 2 }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  📍 THINGS TO DO IN PARIS
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  June 15-18 • Based on your interests
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                  Popular • Museums & Architecture
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {locationRecommendations.map((rec) => (
                    <Card key={rec.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6">{rec.icon}</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {rec.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label={`★ ${rec.rating}`} size="small" />
                            <Chip label={getPriceSymbol(rec.price)} size="small" />
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {rec.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {rec.duration} • {rec.distance}
                        </Typography>
                        {rec.note && (
                          <Typography variant="body2" color="warning.main" sx={{ mb: 2 }}>
                            {rec.note}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Button variant="contained" size="small" startIcon={<AddIcon />}>
                            Add to Trip
                          </Button>
                          <Button variant="outlined" size="small" startIcon={<InfoIcon />}>
                            Details
                          </Button>
                          <Button variant="outlined" size="small" startIcon={<MapIcon />}>
                            Map
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="text">View All (24 more)</Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={2} sx={{ mb: 3 }}>
              <Box sx={{ bgcolor: 'secondary.light', p: 2 }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  🍽️ DINING RECOMMENDATIONS
                </Typography>
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {diningRecommendations.map((rec) => (
                    <Card key={rec.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Typography variant="h6">{rec.icon}</Typography>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {rec.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {rec.name}
                              </Typography>
                              <Typography variant="body2">•</Typography>
                              <Chip label={`★ ${rec.rating}`} size="small" />
                              {rec.price && (
                                <>
                                  <Typography variant="body2">•</Typography>
                                  <Chip label={getPriceSymbol(rec.price)} size="small" />
                                </>
                              )}
                              {rec.distance && (
                                <>
                                  <Typography variant="body2">•</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {rec.distance}
                                  </Typography>
                                </>
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {rec.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button variant="outlined" size="small" startIcon={<AddIcon />}>
                                Add to Trip
                              </Button>
                              <Button variant="text" size="small" startIcon={<InfoIcon />}>
                                Details
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="text">View All Restaurants</Button>
                </Box>
              </CardContent>
            </Card>

            <Alert severity="info" icon={<TipIcon />}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                💡 LOCAL TIPS
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2">
                  Metro closes at 1:00 AM on weekdays
                </Typography>
                <Typography component="li" variant="body2">
                  Most museums closed Tuesdays
                </Typography>
                <Typography component="li" variant="body2">
                  Pick up Navigo Easy card for transport
                </Typography>
              </Box>
            </Alert>
          </Box>
        )}

        {/* Gaps Tab */}
        {activeTab === 1 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">Gap recommendations view</Typography>
          </Box>
        )}

        {/* By Date Tab */}
        {activeTab === 3 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">Date-based recommendations view</Typography>
          </Box>
        )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Recommendations;
