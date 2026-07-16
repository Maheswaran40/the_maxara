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
const categories = [
  { name: "Shoes", icon: <GiRunningShoe /> },
  { name: "Caps", icon: <FaHatCowboy /> },
  { name: "Bags", icon: <GiSchoolBag /> },
  { name: "Jersey", icon: <GiTShirt /> },
  { name: "Tshirts", icon: <GiTShirt /> },
  { name: "Cycle and Accessories", icon: <FaBicycle /> },
  { name: "Pants", icon: <GiTrousers /> },
  { name: "Shirts", icon: <GiTShirt /> },
  { name: "Outdoor Games Product", icon: <GiHiking /> },
];

function CategoryMenu() {
  return (
    <div className="w-[100%] bg-white p-4">

      <ul className="space-y-3">
        {categories.map((item, index) => (
          <li
            key={index}
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
              transition bg-[var(--primary)]  w-[100%]
            "
          >

            <span>{item.name}</span>

            <span className="text-xl text-gray-500">
              {item.icon}
            </span>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default CategoryMenu;