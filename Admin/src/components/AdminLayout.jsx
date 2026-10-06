import AdminSidebar from "./AdminSidebar";

import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";


function AdminLayout() {

  return (

    <div className="min-h-screen bg-slate-100">

      <AdminSidebar />


      <div className="lg:ml-64">

        <AdminHeader />


        <main className="p-4 md:p-6">

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;