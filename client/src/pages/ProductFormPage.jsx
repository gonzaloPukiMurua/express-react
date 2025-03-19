import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { uploadImage } from "../api/file";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    font-weight: bold;
  }

  input {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    background-color: #535bf2;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

export function ProductFormPage() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const { getProduct, updateProduct, createProduct, productErrors, setProductErrors, setProducts } = useProducts();
  
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [id, setId] = useState(paramId || null);

  useEffect(() => {
    if (paramId) {
      const fetchProduct = async () => {
        const data = await getProduct(paramId);
        if (data) {
          setProduct(data);
          setId(paramId);
        }
      };
      fetchProduct();
    }
  }, [paramId, getProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type) && file.size <= 200 * 1024) {
      setImageFile(file);
    } else {
      alert("Please upload a valid image (JPG/PNG, max 200KB).");
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProductErrors([]); 

    try {
      let productId = id;

      if (!productId) {
        // 🚀 Crear producto y obtener su ID
        const createdProduct = await createProduct(product);
        if (!createdProduct) throw new Error("Error creating product.");
        productId = createdProduct.id;
        setId(productId);
        setProducts((prev) => [...prev, createdProduct]);
      } else {
        // 🛠 Actualizar producto
        await updateProduct(productId, product);
      }

      // 📸 Si hay imagen, subirla después de crear/actualizar
      if (imageFile) {
        await uploadImage(imageFile, productId);
      }

      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <FormContainer>
      <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>
      {productErrors.length > 0 && (
        <ErrorMessage>
          {productErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </ErrorMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} />
        <label>Precio:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} />
        <label>Stock:</label>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} />
        <label>Categoría:</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} />
        <label>Imagen (JPG o PNG, máx 200KB):</label>
        <input type="file" accept="image/jpeg,image/png" onChange={handleImageChange} />
        <button type="submit">Guardar</button>
      </Form>
    </FormContainer>
  );
}
