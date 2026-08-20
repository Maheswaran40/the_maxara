import Products from "./Products"

function Home() {
  let productList=[]
  let list=[]
  return (
    <>
    <Products/>

    <div className="container">
       <h3>New Arrivals</h3>
        <br />

        <div className="row">
          {/* new alrivals mapping start*/}
          {productList
            .filter((value) => value.category === "newarrival")
            .map((value, index) => {
              // Find hover image for this product (same name but with category = "hover")
              const hoverImage = productList.find(
                (img) =>
                  img.category === "hover" &&
                  img.name.replace(" hover", "") === value.name
              );
              return (
                <div
                  className="col-lg-3 col-6 shoe-card"
                  style={{ height: "300px", cursor: "pointer" }}
                  key={index}
                >
                  <div
                    id="shoe-card"
                    className="card my-lg-2 my-1"
                    height="200px"
                    style={{ cursor: "pointer" }}
                  >
                    {/* like icon */}
                    <div className="card-nav-icon">
                      <span
                        style={
                          list.some((item) => item._id === value._id)
                            ? { color: "white", backgroundColor: "#E52020" }
                            : { color: "blue" }
                        }
                      >
                        <i className="fa-regular fa-heart"></i>
                      </span>
                    </div>
                    {/* card body */}
                    <div className="card-body d-flex align-items-center justify-content-center shoe-img-wrapper">
                      <img
                        src={value.url}
                        alt="images"
                        className="shoe-img front"
                      />
                      {/* Hover image */}
                      <img
                        src={hoverImage?.url || value.url} // fallback to main image
                        alt={`${value.name} hover`}
                        className="shoe-img back"
                      />
                    </div>
                    {/* card footer */}
                    <div
                      className="card-footer d-flex justify-content-start flex-column"
                      id="shoe-card-main-footer"
                    >
                      <div id="shoe-card-footer">
                        <span id="shoe-card-footer-p" style={{ color: "blue" }}>
                          Name :
                        </span>
                        {value.name}
                      </div>
                      <div
                        style={{
                          fontSize: "small",
                          display: "flex",
                          alignItems: "center",
                          width: "150px",
                        }}
                      >
                        <span style={{ color: "blue" }}></span>
                        <b
                          style={{ fontSize: "15px" }}
                        >{`₹ ${value.price.toLocaleString("en-IN")}`}</b>
                        <div
                          style={{
                            width: "80px",
                            justifyContent: "space-between",
                            display: "flex",
                            marginLeft: "10px",
                          }}
                        >
                          <b>
                            <span style={{ textDecoration: "line-through" }}>
                              ₹{value.dashprice.toLocaleString("en-IN")}
                            </span>
                          </b>
                          <span
                            style={
                              parseInt(value.offer) >= 35
                                ? { backgroundColor: "red", color: "white" }
                                : { backgroundColor: "yellow" }
                            }
                          >
                            {value.offer}&nbsp;off
                          </span>
                        </div>
                      </div>

                      <button
                        id="shoe-cart-button"
                      >
                        <div style={{ height: "25px", position: "relative" }}>
                         
                            Add to cart
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
    </div>
    </>
  )
}

export default Home