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

  const getProducts = async () => {
    try {
      const { data } = await getProductsRequest();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProduct = async (id) => {
    try {
      const { data } = await getProductRequest(id);
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const createProduct = async (product) => {
    try {
      const { data } = await createProductRequest(product);
      setProducts([...products, data]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const { data } = await updateProductRequest(id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? data : product))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
