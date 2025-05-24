import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
const ProductUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, available, price, brandname, description } = location.state || { name: '', available: 0, price: 0, brandname: '', description: '' };
  const [productName, setProductName] = useState(name);
  const [productAvailable, setProductAvailable] = useState(available);
  const [productPrice, setProductPrice] = useState(price);
  const [productBrandName, setProductBrandName] = useState(brandname);
  const [productDescription, setProductDescription] = useState(description);

  return (
    <div className='p-10'>

      <button class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group" type="button" onClick={() => navigate(-1)}>
        <div class="bg-black rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
            <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#ffffff"></path>
            <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#ffffff"></path>
          </svg>
        </div>
        <p class="translate-x-2">Go Back</p>
      </button>

      <div class="bg-white rounded-lg border">
        <div class="flex p-2 gap-1">
          <div class="">
            <span class="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div class="circle">
            <span class="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div class="circle">
            <span class="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <div class="card__content">
          <div className='w-full p-4 border-l border-r border-[rgba(0,0,0,0.2)]'>
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
            </div>
            <TextField
              label="Description"
              variant="standard"
              className='!w-full dark:bg-gray-800'
              multiline
              value={productDescription}
              rows={4}
              onChange={e => setProductDescription(e.target.value)}
            />
            <Button variant='contained' className='!mt-4 !mr-4 !bg-black'>Update</Button>
            <Button variant='outlined' className='!mt-4' onClick={() => handleCloseUpdateDialog()}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate