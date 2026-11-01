import { useState } from "react";
import { FaSearch } from "react-icons/fa";
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

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, LogOut, ShoppingCart } from "lucide-react";

function Navbar({ sheetOpen, setSheetOpen }) {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const SHEET_SIDES = ["left"];
  const SHEET_SIDES_RIGHT = ["right"];

  const options = [
    { value: "shoe", label: "shoe" },
    { value: "bag", label: "bag" },
    { value: "pant", label: "pant" },
    { value: "shirt", label: "shirt" },
  ];

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
      <header className="bg-gray-100  hidden lg:block sticky top-0 z-9999">
        <div className="max-w-375 mx-auto flex items-center justify-around px-6">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {SHEET_SIDES.map((side) => (
              <Sheet key={side} open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild
                  render={
                    <Button variant="outline" className="hover:text-white hover:bg-[var(--hover-button)]">
                      {/* <FaBars className="text-2xl cursor-pointer" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                        />
                      </svg>
                      All Sports
                    </Button>
                  }
                />

                <SheetContent side={side} className="overflow-auto  z-9999">
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
          <img
            src={logo}
            height="80px"
            width="80px"
            alt="Maxara"
            onClick={() => navigate("/")}
          />

          {/* SEARCH */}
          <div className="w-125">
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "12px",
                  boxShadow: "2px 3px 3px black"
                }),
              }}
              className="basic-single z-3"
              classNamePrefix="select"
              placeholder={
                <div className="flex items-center gap-2 text-gray-400 ">
                  <FaSearch className="text-md" />
                  <span className="typing-container">Search products...</span>
                </div>
              }
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
            {/* LOGOUT */}
            <div
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:text-[var(--hover-button)] hover:[text-shadow:2px 2px 4px black)] transition-all duration-300"
              onClick={handleLogout}
            >
              <LogOut className="text-sm" size={18} />
              <span className="text-[12px]">Logout</span>
            </div>

            {/* WISHLIST */}
            <div
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:text-[var(--hover-button)] hover:[text-shadow:2px 2px 4px black)] transition-all duration-300"
              onClick={() => navigate("/like")}
            >
              <Heart size={18} />
              <span className="text-[12px]">Wishlist</span>
            </div>

            {/* CART */}
            <div
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:text-[var(--hover-button)] hover:[text-shadow:2px 2px 4px black)] transition-all duration-300"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={18} />
              <span className="text-sm">Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE */}
      <header className="bg-[var(--primary)] shadow-sm flex lg:hidden">
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2">
          {/* LOGO */}
          <img src={logo} className="w-14 sm:w-16 h-auto" alt="Maxara" />

          {/* MOBILE SEARCH */}
          {/* SEARCH */}
          <div className="w-[60%] ">
            <Select
              className="basic-single z-3 "
              classNamePrefix="select"
              placeholder={
                <div className="flex items-center gap-2 text-gray-400 ">
                  <FaSearch className="text-sm" />
                  <span className="typing-container">Search products...</span>
                </div>
              }
              classNames={{
                control: ({ isFocused }) =>
                  `!rounded-[10px] !min-h-[10px] !h-[35px] !border ${
                    isFocused ? "!border-blue-500" : "!border-gray-300"
                  } !shadow-none`,

                placeholder: () => "!text-gray-400",

                input: () => "!text-gray-800",

                valueContainer: () => "!px-3",

                menu: () => "!rounded-xl !overflow-hidden !mt-1",
              }}
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

          {/* MENU */}
          <div className="flex items-center gap-4">
            {SHEET_SIDES_RIGHT.map((side) => (
              <Sheet key={side}>
                <SheetTrigger
                  render={
                    <Button variant="outline">
                      {/* <FaBars className="text-2xl cursor-pointer" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                        />
                      </svg>
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

          {/* MOBILE SEARCH MODAL */}

          {mobileSearchOpen && (
            <div className="fixed inset-0 z-[9999] bg-black/40 flex items-start justify-center px-4 pt-20">
              <div className="bg-white w-full max-w-[600px] rounded-xl shadow-2xl p-5">
                {/* MODAL HEADER */}

                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">Search Products</h2>

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
                    options.find((option) => option.value === searchValue) ||
                    null
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
