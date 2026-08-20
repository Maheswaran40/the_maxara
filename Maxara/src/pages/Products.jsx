// Products.jsx - Only shows category navigation cards
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import cycle from "../assets/images/home_navbar_images/Cycle.png";
import bags from "../assets/images/home_navbar_images/bags.png";
import hiking from "../assets/images/home_navbar_images/hiking.png";
import rain_essential from "../assets/images/home_navbar_images/rain_essential.png";
import shoes from "../assets/images/home_navbar_images/shoes.png";
import Sports from "../assets/images/home_navbar_images/sports.png";

function Products() {
  const navigate = useNavigate();

  const product_section_card = [
    { img: bags, name: "Bags & Backpacks", id: "bags" },
    { img: cycle, name: "Cycling & Skating", id: "cycle" },
    { img: hiking, name: "Hiking & Trekking", id: "hiking" },
    { img: rain_essential, name: "Rain Essential", id: "rain" },
    { img: shoes, name: "Shoes", id: "shoes" },
    { img: Sports, name: "Sports & Accessories", id: "sports" }
  ];

  // ✅ Navigate to category page when category card is clicked
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div>
      <div className="md:grid-cols-6 gap-6 py-4 mb-4">
        <Swiper
          id="brandswpier"
          spaceBetween={10}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          loop
        >
          {product_section_card.map((value, index) => (
            <SwiperSlide key={index}>
              <div id="home-swiper">
                <center>
                  <img
                    src={value.img}
                    alt={value.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCategoryClick(value.id)}
                  />
                  <br />
                  <p>{value.name}</p>
                  <br />
                  <br />
                </center>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Products;