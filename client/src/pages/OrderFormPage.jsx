import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsRequest } from "../api/product";
import { useOrders } from "../context/OrderContext"; // Importa el contexto de órdenes

export function OrderFormPage() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { user, userValidated } = useAuth();
  const { createOrder } = useOrders(); // Usa el método createOrder del contexto
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const onSubmit = async () => {
    console.log("Estoy en submit de order form.");
    console.log(user);
    const order = {
      userId: user.userId,
      products: selectedProducts.map((id) => ({ id })),
    };
    console.log("Esta es la order: ",order)

    try {
      await createOrder(order); // Llama al método del contexto
      navigate("/"); // Redirige al HomePage después de crear la orden
    } catch (error) {
      console.error("Error creando la orden:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProductsRequest();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const addProduct = (productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Order</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-lg font-semibold mb-2">Selected Products:</h2>
          <ul className="mb-4">
            {selectedProducts.map((productId, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{productId}</span>
                <button
                  type="button"
                  onClick={() => removeProduct(productId)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="btn-primary w-full mb-4"
          >
            Submit Order
          </button>
        </form>
        <h2 className="text-lg font-semibold mb-2">Available Products:</h2>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center mb-2"
            >
              <span>{product.name}</span>
              <button
                type="button"
                onClick={() => addProduct(product.id)}
                className="btn-secondary"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
