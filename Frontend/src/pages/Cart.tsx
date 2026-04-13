import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCart,
  updateCart,
  removeCart,
  clearCartAPI,
} from "../store/slices/cartSlice";
import { placeOrder } from "../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector(
    (state) => state.cart
  );

  
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const navigate = useNavigate()

  const total = items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>🛒 Your Cart</h2>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          {/* IMAGE */}
          <img
            src={
              item.product.imageUrl ||
              "https://via.placeholder.com/100"
            }
            alt={item.product.name}
            width="100"
          />

          {/* DETAILS */}
          <div style={{ flex: 1 }}>
            <h3>{item.product.name}</h3>
            <p>₹ {item.product.price}</p>




            <button
  onClick={async () => {
    await dispatch(placeOrder());
    await dispatch(clearCartAPI()); // clear cart after order
    navigate("/orders"); // go to history page
  }}
>
  Place Order
</button>

            {/* QUANTITY CONTROLS */}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() =>
                  dispatch(
                    updateCart({
                      productId: item.productId,
                      quantity: item.quantity - 1,
                    })
                  )
                }
                disabled={item.quantity <= 1}
              >
                -
                
              </button>

              <span style={{ margin: "0 10px" }}>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    updateCart({
                      productId: item.productId,
                      quantity: item.quantity + 1,
                    })
                  )
                }
              >
                +
              </button>
            </div>

            {/* REMOVE */}
            <button
              onClick={() =>
                dispatch(removeCart(item.productId))
              }
              style={{
                marginTop: "10px",
                color: "red",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      {items.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Total: ₹ {total}</h2>

          <button
            onClick={() => dispatch(clearCartAPI())}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}