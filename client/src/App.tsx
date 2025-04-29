import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useAppContext } from "./context/appContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import Orders from "./pages/Orders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import ProductList from "./pages/seller/ProductList";
import AddProduct from "./pages/seller/AddProduct";
import SellerOrders from "./pages/seller/Orders";
import Loading from "./components/Loading";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
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
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/loader" element={<Loading />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route
              path="product-list"
              element={isSeller ? <ProductList /> : null}
            />
            <Route path="orders" element={isSeller ? <SellerOrders /> : null} />
          </Route>
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
