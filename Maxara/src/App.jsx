import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./common_comp/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import CategoryProduct from "./pages/CategoryProduct";
import ProductPage from "./pages/ProductPage";
import Footer from "./common_comp/Footer";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/form" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home renders Products component */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<Login />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:folder" element={<CategoryProduct />} /> {/* Category page */}
        <Route path="/:folder" element={<Products />} /> {/* Dynamic folder route */}
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;