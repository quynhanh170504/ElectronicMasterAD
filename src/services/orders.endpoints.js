const OrdersEndpoint = {
  getOrdersByStatus: (status) => `/admin/manageOrder?status=${status}`,
  updateOrderStatus: `/admin/manageOrder`,
}
export default OrdersEndpoint;