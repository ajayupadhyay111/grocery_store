import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useAppContext } from "./context/appContext";
import Login from "./components/Login";
import AllProducts from "./components/AllProducts";
import ProductCategory from "./components/ProductCategory";
import ProductDetails from "./components/ProductDetails";
import { Toaster } from "react-hot-toast";
import Cart from "./components/Cart";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useAppContext();
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
      <Toaster/>
    </div>
  );
};

export default App;
