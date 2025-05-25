import React, { useState, useEffect } from 'react'
import DashboardBoxes from '~/Components/DashboardBoxes/DashboardBoxes.jsx'
import CustomButton from '~/Components/Button/CustomButton.jsx'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//
import { logout } from '~/redux/userSlice.js'
import { api, apiAuth } from '~/services/api'
// Endpoints
import OrdersEndpoint from '~/services/orders.endpoints.js'
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
  const [orders, setOrders] = useState([
    {
      address: {
        address: "123 Main St, Springfield, USA",
        name: "",
        phone: ""
      },
      createdAt: "2023-10-01T12:00:00.000Z",
      listElectronics: [
        {
          electronicID: {
            discount: 0,
            electronicImgs: [
              {
                public_id: "default_electronic_image",
                url: "https://example.com/default_image.jpg",
                _id: "default_image_id"
              }
            ],
            name: "Sample Electronic",
            price: 100,
            rating: 4.5,
            _id: "sample_electronic_id",
          },
          quantity: 1,
          _id: "0"
        }
      ],
      note: "Giao hang nhanh",
      paymentMethod: "direct",
      paymentStatus: "pending",
      quantity: 1,
      status: "pending",
      time: "2023-10-01T12:00:00.000Z",
      totalPrice: 100,
      updatedAt: "2023-10-01T12:00:00.000Z",
      _id: "0",
      userID: {
        email: "",
        name: "",
        phone: "",
        _id: "",
      },
      __v: 0
    }
  ])
  const [orderStatus, setOrderStatus] = useState('pending'); //  ['pending','canceled','rejected','confirmed','processing','in transit','delivered']
  const handleChangeOrderStatus = (event) => {
    setOrderStatus(event.target.value);
    fetchOrders(event.target.value);
  };
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
  const fetchOrders = async (status) => {
    try {
      const response = await apiAuth.get(OrdersEndpoint.getOrdersByStatus(status || orderStatus));
      setOrders(response.data.data);
      console.log("check orders: ", response.data)
    }
    catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error appropriately, e.g., show a notification or alert
    }
  }

  useEffect(() => {
    if (user == null) {
      // Redirect to login page if user is not authenticated
      navigate('/login')
    }
    fetchOrders("pending")
  }, [])
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
        <div className='py-3 px-3 flex items-center gap-3'>
          {/* ['pending','canceled','rejected','confirmed','processing','in transit','delivered'] */}
          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderStatus}
              label="Order Status"
              onChange={handleChangeOrderStatus}
            >
              <MenuItem value={'pending'} selected>Pending</MenuItem>
              <MenuItem value={"canceled"}>Canceled</MenuItem>
              <MenuItem value={"rejected"}>Rejected</MenuItem>
              <MenuItem value={"confirmed"}>Confirmed</MenuItem>
              <MenuItem value={"processing"}>Processing</MenuItem>
              <MenuItem value={"in transit"}>In Transit</MenuItem>
              <MenuItem value={"delivered"}>Delivered</MenuItem>
            </Select>
          </FormControl>
        </div>
        <table>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Items</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order._id}
                  </td>
                  <td className="px-6 py-4">
                    <div className='flex items-center gap-3'>
                      <img src={avatar} alt="Avatar" className='w-[50px] h-[50px] rounded-full' />
                      <div>
                        <p className='font-[600]'>{order?.userID?.name || "Unknown User"}</p>
                        <p className='text-[14px] text-gray-500'>{order?.userID?.email || "No Email"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.totalPrice}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Button variant="outlined" onClick={() => isOpenOrderView(index)}>
                      {orderViewerIndex === index ? "Hide" : "View"}
                    </Button>
                  </td>
                </tr>
                <Collapse isOpened={orderViewerIndex === index}>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td colSpan={7} className="px-6 py-4">
                      {/* Order details can be displayed here */}
                      <p>Order Details for {order._id}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={7} className="px-6 py-4">
                      {order.listElectronics.length > 0 ? (
                        <div className=''>
                          {order.listElectronics.map((item, idx) => (
                            <div key={idx} className='flex border p-3 rounded-md bg-white dark:bg-gray-800'>
                              <img src={item.electronicID.electronicImgs[0]?.url || "https://via.placeholder.com/150"} alt={item.electronicID.name} className='w-[150px] h-[150px] object-cover mb-2 rounded-md' />
                              <div>
                                <h3 className='font-semibold'>{item.electronicID.name}</h3>
                                <p>Price: {item.electronicID.price}</p>
                                <p>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No items in this order.</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={7} className="px-6 py-4">
                      <div className='flex flex-col gap-3'>
                        <p><strong>Address:</strong> {order.address?.address || "No Address"}</p>
                        <p><strong>Note:</strong> {order.note || "No Note"}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod || "No Payment Method"}</p>
                        <p><strong>Payment Status:</strong> {order.paymentStatus || "No Payment Status"}</p>
                        <p><strong>Total Price:</strong> {order.totalPrice || "No Total Price"}</p>
                      </div>
                    </td>
                  </tr>
                </Collapse>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Dashboard