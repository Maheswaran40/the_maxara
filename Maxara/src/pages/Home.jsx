import { useEffect, useState } from "react";
import Products from "./Products";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

function Home() {
  let list = [];
  const [bannerData, getBannerData] = useState([]);
  const [dataBanner2, setDataBanner2] = useState([]);
  const [roundBatch, getroundBatch] = useState([]);
  const [newarrivalData, getNewarrival] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoverimg, serHoverimg] = useState([]);
  const [brandLogo, setBrandLogo] = useState([]);
  const [budgetcard, setBudgetcard] = useState([]);
  const [steelDeal, setSteelDeal] = useState([]);
  let navigate = useNavigate();
  // console.log("steelDeal", steelDeal);

  const getBanner = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(import.meta.env.VITE_API_GETBANNER);
      console.log("response from banner", response);
      getBannerData(response.data.dataBanner);
      setDataBanner2(response.data.dataBanner2);
      getroundBatch(response.data.roundBatch);
      getNewarrival(response.data.newarrival);
      serHoverimg(response.data.hoverimage);
      setBrandLogo(response.data.brandlogo);
      setBudgetcard(response.data.budgetCard);
      setSteelDeal(response.data.steelDeal);
    } catch (err) {
      console.log("error fetching data from getbanner", err.message);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{error}</h3>
          <button
            onClick={getBanner}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Products />

      <div className=" mx-2.5 md:mx-12.5  text-4xl ">
        {/* hero banner */}
        <div className="">
          <Swiper
            spaceBetween={10}
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            loop
          >
            {bannerData.map((value, index) => {
              return (
                <SwiperSlide>
                  <div id="shoes-banner" className="px-2" key={index}>
                    <img src={value.url} alt="image" /> <br />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <br />
        {/* hero batch */}
        <div className="container">
          <div>
            <Swiper
              id="brandswpier"
              spaceBetween={10}
              modules={[Navigation, Autoplay, Pagination]}
              autoplay={{ delay: 2000 }}
              // pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 7 },
              }}
              loop
            >
              {roundBatch.map((value) => (
                <SwiperSlide>
                  <div id="home-swiper">
                    <center className="mb-10">
                      <img
                        src={value.url}
                        alt="card"
                        style={{ cursor: "pointer" }}
                      />

                      <p className="text-[15px] mt-2.5">{value.name}</p>
                    </center>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <br />
        </div>
        <h3>New Arrivals</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {newarrivalData.map((value, index) => {
            // ================= FIND MATCHING HOVER IMAGE =================
            const hoverImage = hoverimg?.find((item) => {
              // Only consider hover images
              if (item.category?.toLowerCase() !== "hover") {
                return false;
              }

              // Normal product name
              const productName = value.name?.trim().toLowerCase();

              // Hover product name
              // Example:
              // "Nike Air Max hover" -> "Nike Air Max"
              const hoverProductName = item.name
                ?.trim()
                .replace(/\s+hover\s*$/i, "")
                .trim()
                .toLowerCase();

              return productName === hoverProductName;
            });

            return (
              <div
                key={value._id || index}
                className="
          group
          bg-white
          rounded-2xl
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-300
          overflow-hidden
          hover:-translate-y-1
        "
              >
                {/* ================= IMAGE CONTAINER ================= */}
                <div
                  className="
            relative
            aspect-square
            overflow-hidden
            bg-gradient-to-br
            from-gray-50
            to-gray-100
            cursor-pointer
          "
                  onClick={() => navigate(`/shop/${value._id}`)}
                >
                  {/* ================= NORMAL IMAGE ================= */}
                  <img
                    src={value.url}
                    alt={value.name}
                    className={`
              absolute
              inset-0
              w-full
              h-full
              object-cover
              transition-opacity
              duration-500
              ease-in-out
              ${
                hoverImage?.url
                  ? "opacity-100 group-hover:opacity-0"
                  : "opacity-100"
              }
            `}
                  />

                  {/* ================= HOVER IMAGE ================= */}
                  {hoverImage?.url && (
                    <img
                      src={hoverImage.url}
                      alt={`${value.name} hover`}
                      className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
                ease-in-out
              "
                    />
                  )}

                  {/* ================= LIKE BUTTON ================= */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      likeFun(value._id);
                    }}
                    className={`
              absolute
              top-3
              right-3
              z-30
              p-2
              rounded-full
              shadow-md
              transition-all
              duration-300
              hover:scale-110
              ${
                list.some((item) => item._id === value._id)
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-blue-600"
              }
            `}
                  >
                    <i className="fa-regular fa-heart text-lg"></i>
                  </button>

                  {/* ================= OFFER BADGE ================= */}
                  {value.offer && (
                    <div
                      className={`
                absolute
                top-3
                left-3
                z-30
                text-xs
                font-bold
                px-2
                py-1.5
                rounded-full
                shadow-md
                ${
                  parseInt(value.offer) >= 35
                    ? "bg-red-500 text-white"
                    : "bg-yellow-400 text-gray-900"
                }
              `}
                    >
                      {value.offer} OFF
                    </div>
                  )}

                  {/* ================= QUICK VIEW ================= */}
                  <div
                    className="
              absolute
              inset-0
              z-20
              bg-black/30
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
              flex
              items-center
              justify-center
              pointer-events-none
              group-hover:pointer-events-auto
            "
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/shop/${value._id}`);
                      }}
                      className="
                bg-white
                text-gray-800
                px-5
                py-2.5
                rounded-full
                font-semibold
                shadow-lg
                hover:bg-blue-600
                hover:text-white
                transition-all
                duration-300
                text-xs
              "
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* ================= PRODUCT INFO ================= */}
                <div className="p-4">
                  {/* PRODUCT NAME */}
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                    {value.name}
                  </h3>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {/* CURRENT PRICE */}
                    <span className="text-lg font-bold text-gray-900">
                      ₹{value.price?.toLocaleString("en-IN")}
                    </span>

                    {/* ORIGINAL PRICE */}
                    {value.dashprice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{value.dashprice?.toLocaleString("en-IN")}
                      </span>
                    )}

                    {/* OFFER */}
                    {value.offer && (
                      <span
                        className={`
                  text-xs
                  font-bold
                  px-2
                  py-0.5
                  rounded-full
                  ${
                    parseInt(value.offer) >= 35
                      ? "text-white bg-red-500"
                      : "text-green-700 bg-green-100"
                  }
                `}
                      >
                        {value.offer} OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* brands scroll start */}
      <div>
        <Swiper
          id="brandswpier"
          spaceBetween={10}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={2000}
          breakpoints={{
            320: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          loop={true}
          className="brand-swiper"
        >
          {brandLogo.map((value) => (
            <SwiperSlide>
              <div>
                <img id="brandlogo" src={value.url} alt="iamge" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* brands scroll end */}

      <br />
      <br />
      <br />

      {/* budget cards start */}

      <div className="mx-5 md:mx-12.5">
        <h3>Budget Sport Shopping</h3>
        <br />
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Swiper
            id="brandswpier"
            spaceBetween={10}
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop
          >
            {budgetcard
              .map((value) => (
                <SwiperSlide>
                  <div>
                    <center>
                      <img
                        src={value.url}
                        alt="card"
                        style={{
                          height: "300px",
                          width: "250px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/product/${value._id}`)}
                      />
                    </center>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <br />
      </div>

      <br />
      <br />
      <br />
      {/* budget cards end */}

      {/* banner 2 start */}

      <div className="">
        <Swiper
          spaceBetween={10}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          loop
        >
          {dataBanner2.map((value, index) => {
            return (
              <SwiperSlide>
                <div id="shoes-banner" className="px-2" key={index}>
                  <img src={value.url} alt="image" /> <br />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* banner 2 end */}

      {/* Steel Deal start */}

      <div className="mx-12.5">
        <h3>Steal Deals: Too Good to Miss!</h3>
        <br />
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Swiper
            id="brandswpier"
            spaceBetween={10}
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop
          >
            {steelDeal
              .filter((value) => value.category === "steal_deal_card")
              .map((value) => (
                <SwiperSlide>
                  <div>
                    <center>
                      <img
                        src={value.url}
                        alt="card"
                        style={{
                          height: "300px",
                          width: "250px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/product/${value._id}`)}
                      />
                      <br />
                      <br />
                      <br />
                    </center>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <br />
      </div>

      {/* Steel Deal end */}
    </>
  );
}

export default Home;
