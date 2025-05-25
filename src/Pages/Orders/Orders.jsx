import React, { useState, useEffect } from 'react'
import { api, apiAuth } from '~/services/api'
import { useNavigate } from 'react-router'
import OrdersEndpoint from '~/services/orders.endpoints.js'
const Orders = () => {
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

  const [orderViewerIndex, setOrderViewerIndex] = useState(null);

  const [loading, setLoading] = useState(false)

  const isOpenOrderView = (index) => {
    if (orderViewerIndex === index) setOrderViewerIndex(null)
    else setOrderViewerIndex(index)
  }
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
        <div className='py-3'>
          <h2 className='py-3 px-3 font-[600] text-[20px]'>Recent Orders</h2>
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

export default Orders