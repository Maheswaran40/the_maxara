import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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

      {/* =====================================
          LOGIN
      ===================================== */}

      <Route
        path="/login"
        element={<AdminLogin />}
      />


      {/* =====================================
          PROTECTED ADMIN
      ===================================== */}

      <Route
        element={<AdminGuard />}
      >

        <Route
          element={<AdminLayout />}
        >

          {/* Dashboard */}

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />


          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* Products */}

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


          {/* Categories */}

          <Route
            path="/categories"
            element={<Categories />}
          />


          {/* Inventory */}

          <Route
            path="/inventory"
            element={<Inventory />}
          />


          {/* Orders */}

          <Route
            path="/orders"
            element={<Orders />}
          />


          {/* Customers */}

          <Route
            path="/customers"
            element={<Customers />}
          />


          {/* Projects */}

          <Route
            path="/projects/add"
            element={<AddProject />}
          />

        </Route>

      </Route>


      {/* Unknown URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>

  );

}

export default AdminRoutes;