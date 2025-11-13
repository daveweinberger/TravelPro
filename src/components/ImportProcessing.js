import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Button,
  Card,
  CardContent
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  HourglassEmpty as WaitingIcon,
  Description as FileIcon
} from '@mui/icons-material';
import '../styles/ImportProcessing.css';

const ImportProcessing = ({ files, onComplete, onCancel, onReviewReady }) => {
  const [processingFiles, setProcessingFiles] = useState([]);

  useEffect(() => {
    // Initialize files with processing status
    const initialFiles = files.map((file, index) => ({
      name: file.name || `Document_${index + 1}.pdf`,
      status: index === 0 ? 'processing' : 'waiting',
      progress: index === 0 ? 0 : 0,
      extractedData: null
    }));
    setProcessingFiles(initialFiles);

    // Simulate processing
    simulateProcessing(initialFiles);
  }, [files]);

  const simulateProcessing = (fileList) => {
    let currentIndex = 0;

    const processNext = () => {
      if (currentIndex >= fileList.length) {
        setTimeout(() => {
          if (onReviewReady) {
            onReviewReady();
          } else if (onComplete) {
            onComplete();
          }
        }, 1000);
        return;
      }

      // Update current file to processing
      setProcessingFiles(prev => 
        prev.map((file, idx) => 
          idx === currentIndex 
            ? { ...file, status: 'processing', progress: 0 }
            : file
        )
      );

      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        
        setProcessingFiles(prev => 
          prev.map((file, idx) => 
            idx === currentIndex 
              ? { ...file, progress: Math.min(progress, 100) }
              : file
          )
        );

        if (progress >= 100) {
          clearInterval(progressInterval);
          
          // Mark as complete with extracted data
          const extractedData = getExtractedData(fileList[currentIndex].name);
          setProcessingFiles(prev => 
            prev.map((file, idx) => 
              idx === currentIndex 
                ? { ...file, status: 'complete', extractedData }
                : file
            )
          );

          currentIndex++;
          setTimeout(processNext, 500);
        }
      }, 100);
    };

    processNext();
  };

  const getExtractedData = (filename) => {
    // Simulate different extraction results based on filename
    if (filename.includes('Flight') || filename.includes('BA')) {
      return {
        type: 'Flight',
        details: 'Flight BA 2341, Jun 15',
        location: 'JFK → CDG, 10:30 AM'
      };
    } else if (filename.includes('Hotel') || filename.includes('Marais')) {
      return {
        type: 'Hotel',
        details: 'Hotel Le Marais, Jun 15-17',
        location: 'Paris, France'
      };
    } else if (filename.includes('Rome')) {
      return {
        type: 'Flight',
        details: 'Flight AF 5678, Jun 18',
        location: 'CDG → FCO, 2:15 PM'
      };
    }
    return {
      type: 'Document',
      details: 'Travel document',
      location: 'Details extracted'
    };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <CheckIcon color="success" />;
      case 'processing':
        return <HourglassEmpty color="primary" className="rotating" />;
      case 'waiting':
        return <WaitingIcon color="disabled" />;
      default:
        return <FileIcon />;
    }
  };

  const getStatusText = (file) => {
    switch (file.status) {
      case 'complete':
        return '✅ Extracted';
      case 'processing':
        return '⏳ Processing...';
      case 'waiting':
        return '⏸️ Waiting...';
      default:
        return '';
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
        Analyzing your travel documents...
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {processingFiles.map((file, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ pt: 0.5 }}>
                  {getStatusIcon(file.status)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    📄 {file.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {getStatusText(file)}
                  </Typography>

                  {file.status === 'processing' && (
                    <Box sx={{ mb: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={file.progress} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {file.progress}%
                      </Typography>
                    </Box>
                  )}

                  {file.status === 'complete' && file.extractedData && (
                    <Box sx={{ mt: 1, pl: 2, borderLeft: 2, borderColor: 'success.main' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {file.extractedData.details}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {file.extractedData.location}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ImportProcessing;
