import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
   

      {/* HERO SECTION */}
      <div
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h1>Welcome to MyShop 🛍</h1>
        <p>Discover amazing products at great prices</p>

        <a href="/products">
          <button style={{ marginTop: "20px", padding: "10px 20px" }}>
            Shop Now
          </button>
        </a>
      </div>
    </div>
  );
}


   {/* <Navbar /> */}