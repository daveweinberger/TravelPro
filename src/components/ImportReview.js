import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  IconButton,
  Divider
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Edit as EditIcon,
  AttachFile as AttachFileIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Lightbulb as InsightIcon
} from '@mui/icons-material';
import '../styles/ImportReview.css';

const ImportReview = ({ extractedData, onConfirm, onCancel }) => {
  const [reviewItems] = useState([
    {
      id: 1,
      type: 'flight',
      status: 'confirmed',
      title: 'Flight BA 2341',
      date: 'Tuesday, June 15, 2025',
      time: '10:30 AM',
      details: 'JFK (Terminal 7) → CDG (Terminal 2A)',
      confirmation: 'ABC123',
      warnings: []
    },
    {
      id: 2,
      type: 'hotel',
      status: 'needs-review',
      title: 'Hotel Le Marais',
      checkIn: 'June 15, 2025 • 3:00 PM',
      checkOut: 'June 17, 2025 • 12:00 PM',
      address: '123 Rue Saint-Antoine, Paris',
      confirmation: 'HTL789',
      warnings: ['Could not extract check-out time']
    },
    {
      id: 3,
      type: 'flight',
      status: 'confirmed',
      title: 'Flight AF 5678',
      date: 'Friday, June 18, 2025',
      time: '2:15 PM',
      details: 'CDG (Terminal 2E) → FCO (Terminal 3)',
      confirmation: 'XYZ456',
      warnings: []
    }
  ]);

  const getStatusIcon = (status) => {
    if (status === 'confirmed') {
      return <CheckIcon color="success" />;
    }
    return <WarningIcon color="warning" />;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flight':
        return <FlightIcon />;
      case 'hotel':
        return <HotelIcon />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
        Review and confirm extracted information
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {reviewItems.map((item) => (
          <Card 
            key={item.id} 
            variant="outlined"
            sx={{ 
              borderLeft: 4, 
              borderLeftColor: item.status === 'confirmed' ? 'success.main' : 'warning.main'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getStatusIcon(item.status)}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {getTypeLabel(item.type)}
                    {item.status === 'needs-review' && ' - Needs Review'}
                  </Typography>
                </Box>
                <Button size="small" startIcon={<EditIcon />}>
                  Edit
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ pl: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>

                {item.type === 'flight' && (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {item.date} • {item.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.details}
                    </Typography>
                  </>
                )}

                {item.type === 'hotel' && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Check-in: {item.checkIn}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Check-out: {item.checkOut}
                        </Typography>
                        {item.warnings.length > 0 && (
                          <WarningIcon color="warning" fontSize="small" />
                        )}
                      </Box>
                    </Box>
                    {item.warnings.length > 0 && (
                      <Alert severity="warning" sx={{ mb: 1, py: 0 }}>
                        {item.warnings.map((warning, idx) => (
                          <Typography key={idx} variant="body2">
                            ⚠️ {warning}
                          </Typography>
                        ))}
                      </Alert>
                    )}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Address: {item.address}
                    </Typography>
                  </>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Confirmation: {item.confirmation}
                </Typography>

                <Button 
                  size="small" 
                  startIcon={<AttachFileIcon />}
                  variant="text"
                >
                  View Original
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Alert severity="info" icon={<InsightIcon />} sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          💡 Smart Insights
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <Typography component="li" variant="body2">
            6-hour gap detected between hotel checkout and dinner reservation on June 17
          </Typography>
          <Typography component="li" variant="body2">
            Consider adding airport transfer for Jun 18
          </Typography>
        </Box>
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={onCancel} size="large">
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} size="large">
          Add to Trip
        </Button>
      </Box>
    </Box>
  );
};

export default ImportReview;
