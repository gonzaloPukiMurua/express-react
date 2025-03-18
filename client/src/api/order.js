import axios from "./axios";

export const createOrderRequest = (order) => axios.post(`orders`, order);
export const getOrdersRequest = (userId) => axios.get(`orders`, { params: { userId: userId } });
export const getOrderDetailRequest = (id) => axios.get(`orders/${id}`);
export const updateOrderRequest = (id, order) => axios.put(`orders/${id}`, order);
export const deleteOrderRequest = (id) => axios.delete(`orders/${id}`);
