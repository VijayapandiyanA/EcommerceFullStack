import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#111",
        color: "#fff",
      }}
    >
      {/* LOGO */}
      <h2>🛍 MyShop</h2>

      {/* LINKS */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff" }}>
          Home
        </Link>

        <Link to="/products" style={{ color: "#fff" }}>
          Products
        </Link>

        
        {!user && (
          <>
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>

            <Link to="/register" style={{ color: "#fff" }}>
              Register
            </Link>
          </>
        )}

    
        {user && (
          <>
            <span>Hello, {user.name}</span>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}