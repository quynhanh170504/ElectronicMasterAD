// ================================
// EXPRESS.JS BACKEND SETUP
// ================================

// package.json dependencies needed:
/*
{
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  }
}
*/

// server.js or app.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10, // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Upload endpoint
app.post('/api/upload/images', upload.array('images', 10), async (req, res) => {
  try {
    console.log('Files received:', req.files?.length || 0);
    console.log('Body:', req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    // Upload each file to Cloudinary
    const uploadPromises = req.files.map(async (file) => {
      return new Promise((resolve, reject) => {
        // Convert buffer to base64
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        cloudinary.uploader.upload(
          base64String,
          {
            resource_type: 'image',
            folder: 'uploads', // Optional: organize in folders
            transformation: [
              { quality: 'auto' }, // Automatic quality optimization
              { fetch_format: 'auto' } // Automatic format optimization
            ],
            // Optional: Add tags or context
            tags: ['web-upload'],
            context: {
              uploaded_by: req.body.uploadedBy || 'unknown',
              category: req.body.category || 'general'
            }
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve({
                public_id: result.public_id,
                url: result.secure_url,
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes,
                created_at: result.created_at
              });
            }
          }
        );
      });
    });

    // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);

    // Optional: Save upload information to database
    // await saveUploadInfo(uploadResults, req.body);

    res.json({
      success: true,
      message: `Successfully uploaded ${uploadResults.length} images`,
      images: uploadResults,
      count: uploadResults.length
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB per file.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 10 files per upload.'
      });
    }
  }

  res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ================================
// ENVIRONMENT VARIABLES (.env)
// ================================

/*
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3001
*/