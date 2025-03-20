import { createContext, useContext, useState, useCallback } from "react";
import {
  createCategoryRequest,
  getCategoriesRequest,
  getCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "../api/category";

const CategoryContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("usecategories must be used within CategoryProvider.");
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    try {
      const { data } = await getCategoriesRequest();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []); // 👈 useCallback evita que cambie en cada render

  const getCategory = async (id) => {
    try {
      const { data } = await getCategoryRequest(id);
      return data;
    } catch (error) {
      console.error("Error fetching Category:", error);
    }
  };

  const createCategory = async (category) => {
    try {
      const { data } = await createCategoryRequest(category);
      setCategories([...categories, data]);
    } catch (error) {
      console.error("Error creating Category:", error);
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const { data } = await updateCategoryRequest(id, updatedCategory);
      setCategories(categories.map((category) => (category.id === id ? data : category)));
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await deleteCategoryRequest(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting Category:", error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
