import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  getProductsRequest,
  getProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../api/product";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider.");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productErrors, setProductErrors] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await getProductsRequest();
      setProducts(data);
      setProductErrors([]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductErrors(error.response?.data?.message || "Error fetching products");
    }
  };

  const getProduct = async (id) => {
    try {
      const { data } = await getProductRequest(id);
      setProductErrors([]);
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      setProductErrors(error.response?.data?.message || "Error fetching product");
    }
  };

  const createProduct = async (product) => {
    try {
      const { data } = await createProductRequest(product);
      setProducts([...products, data]);
      setProductErrors([]);
    } catch (error) {
      console.error("Error creating product:", error);
      setProductErrors(error.response?.data?.message || "Error creating product");
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const { data } = await updateProductRequest(id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? data : product))
      );
      setProductErrors([]);
    } catch (error) {
      console.error("Error updating product:", error);
      setProductErrors(error.response?.data?.message || "Error updating product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      setProducts(products.filter((product) => product.id !== id));
      setProductErrors([]);
    } catch (error) {
      console.error("Error deleting product:", error);
      setProductErrors(error.response?.data?.message || "Error deleting product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productErrors,
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        setProductErrors
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};