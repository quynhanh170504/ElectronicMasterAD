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
import { contents, operations } from '~/services/electronic.specification.attributes';
import LoadingScreen from '~/Components/LoadingScreen';

const ProductUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [productName, setProductName] = useState('');
  const [productAvailable, setProductAvailable] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productBrandName, setProductBrandName] = useState('');
  const [productMainCategory, setProductMainCategory] = useState('');
  const [productCategories, setProductCategories] = useState(['electronics']);
  const [productDescription, setProductDescription] = useState('');
  const [productDiscount, setProductDiscount] = useState(0);
  const [productImgs, setProductImgs] = useState([]); // Added missing state
  const [productSpecifications, setProductSpecifications] = useState([
    {
      name: 'Content',
      attributes: [
        {
          code: "brand",
          name: "Thương hiệu",
          value: "",
        },
        {
          code: "brand_country",
          name: "Xuất xứ thương hiệu",
          value: "",
        },
        {
          code: "origin",
          name: "Xuất xứ (Made in)",
          value: "",
        }
      ]
    },
    {
      name: 'Operation',
      attributes: [
        {
          code: "is_warranty_applied",
          name: "Sản phẩm có được bảo hành không?",
          value: "Không",
        },
        {
          code: 'warranty_form',
          name: 'Hình thức bảo hành',
          value: 'Tem bảo hành',
        },
        {
          code: 'warranty_time_period',
          name: 'Thời gian bảo hành',
          value: '12 Tháng',
        },
        {
          code: 'vat_taxable',
          name: 'Có thuế VAT',
          value: 'Có',
        },
      ]
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddSpecificationOpen, setIsAddSpecificationOpen] = useState(false);

  const [error, setError] = useState('');
  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const closeAddSpecification = () => {
    setSelectedImage(null);
    setIsAddSpecificationOpen(false);
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

  const fetchElecById = async () => {
    try {
      const response = await apiAuth.get(ElectronicEndpoint.getElectronicById(id));
      if (response.data.success) {
        const product = response.data.data;
        setProductName(product.name || '');
        setProductAvailable(product.available || 0);
        setProductPrice(product.price || 0);
        setProductBrandName(product.brandName || '');
        setProductMainCategory(product.mainCategory || '');
        setProductCategories(product.categories || ['electronics']);
        setProductDescription(product.description || '');
        setProductDiscount(product.discount || 0);
        setProductImgs(product.electronicImgs || []);
        if (product.specifications) {
          setProductSpecifications(product.specifications);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product data');
    }
  };

  const removeFile = (public_id) => {
    apiAuth.post(ElectronicEndpoint.deleteElecImg(id), {
      public_id: public_id
    }).then(res => {
      if (res.data.success === true) {
        alert("Delete successfully !")
        fetchElecById()
      }
    })
  }

  const removeSelectedFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    // Clean up object URL
    URL.revokeObjectURL(previews[index].url);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  // Fixed specification update handlers
  const handleContentSpecificationChange = (index, value) => {
    const newSpecifications = [...productSpecifications];
    newSpecifications[0].attributes[index].value = value;
    setProductSpecifications(newSpecifications);
  };

  const handleOperationSpecificationChange = (index, value) => {
    const newSpecifications = [...productSpecifications];
    newSpecifications[1].attributes[index].value = value;
    setProductSpecifications(newSpecifications);
  };

  const handleUploadProduct = () => {
    setUploading(true);
    console.log("check upload info: ", {
      name: productName,
      available: productAvailable,
      price: productPrice,
      brandName: productBrandName,
      description: productDescription,
      discount: productDiscount,
      electronicImgs: productImgs,
      specifications: productSpecifications,
      categories: productCategories,
      mainCategory: productMainCategory
    })
    if (productName === '' || productAvailable === 0 || productPrice === 0 || productBrandName === '' || productDescription === '' || productMainCategory === '' || productCategories.length === 0 || productSpecifications.length === 0) {
      alert("Please fill all fields");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    if (selectedFiles.length > 0) {
      // append all files to formdata
      selectedFiles.forEach(file => {
        formData.append('electronicImgs', file);
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

    apiAuth.post(ElectronicEndpoint.createElectronic, formData)
      .then(res => {
        if (res.data.success === true) {
          setUploading(false);
          alert("Upload successfully !");
        } else {
          setUploading(false);
          alert("Upload failed !");
        }
      }).catch(err => {
        setUploading(false);
        console.error("Error uploading electronic:", err);
        setError("Error uploading product: " + err.message);
      });
  }

  useEffect(() => {

  }, []);

  return (
    <div className='p-10'>
      <div className="bg-white rounded-lg border  dark:bg-gray-800 dark:border-gray-700 shadow-lg mt-6">
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

            {/* Error Display */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Name"
                variant="standard"
                className="!w-full dark:bg-gray-800"
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
                onChange={e => setProductAvailable(Number(e.target.value))}
              />
              <TextField
                label="Price"
                variant="standard"
                className="!w-full dark:bg-gray-800"
                type="number"
                value={productPrice}
                onChange={e => setProductPrice(Number(e.target.value))}
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
                onChange={e => setProductDiscount(Number(e.target.value))}
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
            </div>

            <TextField
              label="Description"
              variant="standard"
              className='!w-full dark:bg-gray-800 !mt-4'
              multiline
              value={productDescription}
              rows={10}
              onChange={e => setProductDescription(e.target.value)}
            />

            {/* Content Specifications */}
            {productSpecifications[0]?.attributes?.map((spec, index) => (
              <TextField
                key={`content-${spec.code}-${index}`}
                label={spec.name}
                variant="standard"
                className="!w-full dark:bg-gray-800 !mb-4"
                value={spec.value}
                onChange={e => handleContentSpecificationChange(index, e.target.value)}
              />
            ))}

            {/* Operation Specifications */}
            {productSpecifications[1]?.attributes?.map((spec, index) => (
              <TextField
                key={`operation-${spec.code}-${index}`}
                label={spec.name}
                variant="standard"
                className="!w-full dark:bg-gray-800 !mb-4"
                value={spec.value}
                onChange={e => handleOperationSpecificationChange(index, e.target.value)}
              />
            ))}

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

            <Button
              variant='contained'
              className='!mt-4 !mr-4 !bg-black'
              onClick={handleUploadProduct}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </div>
      {uploading === true && <LoadingScreen />}
      <Modal open={isAddSpecificationOpen} onClose={closeAddSpecification}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={closeAddSpecification}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}

export default ProductUpdate;