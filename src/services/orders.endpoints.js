const OrdersEndpoint = {
  getOrdersByStatus: (status) => `/admin/manageOrder?status=${status}`
}
export default OrdersEndpoint;