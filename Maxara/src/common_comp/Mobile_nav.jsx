import axios from "axios";
import { Heart, Home, LogOut, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Order here = order on screen (grid column 0..3)
const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home, path: "/" },
  { key: "logout", label: "Logout", icon: LogOut, path: null },
  { key: "like", label: "Wishlist", icon: Heart, path: "/like" },
  { key: "cart", label: "Cart", icon: ShoppingCart, path: "/cart" },
];

function Mobile_nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);

  // Index of the tab that matches the current route (Logout has no route)
  const routeIndex = NAV_ITEMS.findIndex(
    (item) => item.path !== null && item.path === location.pathname,
  );

  // Keep the last valid index so the pill never disappears on unknown routes
  const [pillIndex, setPillIndex] = useState(routeIndex === -1 ? 0 : routeIndex);

  useEffect(() => {
    if (routeIndex !== -1) setPillIndex(routeIndex);
  }, [routeIndex]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_LOGOUT_API}`,
        {},
        { withCredentials: true },
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleClick = (item) => {
    if (item.key === "logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      id="mobile-nav"
      className="
        fixed bottom-2.5 left-1/2 -translate-x-1/2
        md:hidden w-[90%] h-[58px]
        rounded-full border border-blue-400
        bg-white/95 backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        flex items-center justify-center
        z-50
      "
    >
      <div className="relative grid grid-cols-4 items-center w-full h-full">
        {/* SLIDING PILL: wrapper is exactly one column wide,
            so translateX(100% * index) lands on the right tab at any screen size */}
        <div
          className="
            absolute top-0 left-0
            w-1/4 h-full
            flex items-center justify-center
            pointer-events-none
            transition-transform duration-500
            ease-[cubic-bezier(0.34,1.56,0.34,1)]
          "
          style={{ transform: `translateX(${pillIndex * 100}%)` }}
        >
          <div className="w-[52px] h-[52px] rounded-full bg-blue-700 shadow-[0_4px_15px_rgba(37,99,235,0.25)]" />
        </div>

        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive = routeIndex === index;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleClick(item)}
              disabled={item.key === "logout" && loggingOut}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative z-10
                flex flex-col items-center justify-center
                cursor-pointer bg-transparent border-0 p-0
                w-full h-[52px] rounded-full
                transition-all duration-300
                ${isActive ? "text-white scale-105" : "text-(--primary-dark)"}
                ${item.key === "logout" && loggingOut ? "opacity-50" : ""}
              `}
            >
              <Icon size={18} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Mobile_nav;
