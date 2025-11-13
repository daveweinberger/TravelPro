import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Card,
  CardContent,
  TextField,
  IconButton,
  Alert
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  DirectionsCar as CarIcon,
  TheaterComedy as ActivityIcon,
  Email as EmailIcon,
  ContentCopy as CopyIcon,
  Info as InfoIcon,
  Add as AddIcon,
  AttachFile as AttachFileIcon
} from '@mui/icons-material';
import ImportProcessing from './ImportProcessing';
import ImportReview from './ImportReview';
import '../styles/ImportPlans.css';

const ImportPlans = ({ trips, onClose }) => {
  const [selectedTrip, setSelectedTrip] = useState('europe-2025');
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    setUploadedFiles(files);
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setShowReview(true);
  };

  const handleReviewConfirm = () => {
    setShowReview(false);
    setUploadedFiles([]);
    // Show success message or close dialog
    if (onClose) {
      setTimeout(() => onClose(), 500);
    }
  };

  const handleReviewCancel = () => {
    setShowReview(false);
    setUploadedFiles([]);
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setUploadedFiles([]);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('import@travelpro.app');
  };

  if (isProcessing) {
    return (
      <ImportProcessing 
        files={uploadedFiles}
        onReviewReady={handleProcessingComplete}
        onCancel={handleCancelProcessing}
      />
    );
  }

  if (showReview) {
    return (
      <ImportReview
        extractedData={uploadedFiles}
        onConfirm={handleReviewConfirm}
        onCancel={handleReviewCancel}
      />
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Typography variant="body1">Add plans to:</Typography>
        <FormControl size="small" sx={{ minWidth: 250 }}>
          <InputLabel>Trip</InputLabel>
          <Select
            value={selectedTrip}
            label="Trip"
            onChange={(e) => setSelectedTrip(e.target.value)}
          >
            {trips.map(trip => (
              <MenuItem key={trip.id} value={trip.id}>
                {trip.flag} {trip.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body1">or</Typography>
        <Button variant="outlined" startIcon={<AddIcon />}>
          New Trip
        </Button>
      </Box>

      {/* Upload Documents Section */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            📄 Upload Documents
          </Typography>
          
          <Box
            className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload-zone').click()}
            sx={{
              border: '2px dashed',
              borderColor: dragActive ? 'primary.main' : 'grey.400',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              bgcolor: dragActive ? 'action.hover' : 'background.paper',
              cursor: 'pointer',
              transition: 'all 0.3s',
              mb: 2
            }}
          >
            <AttachFileIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              Drop files here or click
            </Typography>
          </Box>
          <input
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.heic"
            style={{ display: 'none' }}
            id="file-upload-zone"
            onChange={handleFileInput}
          />

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
            Supported: PDF, PNG, JPG, HEIC
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
            Max size: 10 MB per file
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.heic"
              style={{ display: 'none' }}
              id="file-upload"
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload">
              <Button variant="contained" startIcon={<UploadIcon />} component="span">
                Choose Files
              </Button>
            </label>
          </Box>
        </CardContent>
      </Paper>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">OR</Typography>
      </Divider>

      {/* Forward Email Section */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            📧 Forward Email
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Forward confirmation emails to:
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              fullWidth
              value="import@travelpro.app"
              InputProps={{
                readOnly: true,
              }}
              size="small"
            />
            <IconButton color="primary" onClick={handleCopyEmail}>
              <CopyIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ mb: 1 }}>
            We'll automatically extract:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li" variant="body2">Flight confirmations</Typography>
            <Typography component="li" variant="body2">Hotel reservations</Typography>
            <Typography component="li" variant="body2">Car rentals</Typography>
            <Typography component="li" variant="body2">Activity bookings</Typography>
            <Typography component="li" variant="body2">Restaurant reservations</Typography>
          </Box>

          <Button variant="text" startIcon={<InfoIcon />} size="small">
            How it works
          </Button>
        </CardContent>
      </Paper>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">OR</Typography>
      </Divider>

      {/* Manual Entry Section */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            ✍️ Manual Entry
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="outlined" startIcon={<FlightIcon />}>
              Add Flight
            </Button>
            <Button variant="outlined" startIcon={<HotelIcon />}>
              Add Hotel
            </Button>
            <Button variant="outlined" startIcon={<CarIcon />}>
              Add Car
            </Button>
            <Button variant="outlined" startIcon={<ActivityIcon />}>
              Add Activity
            </Button>
          </Box>
        </CardContent>
      </Paper>

      {/* Pro Tip */}
      <Alert severity="info" icon={<InfoIcon />}>
        <Typography variant="body2">
          <strong>Pro Tip:</strong> You can also screenshot your confirmations and upload them directly!
        </Typography>
      </Alert>
    </Box>
  );
};

export default ImportPlans;
