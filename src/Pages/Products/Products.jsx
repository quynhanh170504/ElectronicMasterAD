import React, { useEffect, useState } from 'react'
import { api, apiAuth } from '~/services/api';
// collapse
import { Collapse } from 'react-collapse';
//
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Products = () => {
  const [products, setProducts] = useState([
    {
      _id: "681426bb1a63c7d17d37f91d",
      name: "Tai Nghe Nhét Tai Có Dây Xiaomi Âm Thanh Sống Động, Jack 3.5mm - Hỗ Trợ Mic, Dùng Cho Học Tập, Giải Trí - Hàng Chính Hãng",
      electronicImgs: [
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151118/ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj.jpg",
          public_id: "ElectronicMaster/ElectronicImages/gtlfoj4yxrujpi4kp8yj",
          _id: "681426bb1a63c7d17d37f91e"
        },
        {
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1746151119/ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu.jpg",
          public_id: "ElectronicMaster/ElectronicImages/p3ixt1ocxbj37lsk8jmu",
          _id: "681426bb1a63c7d17d37f91f"
        }
      ],
      available: 100,
      mainCategory: "Tai Nghe Có Dây Nhét Tai",
      categories: [
        "Thiết Bị Số - Phụ Kiện Số",
        "Thiết Bị Âm Thanh và Phụ Kiện",
        "Tai Nghe Có Dây"
      ],
      description: "Tai Nghe Có Dây Âm Thanh Sống Động, Mic Đàm Thoại Rõ Nét",
      price: 99000,
      discount: 96030,
      quantitySold: 0,
      brandName: "PKCB",
      rating: 0,
      numReview: 0,
      specifications: [
        {
          name: "Content",
          attributes: [
            {
              code: "brand",
              name: "Thương hiệu",
              value: "PKCB",
              _id: "681426bb1a63c7d17d37f923"
            },
            {
              code: "brand_country",
              name: "Xuất xứ thương hiệu",
              value: "Việt Nam",
              _id: "681426bb1a63c7d17d37f924"
            },
            {
              code: "origin",
              name: "Xuất xứ (Made in)",
              value: "Trung Quốc",
              _id: "681426bb1a63c7d17d37f925"
            }
          ],
          _id: "681426bb1a63c7d17d37f922"
        },
        {
          name: "Operation",
          attributes: [
            {
              code: "is_warranty_applied",
              name: "Sản phẩm có được bảo hành không?",
              value: "Không",
              _id: "681426bb1a63c7d17d37f927"
            }
          ],
          _id: "681426bb1a63c7d17d37f926"
        }
      ],
      publishDate: "2025-05-02T01:58:19.428+00:00",
      createdAt: "2025-05-02T01:58:19.434+00:00",
      updatedAt: "2025-05-02T01:58:19.434+00:00",
      __v: 0
    },
  ])
  const [currProdName, setCurrProdName] = useState('');
  const [currProdImg, setCurrProdImg] = useState([]);
  const [currProdAvailable, setCurrProdAvailable] = useState(0);
  const [currProdMainCategory, setCurrProdMainCategory] = useState('');
  const [currProdCategories, setCurrProdCategories] = useState([]);
  const [currProdPrice, setCurrProdPrice] = useState(0);
  const [currProdQuantitySold, setCurrProdQuantitySold] = useState(0);
  const [currProdBrandName, setCurrProdBrandName] = useState('');
  const [currProdPublishedDate, setCurrProdPublishedDate] = useState('');
  const [currProdDescription, setCurrProdDescription] = useState('');
  const [currProdSpecifications, setCurrProdSpecifications] = useState([]);
  const [currProdDiscount, setCurrProdDiscount] = useState(0);
  const [currProdRating, setCurrProdRating] = useState(0);
  const [currProdNumReview, setCurrProdNumReview] = useState(0);
  const [currProdFollowers, setCurrProdFollowers] = useState(0);
  const [currProdId, setCurrProdId] = useState('');

  const [productViewerIndex, setProductViewerIndex] = useState(null);
  const isOpenProductView = (index) => {
    if (productViewerIndex === index) setProductViewerIndex(null)
    else {
      setProductViewerIndex(index)
      // api.get(`/user/displayData/electronic/${index}`).then(res => {
      //   console.log('Product details:', res.data);
      //   setCurrProdName(res.data.data.name);
      //   setCurrProdImg(res.data.data.electronicImgs);
      //   setCurrProdAvailable(res.data.data.available);
      //   setCurrProdMainCategory(res.data.data.mainCategory);
      //   setCurrProdCategories(res.data.data.categories);
      //   setCurrProdPrice(res.data.data.price);
      //   setCurrProdQuantitySold(res.data.data.quantitySold);
      //   setCurrProdBrandName(res.data.data.brandName);
      //   setCurrProdPublishedDate(res.data.data.publishDate);
      //   setCurrProdDescription(res.data.description);
      //   // setCurrProdSpecifications(res.data.specifications);
      //   setCurrProdDiscount(res.data.data.discount);
      //   setCurrProdRating(res.data.data.rating);
      //   setCurrProdNumReview(res.data.data.numReview);
      //   setCurrProdFollowers(res.data.data.followers);
      //   setCurrProdId(res.data.data._id)
      // })
    }
  }

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const handleOpenUpdateDialog = (index) => {
    setOpenUpdateDialog(true);
    setCurrProdName(products[index].name);
    setCurrProdImg(products[index].electronicImgs);
    setCurrProdAvailable(products[index].available);
    setCurrProdMainCategory(products[index].mainCategory);
    setCurrProdCategories(products[index].categories);
    setCurrProdPrice(products[index].price);
    setCurrProdQuantitySold(products[index].quantitySold);
    setCurrProdBrandName(products[index].brandName);
    setCurrProdPublishedDate(products[index].publishDate);
    setCurrProdDescription(products[index].description);
    // setCurrProdSpecifications(products[index].specifications);
    setCurrProdDiscount(products[index].discount);
    setCurrProdRating(products[index].rating);
    setCurrProdNumReview(products[index].numReview);
    setCurrProdFollowers(products[index].followers);
    setCurrProdId(products[index]._id)
    console.log('Product details:', products[index]);
  }
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {
    console.log('Search:', keyword);
    api.get(`/user/displayData/search/electronic?keyword=${keyword}&sortBy=publishDate&sortOrder=desc&page=1&limit=10`).then(res => {
      console.log('Search result:', res.data);
      setProducts(res.data.data);
    }).catch(err => {
      console.error('Error fetching products:', err);
    })
  }
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);
  useEffect(() => {
    apiAuth.get('/admin/electronic?page=1&limit=10').then(res => {
      console.log('Products:', res.data);
      setProducts(res.data.electronics);
      setTotalPage(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.currentPage);
      setNextPage(res.data.pagination.nextPage);
    })
  }, [])
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
        <div className='py-3'>
          <h2 className='py-3 px-3 font-[600] text-[20px]'>Recent Products</h2>
        </div>
        <div className='py-3'>
          <input
            placeholder='Search by name and enter'
            className='ml-1 border p-3'
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                // handle search here
                handleSearch()
              }
            }}
          />
          <br />
          <Button variant="outlined" className='!m-1' onClick={() => handleSearch()}>Search</Button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 dark:text-white dark:bg-gray-800 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 border">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                ElectronicImgs
              </th>
              <th scope="col" className="px-6 py-3 border">
                Available
              </th>
              <th scope="col" className="px-6 py-3 border">
                Main Category
              </th>
              <th scope="col" className="px-6 py-3 border">
                Categories
              </th>
              <th scope="col" className="px-6 py-3 border">
                Price
              </th>
              <th scope="col" className="px-6 py-3 border">
                Quantity Sold
              </th>
              <th scope="col" className="px-6 py-3 border">
                Brand Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                Published Date
              </th>
              <th scope="col" className="px-6 py-3 border">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => (
                <>
                  <tr className="border-b border-gray-200 dark:text-white dark:bg-gray-800" index={product.orderid} onClick={() => handleOpenUpdateDialog(index)}>
                    <th scope="row" className="dark:text-white dark:bg-gray-800 px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-l border-[rgba(0,0,0,0.2)]">
                      {product.name}
                    </th>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)] grid grid-cols-2 gap-2">
                      {product.electronicImgs.map((ig, index) => {
                        return <>
                          <a href={ig.url} className='underline cursor-pointer' target='_blank' key={index}>
                            <img src={ig.url} alt="" className='w-[50px] h-[50px] object-cover' />
                          </a>
                          <br />
                        </>
                      })}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.available}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.mainCategory}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.categories.map(cate => {
                        return <p>{cate}</p>
                      })}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.quantitySold}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.brandName}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)]">
                      {product.publishDate}
                    </td>
                    <td className="px-6 py-4 border-l border-r border-[rgba(0,0,0,0.2)]">
                      <p href="#" className="font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => isOpenProductView(product._id)}>{productViewerIndex === product._id ? 'Close' : 'View'}</p>
                    </td>
                  </tr>
                  <Dialog
                    fullScreen
                    open={openUpdateDialog}
                    onClose={handleCloseUpdateDialog}
                    TransitionComponent={Transition}
                  >
                    <AppBar sx={{ position: 'relative', backgroundColor: '#000' }}>
                      <Toolbar>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleCloseUpdateDialog}
                          aria-label="close"
                        >
                          <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                          Update {currProdName}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleCloseUpdateDialog}>
                          update
                        </Button>
                      </Toolbar>
                    </AppBar>
                    <div className='w-full p-4 border-l border-r border-[rgba(0,0,0,0.2)]'>
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="Name"
                          variant="standard"
                          className="!w-full dark:bg-gray-800"
                          multiline
                          value={currProdName}
                          onChange={(e) =>
                            setCurrProdName(e.target.value)
                          }
                        />
                        <TextField
                          label="Available"
                          variant="standard"
                          className="!w-full dark:bg-gray-800"
                          type="number"
                          value={currProdAvailable}
                          onChange={(e) =>
                            setCurrProdAvailable(e.target.value)
                          }
                        />
                        <TextField
                          label="Price"
                          variant="standard"
                          className="!w-full dark:bg-gray-800"
                          type="number"
                          value={currProdPrice}
                          onChange={(e) =>
                            setCurrProdPrice(e.target.value)
                          }
                        />
                        <TextField
                          label="Brand Name"
                          variant="standard"
                          className="!w-full dark:bg-gray-800"
                          value={currProdBrandName}
                          onChange={(e) =>
                            setCurrProdBrandName(e.target.value)
                          }
                        />
                      </div>
                      <TextField
                        label="Description"
                        variant="standard"
                        className='!w-full dark:bg-gray-800'
                        multiline
                        value={currProdDescription}
                        onChange={e => setCurrProdDescription(e.target.value)}
                      />
                      <Button variant='contained' className='!mt-4 !mr-4 !bg-black'>Update</Button>
                      <Button variant='outlined' className='!mt-4' onClick={() => handleCloseUpdateDialog()}>Close</Button>
                    </div>
                  </Dialog>
                </>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products