import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import styled from "styled-components";

const ProductsContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  a {
    color: #535bf2;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#535bf2")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.9;
  }
`;

export function ProductsPage() {
  const { products, getProducts, deleteProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await deleteProduct(id);
    }
  };

  return (
    <ProductsContainer>
      <h2>Lista de Productos</h2>
      {products.map((product) => (
        <ProductRow key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
          <span>${product.price}</span>
          <span>Stock: {product.stock}</span>
          <div>
            <Button onClick={() => navigate(`/update-product/${product.id}`)}>Editar</Button>
            <Button danger onClick={() => handleDelete(product.id)}>Eliminar</Button>
          </div>
        </ProductRow>
      ))}
    </ProductsContainer>
  );
}
