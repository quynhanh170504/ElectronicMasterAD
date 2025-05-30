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
import LoadingScreen from '~/Components/LoadingScreen'
//
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

  const [dashboardStatistics, setDashboardStatistics] = useState({})
  const [deliveredOrdersByMonth, setDeliveredOrdersByMonth] = useState([]);

  const [lineChartData, setLineChartData] = useState({
    totalRevenue: 1
  })

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
  const handleChangeSelectedYear = (event) => {
    setSelectedYear(event.target.value);
    fetchDashboardStatistics(event.target.value);
  };
  const handleChangeOrderStatus = (event) => {
    setOrderStatus(event.target.value);
    fetchOrders(event.target.value);
  };
  const year = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [orderViewerIndex, setOrderViewerIndex] = useState(null);

  const [loading, setLoading] = useState(false)

  const isOpenOrderView = (index) => {
    if (orderViewerIndex === index) setOrderViewerIndex(null)
    else setOrderViewerIndex(index)
  }
  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };
  const fetchDashboardStatistics = (year) => {
    apiAuth.get(`/admin/dashboard?year=${year}`).then(res => {
      console.log("Dashboard Statistics: ", res.data.data)
      setDeliveredOrdersByMonth(res.data.data.deliveredOrdersByMonth)
      setDashboardStatistics(res.data.data)
      // Process and set the statistics data as needed
    })
  }
  const fetchOrders = async (status) => {
    try {
      const response = await apiAuth.get(OrdersEndpoint.getOrdersByStatus(status || orderStatus));
      console.log("Fetched Orders: ", response.data.data);
      setOrders(response.data.data);
    }
    catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error appropriately, e.g., show a notification or alert
    }
  }
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setLoading(true);
    apiAuth.patch(OrdersEndpoint.updateOrderStatus, {
      orderID: orderId,
      status: newStatus
    }).then(res => {
      if (res.data.success === true) {
        console.log("Order Status Updated: ", res.data);
        // Optionally, refetch orders or update the state to reflect the change
      } else {
        alert("Failed to update order status: " + res.data.message);
      }
      fetchOrders(orderStatus);
    }).catch(err => {
      alert("Error updating order status: " + err.response?.data?.message || err.message);
      console.error("Error updating order status:", err);
      // Handle error appropriately, e.g., show a notification or alert
    }).finally(() => {
      setLoading(false);
    })
  }
  useEffect(() => {
    if (user == null) {
      // Redirect to login page if user is not authenticated
      navigate('/login')
    }
    fetchOrders("pending")
    fetchDashboardStatistics(year)
  }, [])
  return (
    <>
      <div className='w-full p-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 rounded-md'>
        <div className='info'>
          <h1 className='font-[600] text-[50px] leading-15 mb-3'>
            Good morning,<br /> {user.username} - sama &#128075;
          </h1>
          <p>Here's what happening on your store today. See the statistics at once.</p>
          <button
            // onClick={handleSubmit}
            // disabled={loading}
            onClick={() => navigate('products/upload')}
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
        <div className='justify-center items-center flex w-full flex flex-1 flex-col'>
          <div class="cursor-pointer group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
            <img src={user?.avatar?.url === '' ? avatar : user?.avatar?.url} alt="avartar"
              class="object-cover w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500" />
            <div class="z-10 group-hover:-translate-y-10 transition-all duration-500">
              <span class="text-2xl font-semibold dark:text-black">{user.username}</span>
              <p>ADMIN</p>
            </div>
            <a class="px-4 py-1 text-slate-50 rounded-md z-10 transition-all" href="#">
            </a>
          </div>
          {/* 4 social button */}
          <div class="flex items-center gap-4">
            <div class="social-button instagram">
              <button class="relative w-12 h-12 rounded-full group cursor-pointer">
                <div
                  class="floater w-full h-full absolute top-0 left-0 bg-violet-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                ></div>
                <div
                  class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-violet-400 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      class="group-hover:fill-[#171543] fill-white duration-300"
                      d="M21.94 6.46809C21.8884 5.2991 21.6994 4.49551 21.4285 3.79911C21.1492 3.05994 20.7194 2.39818 20.1564 1.84802C19.6062 1.28932 18.9401 0.855163 18.2094 0.580194C17.5091 0.309437 16.7096 0.120336 15.5407 0.0688497C14.363 0.0128932 13.9891 0 11.0022 0C8.01527 0 7.64141 0.0128932 6.46808 0.064466C5.29914 0.116039 4.49551 0.305225 3.79932 0.57581C3.05994 0.855163 2.39818 1.28494 1.84802 1.84802C1.28932 2.39813 0.855377 3.06428 0.580193 3.7949C0.309437 4.49551 0.120379 5.2948 0.0688496 6.4637C0.0129362 7.64141 0 8.01527 0 11.0022C0 13.9891 0.0129362 14.363 0.0644659 15.5363C0.116039 16.7053 0.305225 17.5089 0.576025 18.2053C0.855377 18.9444 1.28932 19.6062 1.84802 20.1564C2.39818 20.7151 3.06432 21.1492 3.79494 21.4242C4.49547 21.6949 5.29476 21.884 6.46391 21.9355C7.63702 21.9873 8.0111 22 10.998 22C13.9849 22 14.3588 21.9873 15.5321 21.9355C16.7011 21.884 17.5047 21.695 18.2009 21.4242C18.9321 21.1415 19.5961 20.7091 20.1505 20.1548C20.7048 19.6005 21.1373 18.9365 21.42 18.2053C21.6906 17.5047 21.8798 16.7052 21.9314 15.5363C21.9829 14.363 21.9958 13.9891 21.9958 11.0022C21.9958 8.01527 21.9914 7.64137 21.94 6.46809ZM19.9588 15.4503C19.9114 16.5248 19.731 17.105 19.5805 17.4918C19.2109 18.4502 18.4502 19.2109 17.4918 19.5805C17.105 19.731 16.5206 19.9114 15.4503 19.9586C14.29 20.0103 13.942 20.023 11.0066 20.023C8.07118 20.023 7.71881 20.0103 6.56259 19.9586C5.48816 19.9114 4.90796 19.731 4.52117 19.5805C4.04425 19.4043 3.61014 19.1249 3.25772 18.7596C2.89242 18.4029 2.61306 17.9731 2.43677 17.4961C2.28635 17.1094 2.10589 16.5248 2.05874 15.4547C2.007 14.2943 1.99428 13.9461 1.99428 11.0107C1.99428 8.07535 2.007 7.72298 2.05874 6.56698C2.10589 5.49254 2.28635 4.91235 2.43677 4.52555C2.61306 4.04842 2.89241 3.61439 3.26211 3.26189C3.61865 2.89658 4.04842 2.61723 4.52555 2.44115C4.91235 2.29073 5.49692 2.11023 6.56697 2.06291C7.72736 2.01134 8.07556 1.99844 11.0107 1.99844C13.9505 1.99844 14.2985 2.01134 15.4547 2.06291C16.5292 2.11027 17.1093 2.29069 17.4961 2.44111C17.9731 2.61723 18.4072 2.89658 18.7596 3.26189C19.1249 3.61865 19.4042 4.04842 19.5805 4.52555C19.731 4.91235 19.9114 5.49671 19.9587 6.56698C20.0103 7.72736 20.0232 8.07535 20.0232 11.0107C20.0232 13.9461 20.0104 14.29 19.9588 15.4503Z"
                    ></path>
                    <path
                      class="group-hover:fill-[#171543] fill-white duration-300"
                      d="M11.0026 5.35054C7.88252 5.35054 5.35107 7.88182 5.35107 11.0021C5.35107 14.1223 7.88252 16.6536 11.0026 16.6536C14.1227 16.6536 16.6541 14.1223 16.6541 11.0021C16.6541 7.88182 14.1227 5.35054 11.0026 5.35054ZM11.0026 14.668C8.97844 14.668 7.33654 13.0264 7.33654 11.0021C7.33654 8.97774 8.97844 7.33609 11.0025 7.33609C13.0269 7.33609 14.6685 8.97774 14.6685 11.0021C14.6685 13.0264 13.0268 14.668 11.0026 14.668ZM18.1971 5.12706C18.1971 5.85569 17.6063 6.44646 16.8775 6.44646C16.1489 6.44646 15.5581 5.85569 15.5581 5.12706C15.5581 4.39833 16.1489 3.80774 16.8775 3.80774C17.6063 3.80774 18.1971 4.39829 18.1971 5.12706Z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div class="social-button github">
              <button class="relative w-12 h-12 rounded-full group cursor-pointer" onClick={() => window.open("https://github.com/quynhanh170504", "blank")}>
                <div
                  class="floater w-full h-full absolute top-0 left-0 bg-black rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                ></div>
                <div
                  class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-black rounded-full"
                >
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="group-hover:fill-[#171543] fill-white duration-300"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.481.5.092.683-.217.683-.481 0-.237-.009-.866-.013-1.699-2.782.603-3.37-1.338-3.37-1.338-.454-1.15-1.11-1.458-1.11-1.458-.906-.619.069-.606.069-.606 1.002.071 1.527 1.03 1.527 1.03.89 1.529 2.34 1.087 2.911.831.091-.645.348-1.087.634-1.338-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.986 1.028-2.682-.103-.252-.446-1.268.098-2.642 0 0 .837-.268 2.75 1.024a9.563 9.563 0 012.496-.335 9.58 9.58 0 012.496.335c1.913-1.292 2.75-1.024 2.75-1.024.544 1.374.202 2.39.1 2.642.64.696 1.027 1.592 1.027 2.682 0 3.839-2.338 4.685-4.567 4.933.358.309.678.916.678 1.847 0 1.334-.012 2.412-.012 2.74 0 .267.18.577.688.481A12.01 12.01 0 0022 12c0-5.523-4.477-10-10-10z"
                      fill="#FFFFFF"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div class="social-button linkedin">
              <button class="relative w-12 h-12 rounded-full group cursor-pointer">
                <div
                  class="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                ></div>
                <div
                  class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full"
                >
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="group-hover:fill-[#171543] fill-white duration-300"
                      d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8.5,19H6V10h2.5V19z M7.3,9 h-0.1C6.4,9,6,8.6,6,8.1V7.9c0-0.5,0.4-0.9,0.9-0.9h0.1C7.6,7,8,7.4,8,7.9v0.1C8,8.6,7.6,9,7.3,9z M19,19h-2.5v-4.9 c0-1.2-0.4-2-1.4-2c-0.8,0-1.3,0.6-1.5,1.2h-0.1V19H10V10h2.3v1.3h0C12.7,10.7,14,9.9,15.5,9.9c2.1,0,3.5,1.4,3.5,3.8V19z"
                      fill="#FFFFFF"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div class="social-button gmail">
              <button class="relative w-12 h-12 rounded-full group cursor-pointer">
                <div
                  class="floater w-full h-full absolute top-0 left-0 bg-red-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                ></div>
                <div
                  class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-red-400 rounded-full"
                >
                  <svg
                    height="32"
                    width="32"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="group-hover:fill-[#171543] fill-white duration-300"
                      d="M28 5H4c-1.104 0-2 .896-2 2v18c0 1.104.896 2 2 2h24c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2zm0 4.879L16 18 4 9.879V7l12 8 12-8v2.879zM4 23V11.885l11.446 7.63c.269.18.594.274.921.274s.652-.094.92-.274L28 11.885V23H4z"
                      fill="#FFFFFF"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      <DashboardBoxes
        NewOrders={dashboardStatistics?.deliveredOrdersToday?.totalOrders}
        TodayRevenue={dashboardStatistics?.deliveredOrdersToday?.totalRevenue}
        TotalRevenue={dashboardStatistics?.deliveredOrdersForYear?.totalRevenue}
        TotalProduct={dashboardStatistics?.totalElectronics} />
      <div className='py-3 px-3 flex items-center gap-3'>
        {/* ['pending','canceled','rejected','confirmed','processing','in transit','delivered'] */}
        <FormControl className='w-[200px] dark:text-white'>
          <InputLabel id="demo-simple-select-label" className='dark:!text-white'>Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedYear}
            label="Order Status"
            onChange={handleChangeSelectedYear}
            className='dark:!bg-gray-800 dark:!text-white'
          >
            <MenuItem value={year} selected>{year}</MenuItem>
            <MenuItem value={year - 1}>{year - 1}</MenuItem>
            <MenuItem value={year - 2}>{year - 2}</MenuItem>
            <MenuItem value={year - 3}>{year - 3}</MenuItem>
            <MenuItem value={year - 4}>{year - 4}</MenuItem>
            <MenuItem value={year - 5}>{year - 5}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ResponsiveContainer width="100%" height={300} className='mt-10'>
        <LineChart
          width={500}
          height={300}
          data={deliveredOrdersByMonth}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="totalRevenue" />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line type="monotone" dataKey="totalRevenue" strokeOpacity={lineChartData.totalRevenue} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
        <div className='py-3'>
          <h2 className='py-3 px-3 font-[600] text-[20px]'>Recent Orders</h2>
        </div>
        <div className='py-3 px-3 flex items-center gap-3'>
          {/* ['pending','canceled','rejected','confirmed','processing','in transit','delivered'] */}
          <FormControl>
            <InputLabel id="demo-simple-select-label" className='dark:!text-white'>Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderStatus}
              label="Order Status"
              onChange={handleChangeOrderStatus}
              className='dark:!bg-gray-800 dark:!text-white'
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
              <th scope="col" className="px-6 py-3">Items</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Status</th>
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
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <FormControl>
                      <InputLabel id="demo-simple-select-label" className='dark:!text-white'>Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={orderStatus}
                        label="Order Status"
                        onChange={(event) => {
                          console.log("Order ID: ", order._id, " New Status: ", event.target.value);
                          handleUpdateOrderStatus(order._id, event.target.value);
                        }}
                        className='dark:!bg-gray-800 dark:!text-white'
                      >
                        <MenuItem value={order.status} selected disabled>{order.status}</MenuItem>
                        <MenuItem value={"pending"}>pending</MenuItem>
                        <MenuItem value={"canceled"}>canceled</MenuItem>
                        <MenuItem value={"rejected"}>rejected</MenuItem>
                        <MenuItem value={"confirmed"}>confirmed</MenuItem>
                        <MenuItem value={"processing"}>processing</MenuItem>
                        <MenuItem value={"in transit"}>in transit</MenuItem>
                        <MenuItem value={"delivered"}>delivered</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
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
      {loading && <LoadingScreen />}
    </>
  )
}

export default Dashboard