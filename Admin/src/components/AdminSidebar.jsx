import {
  LayoutDashboard,
  Package,
  Layers,
  Warehouse,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";


function AdminSidebar() {

  const navigate =
    useNavigate();


  const menu = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Products",
      path: "/products",
      icon: Package,
    },

    {
      name: "Categories",
      path: "/categories",
      icon: Layers,
    },

    {
      name: "Inventory",
      path: "/inventory",
      icon: Warehouse,
    },

    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },

    {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },

  ];


  function logout() {

    localStorage.removeItem(
      "adminToken"
    );

    navigate("/login");

  }


  return (

    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 bg-slate-950 text-white lg:block">

      <div className="border-b border-white/10 p-5">

        <h1 className="text-xl font-bold">
          MAXARA
        </h1>

        <p className="text-xs text-slate-400">
          ADMIN PANEL
        </p>

      </div>


      <nav className="space-y-1 p-4">

        {menu.map((item) => {

          const Icon =
            item.icon;


          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                rounded-lg px-4 py-3
                text-sm
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-white/10"
                }
                `
              }
            >

              <Icon size={18} />

              {item.name}

            </NavLink>

          );

        })}

      </nav>


      <div className="absolute bottom-0 w-full border-t border-white/10 p-4">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-white/10"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

}


export default AdminSidebar;