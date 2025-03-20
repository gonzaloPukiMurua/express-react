import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import styled from "styled-components";

const ProductContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;

export function ProductPage() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id, getProduct]);
  
  useEffect(() => {
    console.log("Producto actualizado:", product);
  }, [product]);

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <ProductContainer>
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Categoría:</strong> {typeof product.category === "string" ? product.category : JSON.stringify(product.category)}</p>
      <p><strong>Descripción:</strong> {product.description || "Sin descripción"}</p>
    </ProductContainer>
  );
}
