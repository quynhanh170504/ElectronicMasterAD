// ================================
// REACT FRONTEND COMPONENT
// ================================

import React, { useState } from 'react';

const MultipleImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    // Validate file types
    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/');
      if (!isValid) {
        setError(`${file.name} is not a valid image file`);
      }
      return isValid;
    });

    // Validate file sizes (5MB limit per file)
    const validSizedFiles = validFiles.filter(file => {
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      if (!isValidSize) {
        setError(`${file.name} is too large. Maximum size is 5MB`);
      }
      return isValidSize;
    });

    setSelectedFiles(validSizedFiles);
    setError('');

    // Create preview URLs
    const previewUrls = validSizedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPreviews(previewUrls);
  };

  // Remove file from selection
  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    // Clean up object URL
    URL.revokeObjectURL(previews[index].url);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  // Upload images to backend
  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();

      // Append all files to FormData
      selectedFiles.forEach((file, index) => {
        formData.append('images', file);
      });

      // Add any additional data if needed
      formData.append('uploadedBy', 'user123');
      formData.append('category', 'gallery');

      const response = await fetch('/api/upload/images', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let browser set it with boundary
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      setUploadedImages(result.images);
      setSelectedFiles([]);
      setPreviews([]);

      // Clean up preview URLs
      previews.forEach(preview => URL.revokeObjectURL(preview.url));

      alert(`Successfully uploaded ${result.images.length} images!`);

    } catch (error) {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Multiple Images</h2>

      {/* File Input */}
      <div className="mb-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="text-sm text-gray-500 mt-2">
          Select multiple images (JPG, PNG, GIF). Max 5MB per file.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Selected Images ({previews.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="w-full h-32 object-cover rounded border"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">{preview.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && (
        <button
          onClick={uploadImages}
          disabled={uploading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded font-semibold transition-colors"
        >
          {uploading ? `Uploading ${selectedFiles.length} images...` : `Upload ${selectedFiles.length} Images`}
        </button>
      )}

      {/* Uploaded Images Display */}
      {uploadedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="border rounded p-2">
                <img
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Public ID: {image.public_id}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;

// ================================
// OPTIONAL: DATABASE MODEL (MongoDB/Mongoose)
// ================================

/*
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
  width: Number,
  height: Number,
  format: String,
  bytes: Number,
  uploaded_by: String,
  category: String,
  tags: [String],
  created_at: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', ImageSchema);

// Function to save upload info to database
async function saveUploadInfo(uploadResults, metadata) {
  const imageDocuments = uploadResults.map(result => ({
    ...result,
    uploaded_by: metadata.uploadedBy,
    category: metadata.category,
    tags: ['web-upload']
  }));

  return await Image.insertMany(imageDocuments);
}
*/

// ================================
// ADVANCED: Progress Tracking
// ================================

/*
// For tracking upload progress, you can use Socket.io
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// In your upload route, emit progress events
io.emit('uploadProgress', {
  userId: req.body.userId,
  completed: completedUploads,
  total: totalFiles,
  percentage: Math.round((completedUploads / totalFiles) * 100)
});
*/