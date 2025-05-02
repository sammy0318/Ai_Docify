import { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PdfUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
      
      if (pdfFiles.length !== newFiles.length) {
        setNotification({
          open: true,
          message: 'Only PDF files are allowed',
          severity: 'error'
        });
        return;
      }
      
      setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
      
      if (pdfFiles.length !== newFiles.length) {
        setNotification({
          open: true,
          message: 'Only PDF files are allowed',
          severity: 'error'
        });
        return;
      }
      
      setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const uploadFiles = () => {
    if (files.length === 0) {
      setNotification({
        open: true,
        message: 'Please select files to upload',
        severity: 'warning'
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setNotification({
            open: true,
            message: 'Files uploaded successfully! Processing documents...',
            severity: 'success'
          });
          // Here you would typically redirect to a results page
          // or show processing status
        }, 500);
      }
    }, 300);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: 700, 
          mb: 2,
          color: '#7c4dff' 
        }}
      >
        Upload Your PDF Documents
      </Typography>

      <Typography 
        variant="body1" 
        align="center" 
        sx={{ mb: 6 }}
      >
        Upload your academic papers, textbooks, or notes for AI-powered summaries, study notes, and practice questions.
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          mb: 4
        }}
      >
        <Box
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: '2px dashed #7c4dff',
            borderRadius: 2,
            p: 6,
            textAlign: 'center',
            cursor: 'pointer',
            mb: 3,
            backgroundColor: 'rgba(124, 77, 255, 0.04)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(124, 77, 255, 0.08)',
            }
          }}
        >
          <label htmlFor="file-upload" className="hidden-label"></label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf"
            className="fileInput"
            ref={fileInputRef}
            onChange={handleFileChange}
            title="Upload PDF files"
          />
          <CloudUploadIcon sx={{ fontSize: 60, color: '#7c4dff', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Drag & Drop PDFs here
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or click to browse files
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
            Maximum file size: 100MB
          </Typography>
        </Box>

        {files.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Selected Files ({files.length})
            </Typography>
            <List>
              {files.map((file, index) => (
                <Box key={index}>
                  <ListItem 
                    secondaryAction={
                      <Button 
                        onClick={() => removeFile(index)}
                        startIcon={<DeleteIcon />}
                        color="error"
                      >
                        Remove
                      </Button>
                    }
                  >
                    <ListItemIcon>
                      <InsertDriveFileIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={file.name} 
                      secondary={`${formatFileSize(file.size)} - PDF`} 
                    />
                  </ListItem>
                  {index < files.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </>
        )}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained"
            size="large"
            onClick={uploadFiles}
            disabled={isUploading || files.length === 0}
            startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
            sx={{ 
              bgcolor: '#7c4dff',
              '&:hover': {
                bgcolor: '#6a3dd2',
              },
              py: 1.5,
              px: 4,
              minWidth: 200
            }}
          >
            {isUploading ? `Uploading ${uploadProgress}%` : 'Process Documents'}
          </Button>
        </Box>
      </Paper>

      {/* Features / Benefits */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" align="center" sx={{ mb: 4, fontWeight: 600 }}>
          What You'll Get
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: 3 
          }}
        >
          {[
            {
              title: 'Executive Summary',
              description: 'Key insights and main points from your document'
            },
            {
              title: 'Study Notes',
              description: 'Organized notes with important concepts highlighted'
            },
            {
              title: 'Practice Questions',
              description: 'Test your knowledge with AI-generated questions'
            },
            {
              title: 'Vocabulary List',
              description: 'Key terms and definitions from your document'
            }
          ].map((item, index) => (
            <Paper 
              key={index}
              elevation={2}
              sx={{ 
                p: 3, 
                width: { xs: '100%', sm: 'calc(50% - 16px)' },
                borderTop: '4px solid #7c4dff',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity as 'success' | 'error' | 'warning'} 
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PdfUpload;