import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./common_comp/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import CategoryProduct from "./pages/CategoryProduct";
import ProductPage from "./pages/ProductPage";
import Footer from "./common_comp/Footer";
import OTP from "./pages/OTP";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/Resetpassword";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/otp" || location.pathname === "/reset-password" || location.pathname === "/forgot-password";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        {/* authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Home renders Products component */}
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:folder" element={<CategoryProduct />} />{" "}
        {/* Category page */}
        <Route path="/search" element={<CategoryProduct />} />
        <Route path="/:folder" element={<Products />} />{" "}
        {/* Dynamic folder route */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/like" element={<Wishlist />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
