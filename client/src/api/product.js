import axios from "./axios";

export const createProductRequest = (product) => axios.post(`/products`, product);
export const getProductsRequest = () => axios.get(`/products`);
export const getProductRequest = (id) => axios.get(`/products/${id}`);
export const updateProductRequest = (id, product) => axios.put(`/products/${id}`, product);
export const deleteProductRequest = (id) => axios.delete(`/products/${id}`);
