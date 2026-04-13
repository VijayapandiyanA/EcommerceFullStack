import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchOrders } from "../store/slices/orderSlice";

export default function Orders() {
  const dispatch = useAppDispatch();

  const { orders, loading, error } = useAppSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Order History</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>Order #{order.id}</h3>
          <p>Total: ₹ {order.totalPrice}</p>
          <p>Status: {order.status}</p>

          {/* ITEMS */}
          {order.items.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "10px" }}>
              <img
                src={item.product.imageUrl}
                width="60"
              />
              <div>
                <p>{item.product.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}