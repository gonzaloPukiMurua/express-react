import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

export function OrderDetailPage() {
  const { id } = useParams();
  const { getOrderDetail } = useOrders();
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (id) {
        const response = await getOrderDetail(id);

        setOrderDetail(response.order);
        console.log(response); // Asegúrate de que los datos tienen la estructura correcta
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (!orderDetail) {
    return <p>Cargando detalles de la orden...</p>;
  }

  const products = orderDetail?.detail?.products || []; // Asegúrate de que products exista

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle de la Orden</h1>
      <p>
        <strong>ID:</strong> {orderDetail.id}
      </p>
      <p>
        <strong>Fecha:</strong>{" "}
        {orderDetail.date ? new Date(orderDetail.date).toLocaleString() : "No disponible"}
      </p>
      <p>
        <strong>Productos:</strong>
      </p>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))
        ) : (
          <li>No hay productos en esta orden.</li>
        )}
      </ul>
    </div>
  );
}
