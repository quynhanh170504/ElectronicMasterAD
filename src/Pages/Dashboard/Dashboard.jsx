import React, { useState, useEffect } from 'react'
import DashboardBoxes from '~/Components/DashboardBoxes/DashboardBoxes.jsx'
import CustomButton from '~/Components/Button/CustomButton.jsx'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { logout } from '~/redux/userSlice.js'
import { api, apiAuth } from '~/services/api'
// Icons
import { FaPlus } from "react-icons/fa6";
// Img
import avatar from "../../assets/default_avatar.jpg"
// collapse
import { Collapse } from 'react-collapse';
import { Link } from 'react-router';
// charts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const token = useSelector(state => state.user.token)
  console.log("check user: ", user)
  console.log("check token: ", token)

  const [products, setProducts] = useState([
    {
      orderid: 2121,
      customer: {
        avatarurl: "",
        username: "John Doe",
        email: "johndoeqq3@gmail.com"
      },
      status: "Pending",
      products: ['rtc34', 'esp32', 'mqtt'],
      items: 1210,
      price: "$2999",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
    },
    {
      orderid: 5542,
      customer: {
        avatarurl: "",
        username: "John Doe",
        email: "johndoeqq3@gmail.com"
      },
      status: "Pending",
      products: ['rtc34', 'esp32', 'mqtt'],
      items: 7715,
      price: "$2999",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
    },
    {
      orderid: 3313,
      customer: {
        avatarurl: "",
        username: "John Doe",
        email: "johndoeqq3@gmail.com"
      },
      status: "Pending",
      products: ['rtc34', 'esp32', 'mqtt'],
      items: 5627,
      price: "$2999",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
    },
    {
      orderid: 9884,
      customer: {
        avatarurl: "",
        username: "John Doe",
        email: "johndoeqq3@gmail.com"
      },
      status: "Success",
      products: ['rtc34', 'esp32', 'mqtt'],
      items: 11,
      price: "$2999",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
    }
  ])
  const [orderViewerIndex, setOrderViewerIndex] = useState(null);

  const [loading, setLoading] = useState(false)

  const isOpenOrderView = (index) => {
    if (orderViewerIndex === index) setOrderViewerIndex(null)
    else setOrderViewerIndex(index)
  }
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const [opacity, setOpacity] = React.useState({
    uv: 1,
    pv: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };
  useEffect(() => {
    if (user == null) {
      // Redirect to login page if user is not authenticated
      navigate('/login')
    }
  })
  return (
    <>
      <div className='w-full p-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 rounded-md'>
        <div className='info'>
          <h1 className='font-[600] text-[50px] leading-15 mb-3'>
            Good morning,<br /> Cameron &#128075;
          </h1>
          <p>Here's what happening on your store today. See the statistics at once.</p>
          <button
            // onClick={handleSubmit}
            // disabled={loading}
            onClick={() => navigate('/products/upload')}
            className="group relative flex justify-center py-3 px-4 border-2 border-black text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Add product'
            )}
          </button>
        </div>
      </div>

      <DashboardBoxes />
      <ResponsiveContainer width="100%" height={300} className='mt-10'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line type="monotone" dataKey="pv" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" strokeOpacity={opacity.uv} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
        <div className='py-3'>
          <h2 className='py-3 px-3 font-[600] text-[20px]'>Recent Orders</h2>
        </div>
        {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Items
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Modified
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => (
                <>
                  <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      #{product.orderid}
                    </th>
                    <td className="px-6 py-4">
                      <div className='flex items-center gap-2'>
                        <img src={product.customer.avatarurl !== '' ? product.customer.avatarurl : avatar} alt="" className='w-[50px] h-[50px] rounded-full' />
                        <div className='info'>
                          <h3 className='font-[600]'>{product.customer.username}</h3>
                          <p className='text-[14px]'>{product.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.items}
                    </td>
                    <td className="px-6 py-4">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      {product.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      {product.updatedAt}
                    </td>
                    <td className="px-6 py-4">
                      <p href="#" className="font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => isOpenOrderView(product.orderid)}>View</p>
                    </td>
                  </tr>
                  <Collapse isOpened={orderViewerIndex === product.orderid ? true : false}>
                    <div className='mx-5'>
                      <h2 className='font-bold'>List products</h2>
                      <ul className='w-full'>
                        {product.products.map((prod, index) => {
                          return <li className='w-full' key={index}>
                            - {prod}
                          </li>
                        })}
                      </ul>
                    </div>
                    <div className='mx-5'>
                      <h2 className='font-bold'>Status: <span className={product.status === 'Pending' ? `text-yellow-600` : 'text-green-700'}>{product.status}</span></h2>
                    </div>
                  </Collapse>
                </>
              ))
            }
          </tbody>
        </table> */}
      </div>

    </>
  )
}

export default Dashboard