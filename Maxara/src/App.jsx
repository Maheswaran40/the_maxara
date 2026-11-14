import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./common_comp/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CategoryProduct from "./pages/CategoryProduct";
import ProductPage from "./pages/ProductPage";
import Footer from "./common_comp/Footer";
import OTP from "./pages/OTP";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import Mobile_nav from "./common_comp/Mobile_nav";
import ScrollToTop from "./ScrollToTop";
import { useState } from "react";
import Error from "./pages/Error";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}


function AppContent() {
  const location = useLocation();

  const authPages = [
    "/login",
    "/signup",
    "/otp",
    "/reset-password",
    "/forgot-password"
  ];

  const isAuthPage = authPages.includes(location.pathname);

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      {!isAuthPage && !isErrorPage() && (
        <Navbar
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={<Home openSheet={() => setSheetOpen(true)} />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dummy" element={<dummy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:folder" element={<CategoryProduct />} />
        <Route path="/search" element={<CategoryProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/like" element={<Wishlist />} />

        {/* Always keep Error route */}
        <Route path="*" element={<Error />} />
      </Routes>

      {!isAuthPage && !isErrorPage() &&(
        <>
          <Mobile_nav />
          <Footer />
        </>
      )}
    </>
  );
}


export default App;


function isErrorPage() {
  return window.location.pathname !== "/" &&
    ![
      "/login", "/signup", "/otp",
      "/reset-password", "/forgot-password",
      "/search", "/cart", "/like"
    ].includes(window.location.pathname) &&
    !window.location.pathname.startsWith("/product/") &&
    !window.location.pathname.startsWith("/category/");
}