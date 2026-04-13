import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../store/slices/productSlice";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  // 🔥 FORM STATE
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  // 🔥 EDIT MODE
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔥 RESET FORM
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setStock("");
    setCategory("");
    setIsEdit(false);
    setEditId(null);
  };

  // 🔥 CREATE / UPDATE
  const handleSubmit = async () => {
    if (!name || !price) {
      alert("Name and price required");
      return;
    }

    const payload = {
      name,
      description,
      price: Number(price),
      imageUrl,
      stock: Number(stock),
      category,
    };

    if (isEdit && editId !== null) {
      // ✏️ UPDATE
      await dispatch(
        updateProduct({
          id: editId,
          data: payload,
        })
      );
    } else {
      // ➕ CREATE
      await dispatch(createProduct(payload));
    }

    resetForm();
    dispatch(fetchProducts());
  };

  // 🔥 EDIT CLICK
  const handleEdit = (product: any) => {
    setIsEdit(true);
    setEditId(product.id);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl || "");
    setStock(product.stock.toString());
    setCategory(product.category);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👑 Admin Dashboard</h2>

      {/* 🔥 FORM */}
      <div style={{ marginBottom: "20px" }}>
        <h3>{isEdit ? "Edit Product" : "Add Product"}</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSubmit}>
            {isEdit ? "Update Product" : "Create Product"}
          </button>

          {isEdit && (
            <button
              onClick={resetForm}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* 🔥 PRODUCT LIST */}
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <img
            src={product.imageUrl || "https://via.placeholder.com/100"}
            width="100"
          />

          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹ {product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Category: {product.category}</p>

          <button onClick={() => handleEdit(product)}>
            ✏️ Edit
          </button>

          <button
            onClick={() => dispatch(deleteProduct(product.id))}
            style={{ color: "red", marginLeft: "10px" }}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}