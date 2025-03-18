import { createContext, useContext, useState } from "react";
import {
  createOrderRequest,
  getOrdersRequest,
  getOrderDetailRequest,
  updateOrderRequest,
  deleteOrderRequest,
} from "../api/order";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider.");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async (userId) => {
    try {
      const { data } = await getOrdersRequest(userId);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getOrderDetail = async (id) => {
    try {
      const { data } = await getOrderDetailRequest(id);
      console.log("Estoy en getOrderdetail")
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  const createOrder = async (order) => {
    try {
      console.log("Estoy en OrderContext, la order es: ", order);
      const response = await createOrderRequest(order);
      console.log(response);
      const data = response.data;
      console.log("Estoy en createOrder: ", data);
      setOrders([...orders, data]);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const updateOrder = async (id, updatedOrder) => {
    try {
      const { data } = await updateOrderRequest(id, updatedOrder);
      setOrders(orders.map((order) => (order.id === id ? data : order)));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await deleteOrderRequest(id);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrders,
        getOrderDetail,
        createOrder,
        updateOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
