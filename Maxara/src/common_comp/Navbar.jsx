import { useState } from "react";
import { FaBars, FaSearch, FaHome } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import logo from "../assets/images/maxara_logo.png";
import CategoryMenu from "@/components/ui/CategoryMenu";
import { Button } from "@/components/ui/button";
import Select from "react-select";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const SHEET_SIDES = ["left"];

  const options = [
    { value: "shoe", label: "shoe" },
    { value: "bag", label: "bag" },
    { value: "pant", label: "pant" },
    { value: "shirt", label: "shirt" },
  ];



const handleLogout = async () => {
  try {
    alert("logout")
    await axios.post(
      `${import.meta.env.VITE_LOGOUT_API}`,
      {},
      {
        withCredentials: true,
      }
    );

    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  // SEARCH FUNCTION
  const handleSearch = async (searchText) => {
    if (!searchText || !searchText.trim()) return;

    const search = searchText.trim();
    setMobileSearchOpen(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_GETPRODUCTS}?search=${encodeURIComponent(
          search,
        )}`,
      );

      if (!response.ok) {
        throw new Error("Failed to search products");
      }

      const data = await response.json();

      console.log("SEARCH RESULT:", data);

      // Navigate to search page
      navigate(`/search?q=${encodeURIComponent(search)}`);
    } catch (error) {
      console.log("SEARCH ERROR:", error);
    }
  };

  // When user selects from react-select
  const handleSelectChange = (selectedOption) => {
    if (!selectedOption) {
      setSearchValue("");
      return;
    }

    setSearchValue(selectedOption.label);

    handleSearch(selectedOption.value);
  };

  return (
    <>
      {/* DESKTOP */}
      <header className="bg-[var(--primary)] shadow-sm hidden lg:block">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between px-6">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {SHEET_SIDES.map((side) => (
              <Sheet key={side}>
                <SheetTrigger
                  render={
                    <Button variant="outline">
                      <FaBars className="text-2xl cursor-pointer" />
                      All Sports
                    </Button>
                  }
                />

                <SheetContent side={side} className="overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Explore Sports</SheetTitle>

                    <SheetDescription>
                      Explore products by sports category.
                    </SheetDescription>
                  </SheetHeader>

                  <CategoryMenu />

                  <SheetFooter>
                    <SheetClose
                      render={<Button variant="outline">Close</Button>}
                    />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>

          {/* LOGO */}
          <img src={logo} height="80px" width="80px" alt="Maxara" />

          {/* SEARCH */}
          <div className="w-[500px]">
            <Select
              className="basic-single z-3"
              classNamePrefix="select"
              placeholder="Search products..."
              isSearchable={true}
              isClearable={true}
              options={options}
              value={
                options.find((option) => option.value === searchValue) || null
              }
              onChange={handleSelectChange}
              onInputChange={(inputValue, actionMeta) => {
                if (actionMeta.action === "input-change") {
                  setSearchValue(inputValue);
                }

                return inputValue;
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(searchValue);
                }
              }}
            />
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-10">
            {/* HOME */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FaHome
                className={`text-xl ${
                  location.pathname === "/" ? "text-blue-500" : "text-gray-500"
                }`}
              />
              <span className="text-sm">Home</span>
            </div>

            {/* LOGOUT */}
            <div className="flex flex-col items-center cursor-pointer"  onClick={handleLogout}>
              <TbLogout className="text-xl" />
              <span className="text-sm">Logout</span>
            </div>

            {/* WISHLIST */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate("/like")}
            >
              <FaRegHeart className="text-xl" />
              <span className="text-sm">Wishlist</span>
            </div>

            {/* CART */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <MdOutlineShoppingCart className="text-xl" />
              <span className="text-sm">Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE */}
      <header className="bg-[var(--primary)] shadow-sm flex lg:hidden">
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2">
          {/* MENU */}
          <div className="flex items-center gap-4">
            {SHEET_SIDES.map((side) => (
              <Sheet key={side}>
                <SheetTrigger
                  render={
                    <Button variant="outline">
                      <FaBars className="text-2xl cursor-pointer" />
                    </Button>
                  }
                />

                <SheetContent side={side} className="overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Explore Sports</SheetTitle>

                    <SheetDescription>
                      Explore products by sports category.
                    </SheetDescription>
                  </SheetHeader>

                  <CategoryMenu />

                  <SheetFooter>
                    <SheetClose
                      render={<Button variant="outline">Close</Button>}
                    />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>

          {/* LOGO */}
          <img src={logo} className="w-14 sm:w-16 h-auto" alt="Maxara" />

          {/* MOBILE SEARCH */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setMobileSearchOpen(true)}
          >
            <FaSearch className="text-2xl" />
          </div>

{/* MOBILE SEARCH MODAL */}

{mobileSearchOpen && (
  <div className="fixed inset-0 z-[9999] bg-black/40 flex items-start justify-center px-4 pt-20">

    <div className="bg-white w-full max-w-[600px] rounded-xl shadow-2xl p-5">

      {/* MODAL HEADER */}

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-semibold">
          Search Products
        </h2>

        <button
          onClick={() => setMobileSearchOpen(false)}
          className="text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

      </div>


      {/* SEARCH */}

      <Select
        autoFocus
        className="basic-single"
        classNamePrefix="select"
        placeholder="Search products..."
        isSearchable={true}
        isClearable={true}
        options={options}

        value={
          options.find(
            (option) => option.value === searchValue
          ) || null
        }

        onChange={handleSelectChange}

        onInputChange={(inputValue, actionMeta) => {

          if (actionMeta.action === "input-change") {
            setSearchValue(inputValue);
          }

          return inputValue;
        }}

        onKeyDown={(event) => {

          if (event.key === "Enter") {
            handleSearch(searchValue);
          }

        }}
      />

    </div>

  </div>
)}


        </div>
      </header>
    </>
  );
}

export default Navbar;
