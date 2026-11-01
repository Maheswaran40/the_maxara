import { Routes, Route } from "react-router-dom";

import AdminGuard from "../components/AdminGuard";
import AdminLayout from "../components/AdminLayout";

import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Categories from "../pages/Categories";
import Inventory from "../pages/Inventory";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import AddProject from "../pages/AddProject";

function AdminRoutes() {
  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/"
        element={<AdminLogin />}
      />

      {/* Protected admin routes */}
      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/products"
            element={<Product />}
          />

          <Route
            path="/products/add"
            element={<AddProduct />}
          />

          <Route
            path="/products/edit/:id"
            element={<EditProduct />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/projects/add"
            element={<AddProject />}
          />
        </Route>
      </Route>

      {/* Unknown URL */}
      <Route
        path="*"
        element={<AdminLogin />}
      />
    </Routes>
  );
}

export default AdminRoutes;