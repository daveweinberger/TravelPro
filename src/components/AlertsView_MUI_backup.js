import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  Divider
} from '@mui/material';
import '../styles/AlertsView.css';

const AlertsView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const gapAlerts = [
    {
      priority: 'high',
      title: '6-hour gap in Paris',
      trip: { flag: '🇫🇷', name: 'EUROPE SUMMER', tags: ['Vacation', 'Europe'] },
      date: 'Thursday, June 17',
      time: '2:00 PM - 8:00 PM',
      between: [
        'Hotel Le Marais checkout (12:00 PM)',
        'Dinner at Le Comptoir (8:00 PM)'
      ],
      suggestions: 12
    },
    {
      priority: 'medium',
      title: '4-hour gap in Rome',
      trip: { flag: '🇫🇷', name: 'EUROPE SUMMER', tags: ['Vacation', 'Europe'] },
      date: 'Saturday, June 20',
      time: '10:00 AM - 2:00 PM',
      between: [
        'Colosseum tour end (10:00 AM)',
        'Vatican Museums entry (2:00 PM)'
      ],
      suggestions: 8
    },
    {
      priority: 'low',
      title: 'Morning gap before flight',
      trip: { flag: '🇫🇷', name: 'EUROPE SUMMER', tags: ['Vacation', 'Europe'] },
      date: 'Monday, June 25',
      time: '6:00 AM - 10:00 AM',
      between: [
        'Hotel checkout (6:00 AM)',
        'Flight departure (10:00 AM)'
      ],
      recommendations: 'Airport lounge, breakfast'
    }
  ];

  const upcomingReminders = [
    {
      timing: '2 days before departure',
      title: 'Check-in for Flight BA 2341',
      trip: '🇫🇷 EUROPE SUMMER'
    },
    {
      timing: '7 days before departure',
      title: 'Notify bank about international travel',
      trip: '🇫🇷 EUROPE SUMMER + 🇹🇭 SOUTHEAST ASIA'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label={<Chip label="⚠️ Gaps (3)" size="small" />} />
          <Tab label={<Chip label="📅 Upcoming (5)" size="small" />} />
          <Tab label={<Chip label="✓ Resolved (12)" size="small" color="success" />} />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box>
          <Paper elevation={2} sx={{ mb: 3 }}>
            <Box sx={{ bgcolor: 'warning.light', p: 2 }}>
              <Typography variant="h6">⚠️ GAP ALERTS</Typography>
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {gapAlerts.map((alert, idx) => (
                  <Card key={idx} variant="outlined" sx={{ borderLeft: 4, borderLeftColor: `${getPriorityColor(alert.priority)}.main` }}>
                    <CardContent>
                      <Chip 
                        label={`⚠️ ${alert.priority.toUpperCase()} PRIORITY`} 
                        color={getPriorityColor(alert.priority)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {alert.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {alert.trip.flag} {alert.trip.name}
                        </Typography>
                        {alert.trip.tags.map(tag => (
                          <Chip key={tag} label={`🏷️ ${tag}`} size="small" />
                        ))}
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {alert.date} • {alert.time}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
                        Between:
                      </Typography>
                      <Box component="ul" sx={{ pl: 3, mb: 1 }}>
                        {alert.between.map((item, i) => (
                          <Typography key={i} component="li" variant="body2">
                            {item}
                          </Typography>
                        ))}
                      </Box>

                      {alert.suggestions && (
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Suggestions ready ({alert.suggestions})
                        </Typography>
                      )}
                      {alert.recommendations && (
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Recommendations: {alert.recommendations}
                        </Typography>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button variant="contained" size="small">
                          View Suggestions
                        </Button>
                        <Button variant="outlined" size="small">
                          Dismiss
                        </Button>
                        <Button variant="text" size="small">
                          Snooze
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Paper>

          <Paper elevation={2} sx={{ mb: 3 }}>
            <Box sx={{ bgcolor: 'info.light', p: 2 }}>
              <Typography variant="h6">📅 UPCOMING REMINDERS</Typography>
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingReminders.map((reminder, idx) => (
                  <Card key={idx} variant="outlined">
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        📱 {reminder.timing}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 600 }}>
                        {reminder.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {reminder.trip}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="outlined" size="small">
                          ✓ Mark Complete
                        </Button>
                        <Button variant="text" size="small">
                          Snooze
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="text" size="small">
                  View All (3 more)
                </Button>
              </Box>
            </CardContent>
          </Paper>

          <Alert severity="info" icon="💡">
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              SMART INSIGHTS
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li" variant="body2">
                3 gaps could be filled with museum visits
              </Typography>
              <Typography component="li" variant="body2">
                Consider Paris Museum Pass (saves €45)
              </Typography>
              <Typography component="li" variant="body2">
                Weather forecast: Rain expected Jun 17-18
              </Typography>
            </Box>
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="outlined">Mark All as Read</Button>
            <Button variant="outlined">Settings</Button>
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">Upcoming reminders view</Typography>
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">Resolved alerts view</Typography>
        </Box>
      )}
    </Box>
  );
};

export default AlertsView;
