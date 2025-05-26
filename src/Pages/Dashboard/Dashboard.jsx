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