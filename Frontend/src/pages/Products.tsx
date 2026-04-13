import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function Products() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
const navigate = useNavigate()







  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>👟 Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              background: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(0,0,0,0.1)";

    
            }}
            onClick={()=>navigate(`/products/${product.id}`)}
            
          >
            {/* IMAGE */}
            <img
              src={
                product.imageUrl ||
                "https://via.placeholder.com/250"
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            {/* CONTENT */}
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>
                {product.name}
              </h3>

              <p style={{ color: "#777", fontSize: "14px" }}>
                {product.category}
              </p>

              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  margin: "10px 0",
                }}
              >
                ₹ {product.price}
              </p>

              {/* STOCK */}
              <p
                style={{
                  color: product.stock > 0 ? "green" : "red",
                  fontSize: "13px",
                }}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </p>

              {/* BUTTON */}
              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#000",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}