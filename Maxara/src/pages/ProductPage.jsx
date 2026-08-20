// import { all_product } from "../assets/Image";
import { Swiper, SwiperSlide } from "swiper/react";

function ProductPage() {
  let selectProduct="";
  let productImages=[];
  if (!selectProduct) {
    return <h2>Loading product...</h2>;
  }
  return (
    <>
      <div className="product-container">
        <div className="container ">
          {/* row div */}
          <div
            className="row product-container-row"
            style={{
              display: "flex",
              alignItems: "center",
              height: "fitcontent",
              padding: "5px",
            }}
          >
            {/* col div 1 */}
            <div className="col-lg-6  col-sm-12 product-image ">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  padding: "5px",
                  backgroundColor: "blue",
                  boxShadow: "12px 12px 12px gray",
                }}
              >
                <Swiper
                  spaceBetween={10}
                //   modules={[Navigation, Autoplay, Pagination]}
                  autoplay={{ delay: 3000 }}
                  pagination={{ clickable: true }}
                  loop
                >
                  {productImages.map((value, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={value.url}
                        alt={value.name || value.filename}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            {/* col div 2 */}
            <div
              className="col-lg-6 col-sm-12"
              style={{ height: "fit-content", padding: "5px" }}
            >
              <div
                className="p-2"
                style={{ position: "relative", top: "25px" }}
              >
                {/* Product details */}
                <div>
                  <h1
                    style={{
                      textTransform: "capitalize",
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#222",
                    }}
                  >
                    {selectProduct.name}
                  </h1>
                  <hr />
                  <div
                    style={{
                      fontSize: "small",
                      display: "flex",
                      alignItems: "center",
                      width: "270px",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <b
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#1a7f37",
                      }}
                    >{`₹ ${selectProduct.price.toLocaleString("en-IN")}`}</b>

                    <b>
                      MRP&nbsp;
                      <span
                        style={{
                          textDecoration: "line-through",
                          fontSize: "medium",
                          color: "#888",
                          marginLeft: "7px",
                        }}
                      >
                        ₹{selectProduct.dashprice.toLocaleString("en-IN")}
                      </span>
                    </b>
                    <span
                      style={
                        parseInt(selectProduct.offer) >= 35
                          ? {
                              backgroundColor: "red",
                              color: "white",
                              fontSize: "large",
                              padding: "5px",
                              borderRadius: "4px",
                              fontWeight: "bold",
                            }
                          : {
                              backgroundColor: "yellow",
                              fontSize: "large",
                              padding: "0px 5px ",
                              borderRadius: "4px",
                              fontWeight: "bold",
                            }
                      }
                    >
                      {selectProduct.offer}&nbsp;off
                    </span>
                  </div>
                  {/* ✅ Only show size section if product is clothing */}
                  {["tshirts", "shirts", "pants", "sleeves"].includes(
                    selectProduct.folder
                  ) && (
                    <div style={{ height: "100px" }}>
                      <p>
                        <b>SELECT SIZE</b>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        id="size"
                      >
                        <span>S</span>
                        <span>M</span>
                        <span>M/L</span>
                        <span>L</span>
                        <span>XL</span>
                        <span>2XL</span>
                      </div>
                    </div>
                  )}

                  {/* ✅ For bags */}
                  {(selectProduct.folder === "bags" ||
                    selectProduct.name.toLowerCase().includes("bag")) && (
                    <div style={{ height: "100px" }}>
                      <p>
                        <b>SELECT SIZE</b>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        id="size"
                      >
                        <span>Small</span>
                        <span>Medium</span>
                        <span>large</span>
                        <span>Extra Large</span>
                      </div>
                    </div>
                  )}

                  {/* ✅ For caps */}
                  {selectProduct.folder === "caps" && (
                    <div style={{ height: "100px" }}>
                      <p>
                        <b>SELECT SIZE</b>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        id="size"
                      >
                        <span>Free Size</span>
                        <span>54 cm</span>
                        <span>56 cm</span>
                        <span>58 cm</span>
                        <span>60 cm</span>
                      </div>
                    </div>
                  )}

                  {/* ✅ Show shoe sizes if folder = shoes */}
                  {selectProduct.folder === "shoes" && (
                    <div style={{ height: "100px" }}>
                      <p>
                        <b>SELECT SIZE</b>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        id="size"
                      >
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                      </div>
                    </div>
                  )}
                </div>
                <div id="buttondiv">
                  <button
                    className="like-button"
                    style={{ border: "1px solid blue" }}
                    // onClick={() => likeFun(selectProduct._id)}
                  >
                    <i className="fa-regular fa-heart"></i> &nbsp; Add to
                    Wishlist
                  </button>
                  <button
                    className="like-button"
                    style={{ border: "1px solid blue" }}
                    // onClick={(e) => cartFun(selectProduct._id, e)}
                  >
                    <i className="fa-solid fa-cart-shopping nav-icon"></i>&nbsp;
                    Add to cart
                  </button>
                </div>
                <br />
                <h4>Description</h4>
                <div>{selectProduct.desc}</div>
                <br />
                <div>
                  <p>
                    <b>SELLER DETAILS</b>
                  </p>
                  <p>Sold and Fulfilled by - Maxara Sports India Pvt Ltd</p>
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="product-details" className="container">
        {/* product details accordian  */}
        <div className="accordion " id="Gender">
          <div className="accordion-item " style={{ width: "auto" }}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
              >
                <b>PRODUCT DETAILS</b>
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="range-div">
                  <div>
                    At the foot of Mont Blanc, our team of designers has
                    developed these lightweight, breathable trousers for
                    occasional mountain walking
                  </div>
                  <br />
                  <div>
                    <b>BENEFITS</b>
                    <br />
                    <p>
                      <b>Breathability: </b>Lightweight synthetic fabric that
                      wicks the perspiration away from the body
                    </p>

                    <p>
                      <b>Lightweight:</b> Only 230 g in size L
                    </p>

                    <p>
                      <b>Quick drying: </b>Synthetic fabric that dries quickly
                      when wet with perspiration
                    </p>

                    <p>
                      <b>Anatomic design: </b>Semi-elasticated waist
                    </p>

                    <p>
                      <b>Freedom of movement:</b> Stretch fabric and preformed
                      knees
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* product specfications accordian  */}

        <div className="accordion " id="Gender">
          <div className="accordion-item " style={{ width: "auto" }}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
              >
                <b>PRODUCT SPECIFICATION</b>
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div
                  className="range-div "
                  style={{ display: "flex", justifyContent: "start" }}
                >
                  <div id="product-spec">
                    <li>
                      <div className="specdiv1">
                        <p>Type of belt</p>
                      </div>
                      <div className="specdiv2">Semi-elasticated belt</div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Modular</p>
                      </div>
                      <div className="specdiv2">Not modular</div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Waterproof</p>
                      </div>
                      <div className="specdiv2"> No waterproof</div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Type of belt </p>{" "}
                      </div>
                      <div className="specdiv2">
                        Elasticated belt,drawstring belt
                      </div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Number of pockets </p>{" "}
                      </div>
                      <div className="specdiv2">2 pockets</div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Stitching type</p>{" "}
                      </div>
                      <div className="specdiv2">With seam </div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Belt height</p>{" "}
                      </div>
                      <div className="specdiv2">Mid waistband </div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Level of practice </p>{" "}
                      </div>
                      <div className="specdiv2">All levels</div>
                    </li>
                    <hr />
                    <li>
                      <div className="specdiv1">
                        <p>Type of length </p>{" "}
                      </div>
                      <div className="specdiv2">PShortlain</div>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* product tech information accordian  */}
        <div className="accordion " id="Gender">
          <div className="accordion-item " style={{ width: "auto" }}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
              >
                <b>TECHNICAL INFROMATION</b>
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <div className="range-div">
                  <div>
                    <br />
                    <div id="product-spec">
                      <li>
                        <div className="specdiv1">
                          <p>Size:</p>
                        </div>
                        <div className="specdiv2">S, XL, L, M, 2XL </div>
                      </li>
                      <hr />
                      <li>
                        <div className="specdiv1">
                          <p>Length:</p>
                        </div>
                        <div className="specdiv2">
                          These shorts have a short inside leg length of 16 cm
                        </div>
                      </li>
                      <hr />
                      <li>
                        <div className="specdiv1">
                          <p>Warranty:</p>
                        </div>
                        <div className="specdiv2">2</div>
                      </li>
                      <hr />
                      <li>
                        <div className="specdiv1">
                          <p>Country of origin:</p>
                        </div>
                        <div className="specdiv2">India</div>
                      </li>
                      <hr />
                      <li>
                        <div className="specdiv1">
                          <p>MRP:</p>
                        </div>
                        <div className="specdiv2">
                          {selectProduct.price.toLocaleString("en-IN")}
                        </div>
                      </li>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
