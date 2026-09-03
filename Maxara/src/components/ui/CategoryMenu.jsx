import {
  GiRunningShoe,
  GiSchoolBag,
  GiTShirt,
  GiTrousers,
  GiHiking,
} from "react-icons/gi";

import {
  FaBicycle,
  FaHatCowboy,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { SheetClose } from "./sheet";

const categories = [
  { name: "Shoes", icon: <GiRunningShoe />, path: "/category/shoes" },
  { name: "Caps", icon: <FaHatCowboy />, path: "/category/caps" },
  { name: "Bags", icon: <GiSchoolBag />, path: "/category/travelbag" },
  { name: "Jersey", icon: <GiTShirt />, path: "/category/jersey" },
  { name: "Tshirts", icon: <GiTShirt />, path: "/category/tshirts" },
  {
    name: "Cycle and Accessories",
    icon: <FaBicycle />,
    path: "/cycle-accessories",
  },
  { name: "Pants", icon: <GiTrousers />, path: "/category/pants" },
  { name: "Shirts", icon: <GiTShirt />, path: "/category/shirts" },
  {
    name: "Outdoor Games Product",
    icon: <GiHiking />,
    path: "/category/outdoor-games",
  },
];

function CategoryMenu() {

  return (
    <div className="w-[100%] bg-white p-4">
     <ul className="space-y-3">
        {categories.map((item) => (
          <li key={item.name}>
            <SheetClose
              render={
                <Link
                  to={item.path}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    px-3
                    py-2
                    cursor-pointer
                    text-lg
                    text-gray-800
                    hover:bg-blue-50
                    hover:text-blue-600
                    transition
                    bg-[var(--primary)]
                    w-full
                  "
                >
                  <span>{item.name}</span>

                  <span className="text-xl text-gray-500">
                    {item.icon}
                  </span>
                </Link>
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMenu;