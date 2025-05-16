import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const ProductUpload = () => {
  const [avatarPreviews, setAvatarPreviews] = useState([]); // Store multiple previews
  const [formData, setFormData] = useState({
    name: "",
    available: 0,
    price: 0,
    brandname: "",
    description: "",
    avatars: [], // Store multiple images
    bgImg: null
  });

  const handleAvatarChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const newPreviews = [];
    const newAvatars = [];

    files.forEach((file) => {
      newAvatars.push(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setAvatarPreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setFormData((prev) => ({
      ...prev,
      avatars: [...prev.avatars, ...newAvatars]
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Name"
          variant="standard"
          className="!w-full"
          multiline
        />
        <TextField
          label="Available"
          variant="standard"
          className="!w-full"
          type="number"
        />
        <TextField
          label="Price"
          variant="standard"
          className="!w-full"
          type="number"
        />
        <TextField
          label="Brand Name"
          variant="standard"
          className="!w-full"
        />
      </div>
      <TextField
        label="Description"
        variant="standard"
        className='!w-full'
        multiline
      ></TextField>


      {avatarPreviews.length > 0 && (
        <div className="!mt-4 grid grid-cols-3 gap-4">
          {avatarPreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Avatar Preview ${index + 1}`}
              className="w-100 h-100 object-cover"
            />
          ))}
        </div>
      )}
      <label htmlFor="avatar-upload" className="!mt-4 inline-block cursor-pointer">
        <Button variant="outlined" component="span">
          Choose Avatars
        </Button>
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        multiple // Allow multiple file selection
        onChange={handleAvatarChange}
        className=""
      /><br />
      <Button variant='contained' className='!mt-4 !mr-4'>Upload</Button>
    </div>
  )
}

export default ProductUpload;