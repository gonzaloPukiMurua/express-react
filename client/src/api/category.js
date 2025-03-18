import axios from "./axios";

export const createCategoryRequest = (category) => axios.post(`/category`, category);
export const getCategoriesRequest = () => axios.get(`/category`);
export const getCategoryRequest = (id) => axios.get(`/category/${id}`);
export const updateCategoryRequest = (id, category) => axios.put(`/category/${id}`, category);
export const deleteCategoryRequest = (id) => axios.delete(`/category/${id}`);
