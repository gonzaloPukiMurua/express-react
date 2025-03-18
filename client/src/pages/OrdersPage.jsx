import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

export function OrdersPage() {
  const { user } = useAuth();
  const { orders, getOrders, deleteOrder } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getOrders(user.userId);
      console.log("Estas son las orders:", orders)
    }
  }, [user]);

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta orden?")) {
      await deleteOrder(id);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Órdenes</h1>
      {orders.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Usuario</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td
                  className="border border-gray-300 px-4 py-2 text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  {order.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => navigate(`/update-order/${order.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(order.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes órdenes registradas.</p>
      )}
    </div>
  );
}

