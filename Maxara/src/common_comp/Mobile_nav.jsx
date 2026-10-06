import axios from "axios";
import { Heart, Home, LogOut, ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Mobile_nav() {
  let navigate = useNavigate();
  let location = useLocation();
  const handleLogout = async () => {
    try {
      alert("logout");
      await axios.post(
        `${import.meta.env.VITE_LOGOUT_API}`,
        {},
        {
          withCredentials: true,
        },
      );

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div
        id="mobile-nav"
        className="
    fixed bottom-2.5 left-1/2 -translate-x-1/2
    md:hidden
    w-[90%] h-[58px]
    rounded-full
    border border-blue-200/70
    bg-white backdrop-blur-xl
    shadow-[0_8px_30px_rgba(0,0,0,0.12)]
    flex justify-center items-center
    z-50
    transition-all duration-500 ease-out
    hover:shadow-[0_12px_40px_rgba(37,99,235,0.20)] 
  "
      >
        <div className="flex items-center justify-around gap-10 w-full  px-4">
          {/* home */}

          <div
            className={`
        group
        flex flex-col items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 ${
            location.pathname === "/"
              ? "bg-primary text-white rounded-4xl h-13 w-13"
              : "text-(--primary-dark) group-hover:text-red-500"
          }
            `}
            onClick={() => navigate("/")}
          >
            <div
              className="
          p-1.5 rounded-full
          transition-all duration-300
          group-hover:bg-red-50
          group-hover:scale-110
          group-hover:shadow-[0_4px_15px_rgba(239,68,68,0.25)]
         
        "
            >
              <Home
                className=" text-(--primary-dark) group-hover:text-red-500 transition-colors duration-300"
                size={18}
              />
            </div>

            <span
              className={` text-[11px] font-medium
           text-(--primary-dark)
          group-hover:text-red-500
          transition-all duration-300
          group-hover:[text-shadow:0_2px_5px_rgba(239,68,68,0.25)] `}
            >
              Home
            </span>
          </div>

          {/* LOGOUT */}
          <div
            className={`
        group
        flex flex-col items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 
            `}
            onClick={handleLogout}
          >
            <div
              className="
          p-1.5 rounded-full
          transition-all duration-300
          group-hover:bg-red-50
          group-hover:scale-110
          group-hover:shadow-[0_4px_15px_rgba(239,68,68,0.25)]
        "
            >
              <LogOut
                className=" text-(--primary-dark) group-hover:text-red-500 transition-colors duration-300"
                size={18}
              />
            </div>

            <span
              className="
          text-[11px] font-medium
           text-(--primary-dark)
          group-hover:text-red-500
          transition-all duration-300
          group-hover:[text-shadow:0_2px_5px_rgba(239,68,68,0.25)]
        "
            >
              Logout
            </span>
          </div>

          {/* WISHLIST */}
          <div
            className={`
        group
        flex flex-col items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1  ${
            location.pathname === "/like"
              ? "bg-primary text-white rounded-2xl h-13 w-13 "
              : "text-(--primary-dark) group-hover:text-red-500"
          }
      `}
            onClick={() => navigate("/like")}
          >
            <div
              className="
          p-1.5 rounded-full
          transition-all duration-300
          group-hover:bg-pink-50
          group-hover:scale-110
          group-hover:shadow-[0_4px_15px_rgba(236,72,153,0.25)]
        "
            >
              <Heart
                size={18}
                className="
             text-(--primary-dark)
            group-hover:text-pink-500
            group-hover:fill-pink-500
            transition-all duration-300
          "
              />
            </div>

            <span
              className="
          text-[11px] font-medium
           text-(--primary-dark)
          group-hover:text-pink-500
          transition-all duration-300
          group-hover:[text-shadow:0_2px_5px_rgba(236,72,153,0.25)]
        "
            >
              Wishlist
            </span>
          </div>

          {/* CART */}
          <div
            className={`
        group
        flex flex-col items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1  ${
            location.pathname === "/cart"
              ? "bg-primary text-white rounded-4xl h-13 w-13"
              : "text-(--primary-dark) group-hover:text-red-500"
          }
            `}
            onClick={() => navigate("/cart")}
          >
            <div
              className="
          p-1.5 rounded-full
          transition-all duration-300
          group-hover:bg-blue-50
          group-hover:scale-110
          group-hover:shadow-[0_4px_15px_rgba(59,130,246,0.25)]
        "
            >
              <ShoppingCart
                size={18}
                className="
             text-(--primary-dark)
            group-hover:text-blue-500
            transition-all duration-300
          "
              />
            </div>

            <span
              className="
          text-[11px] font-medium
           text-(--primary-dark)
          group-active:text-primary-500
          transition-all duration-300
          group-hover:[text-shadow:0_2px_5px_rgba(59,130,246,0.25)]
        "
            >
              Cart
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mobile_nav;
