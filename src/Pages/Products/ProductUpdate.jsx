import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { api, apiAuth } from '~/services/api';
import ElectronicEndpoint from '~/services/electronic.endpoint.js';
import LoadingScreen from '~/Components/LoadingScreen';

const ProductUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [productImgs, setProductImgs] = useState([]);
  const [product_id, setProduct_id] = useState(id);
  const [productName, setProductName] = useState('');
  const [productAvailable, setProductAvailable] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productBrandName, setProductBrandName] = useState('');
  const [productMainCategory, setProductMainCategory] = useState('');
  const [productCategories, setProductCategories] = useState(['electronics']);
  const [productDescription, setProductDescription] = useState('');
  const [productDiscount, setProductDiscount] = useState(0);
  const [productSpecifications, setProductSpecifications] = useState([
    {
      _id: "6814329cc86355927f0c3bf6",
      name: 'Content',
      attributes: [
        {
          code: "brand",
          name: "Thương hiệu",
          value: "Đăng Huấn",
          _id: "6814329cc86355927f0c3bf7"
        },
        {
          code: "brand_country",
          name: "Xuất xứ thương hiệu",
          value: "Việt Nam",
          _id: "6814329cc86355927f0c3bf8"
        },
        {
          code: "origin",
          name: "Xuất xứ (Made in)",
          value: "China / Vietnam",
          _id: "6814329cc86355927f0c3bf9"
        }
      ]
    },
    {
      _id: "6814329cc86355927f0c3bfa",
      name: 'Operation',
      attributes: [
        {
          code: "is_warranty_applied",
          name: "Sản phẩm có được bảo hành không?",
          value: "Không",
          _id: "6814329cc86355927f0c3bfb"
        }
      ]
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [error, setError] = useState('');
  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeletingElectronicImg, setIsDeletingElectronicImg] = useState(false);
  const openImageViewer = (img) => {
    setSelectedImage(img.url);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
    setIsViewerOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight: '100%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const fetchElecById = () => {
    api.get(`/user/displayData/electronic/${id}`).then(res => {
      console.log("check electronic: ", res.data.data)
      if (res.data.success === true) {
        setProductName(res.data.data.name);
        setProductAvailable(res.data.data.available);
        setProductPrice(res.data.data.price);
        setProductBrandName(res.data.data.brandName);
        setProductDescription(res.data.data.description);
        setProductDiscount(res.data.data.discount);
        setProductImgs(res.data.data.electronicImgs);
        setProductMainCategory(res.data.data.mainCategory);
        // setProductSpecifications(res.data.data.specifications || []);
        // Remove all _id fields from specifications and their attributes
        const cleanedSpecifications = (res.data.data.specifications || []).map(spec => {
          const { _id, ...specRest } = spec;
          return {
            ...specRest,
            attributes: (spec.attributes || []).map(attr => {
              const { _id, ...attrRest } = attr;
              return { ...attrRest };
            })
          };
        });
        setProductSpecifications(cleanedSpecifications);
        setProductCategories(res.data.data.categories || []);
      }
    })
  }
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
  const removeFile = (public_id) => {
    setLoading(true);
    apiAuth.post(ElectronicEndpoint.deleteElecImg(id), {
      public_id: public_id
    }).then(res => {
      if (res.data.success === true) {
        alert("Delete successfully !")
        fetchElecById()
      }
    }).catch(err => {
      console.error("Error deleting electronic image:", err);
      alert("Delete failed !");
    }).finally(() => {
      setLoading(false);
    });
  }
  const removeSelectedFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    // Clean up object URL
    URL.revokeObjectURL(previews[index].url);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };
  const handleUpdateProduct = () => {
    setLoading(true)
    if (productName === '' || productAvailable === 0 || productPrice === 0 || productBrandName === '' || productDescription === '') {
      setLoading(false);
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    if (selectedFiles.length > 0) {
      // append all files to formdata
      selectedFiles.forEach(file => {
        formData.append('electronicImgsFiles', file);
      });
    }

    formData.append('name', productName);
    formData.append('available', productAvailable);
    formData.append('price', productPrice);
    formData.append('brandName', productBrandName);
    formData.append('description', productDescription);
    formData.append('discount', productDiscount);
    formData.append('categories', JSON.stringify(productCategories));
    formData.append('mainCategory', productMainCategory);
    formData.append('specifications', JSON.stringify(productSpecifications));
    formData.append('electronicImgs', JSON.stringify(productImgs))
    console.log("check all data: ", {
      name: productName,
      available: productAvailable,
      price: productPrice,
      brandName: productBrandName,
      description: productDescription,
      discount: productDiscount,
      electronicImgs: productImgs,
      specifications: productSpecifications,
      categories: productCategories
    });
    apiAuth.patch(ElectronicEndpoint.updateElectronic(id), formData)
      .then(res => {
        if (res.data.success === true) {
          alert("Update successfully !");
          navigate(-1);
        } else {
          alert("Update failed !");
        }
      }).catch(err => {
        console.error("Error updating electronic:", err);
      }).finally(() => {
        setLoading(false);
        setSelectedFiles([]);
        setPreviews([]);
      });
  }
  useEffect(() => {
    fetchElecById()
  }, [])
  return (
    <div className='p-10'>
      <button className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group" type="button" onClick={() => navigate(-1)}>
        <div className="bg-black rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
            <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#ffffff"></path>
            <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#ffffff"></path>
          </svg>
        </div>
        <p className="translate-x-2">Go Back</p>
      </button>

      <div className="bg-white rounded-lg border dark:bg-gray-800 dark:border-gray-700 shadow-lg mt-6">
        <div className="flex p-2 gap-1">
          <div className="">
            <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <div className="card__content">
          <div className='w-full p-4 border-l border-r border-[rgba(0,0,0,0.2)]'>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Name"
                variant="standard"
                className="!w-full dark:bg-gray-800 dark:!text-white"
                multiline
                value={productName}
                onChange={e => setProductName(e.target.value)}
              />
              <TextField
                label="Available"
                variant="standard"
                className="!w-full dark:bg-gray-800"
                type="number"
                value={productAvailable}
                onChange={e => setProductAvailable(e.target.value)}
              />
              <TextField
                label="Price"
                variant="standard"
                className="!w-full dark:bg-gray-800"
                type="number"
                value={productPrice}
                onChange={e => setProductPrice(e.target.value)}
              />
              <TextField
                label="Brand Name"
                variant="standard"
                className="!w-full dark:bg-gray-800"
                value={productBrandName}
                onChange={e => setProductBrandName(e.target.value)}
              />
              <TextField
                label="Discount"
                variant="standard"
                className="!w-full dark:bg-gray-800"
                type='number'
                value={productDiscount}
                onChange={e => setProductDiscount(e.target.value)}
              />
              <TextField
                label="Main Category"
                variant="standard"
                className="!w-full dark:bg-gray-800"
                value={productMainCategory}
                onChange={e => setProductMainCategory(e.target.value)}
              />
              {productCategories.length > 0 && (
                <TextField
                  label="Categories"
                  variant="standard"
                  className="!w-full dark:bg-gray-800"
                  value={productCategories.join(', ')}
                  onChange={e => setProductCategories(e.target.value.split(',').map(cat => cat.trim()))}
                />
              )}
              {productSpecifications.length > 0 && productSpecifications[0].attributes.map((attr, index) => (
                <TextField
                  key={index}
                  label={attr.name}
                  variant="standard"
                  className="!w-full dark:bg-gray-800"
                  value={attr.value}
                  onChange={e => {
                    const newSpecifications = [...productSpecifications];
                    newSpecifications[0].attributes[index].value = e.target.value;
                    setProductSpecifications(newSpecifications);
                  }}
                />
              ))}
              {productSpecifications.length > 1 && productSpecifications[1].attributes.map((attr, index) => (
                <TextField
                  key={index}
                  label={attr.name}
                  variant="standard"
                  className="!w-full dark:bg-gray-800"
                  value={attr.value}
                  onChange={e => {
                    const newSpecifications = [...productSpecifications];
                    newSpecifications[1].attributes[index].value = e.target.value;
                    setProductSpecifications(newSpecifications);
                  }}
                />
              ))}
            </div>
            <TextField
              label="Description"
              variant="standard"
              className='!w-full dark:bg-gray-800'
              multiline
              value={productDescription}
              rows={10}
              onChange={e => setProductDescription(e.target.value)}
            />
            {productImgs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Images ({productImgs.length})</h3>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                  {productImgs.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.url}
                        alt={img.public_id}
                        className="w-full h-full object-cover rounded border cursor-pointer"
                        onClick={() => openImageViewer(img)}
                      />
                      <button
                        onClick={() => removeFile(img.public_id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{img.public_id}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        onClick={() => removeSelectedFile(index)}
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

            {/* Uploaded Images Display */}
            {uploadedImages.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Uploaded Images</h3>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
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
            <Button variant='contained' className='!mt-4 !mr-4 !bg-black' onClick={() => handleUpdateProduct()}>Update</Button>
            <Button variant='outlined' className='!mt-4' onClick={() => handleCloseUpdateDialog()}>Close</Button>
          </div>
        </div>
      </div>
      {loading && <LoadingScreen />}
      <Modal open={isViewerOpen} onClose={closeImageViewer}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={closeImageViewer}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="View" className='w-[50%] h-full m-auto' />
        </Box>
      </Modal>
    </div>
  );
}

export default ProductUpdate;