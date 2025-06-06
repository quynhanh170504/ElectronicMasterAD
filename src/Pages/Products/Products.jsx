import React, { useEffect, useState } from 'react'
import { api, apiAuth } from '~/services/api';
//
import { FiEdit2, FiTrash2, FiPlus, FiChevronRight, FiArrowLeft, FiStar } from 'react-icons/fi';
import { Button } from '@mui/material';
import Slide from '@mui/material/Slide';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router';
import ElectronicEndpoint from '~/services/electronic.endpoint';
import LoadingScreen from '~/Components/LoadingScreen';

const Products = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = (productId) => {
    setLoading(true);
    apiAuth.delete(ElectronicEndpoint.deleteElectronic(productId)).then(res => {
      alert('Product deleted successfully');
      console.log('Product deleted:', res.data);
      fetchData(currentPage);
    }).catch(err => {
      console.error('Error deleting product:', err);
    }).finally(() => {
      setLoading(false);
    });
  }
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const handleSearch = (page) => {
    setLoading(true)
    setCurrentPage(page);
    if (keyword === '') {
      setLoading(false)
      fetchData(1);
      return;
    }
    setLoading(true)
    console.log('Search:', keyword);
    api.get(`/user/displayData/search/electronic?keyword=${keyword}&sortBy=publishDate&sortOrder=desc&page=${page}&limit=10`).then(res => {
      console.log('Search result:', res.data);
      setProducts(res.data.data);
      setTotalPage(res.data.totalPages);
    }).catch(err => {
      console.error('Error fetching products:', err);
    }).finally(() => setLoading(false))
  }
  const [totalPage, setTotalPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);

  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    if (isSearching === false) fetchData(value);
    else handleSearch(value);
  }
  const fetchData = (page) => {
    setLoading(true)
    apiAuth.get(`/admin/electronic?page=${page}&limit=10`).then(res => {
      setProducts(res.data.electronics);
      setTotalPage(res.data.pagination.totalPages);
      setNextPage(res.data.pagination.nextPage);
    }).catch(err => console.log(err)).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData(1);
  }, [])

  const handleSubmit = () => {

  }

  const handleCoverChange = () => {

  }

  const handleInputChange = () => {

  }

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
          <Button variant="outlined" className='!m-1' onClick={() => handleSearch(1)}>Search</Button>
        </div>
        <div className='flex justify-start p-5'>
          <Pagination count={totalPage} page={currentPage} onChange={handleChangePage} variant="outlined" />
        </div>
        {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                  <tr className="border-b border-gray-200 dark:text-white dark:bg-gray-800" index={product.orderid}>
                    <td scope="row" className="dark:text-white dark:bg-gray-800 px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-l border-[rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#f1f1f1]" onClick={() => {
                      navigate(`/update`, {
                        state: {
                          id: product._id,
                        }
                      })
                    }}>
                      {product.name}
                    </td>
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)] grid grid-cols-4 gap-2 !w-[500px]">
                      {product.electronicImgs.map((ig, index) => {
                        return <>
                          <a href={ig.url} className='underline cursor-pointer' target='_blank' key={index}>
                            <img src={ig.url} alt="" className='w-[70px] h-[70px] object-cover' />
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
                    <td className="px-6 py-4 border-l border-[rgba(0,0,0,0.2)] flex flex-col !w-[500px]">
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
                      <p href="#" className="font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => handleDeleteProduct(product._id)}>Delete</p>
                    </td>
                  </tr>
                </>
              ))
            }
          </tbody>
        </table> */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-y-auto max-h-[400px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity sold</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name.slice(0, 40)}{product.name.length > 40 && "..."}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {product.available}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {product.categories.map(cate => {
                          return <p>{cate}</p>
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {product.quantitySold}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {product.brandName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => {
                              navigate(`/update`, {
                                state: {
                                  id: product._id,
                                }
                              })
                            }}
                            className="text-teal-600 hover:text-teal-800 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div >
      {loading && <LoadingScreen />}
    </>
  )
}

export default Products