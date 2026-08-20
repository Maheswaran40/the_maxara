import { Link } from "react-router-dom";
import maxara_logo from "../assets/images/maxara_logo.png";


function Form() {
  
  return (
    <>
      <div id="form-div">
        <div
          style={{
            height: "100%",
            width: "50%",
          }}
          className="form-sub-div1"
        >
          <img src={maxara_logo} alt=""  />
        </div>
        <div className="login-wrapper">
          <div className="login-card">
            {/* Left Section - Form */}
            <div className="login-form">
              <h2 className="title">Welcome Back</h2>
              <p className="subtitle">Login to continue shopping with MAXARA</p>

              <form>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                //   value={loginName}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                //   value={loginPassword}
                 

                />
                <button type="submit" className="btn-primary" >
                  Login
                </button>
              </form>

              <p className="signup-text">
                No account?
                <Link to="/signup" className="signup-link">
                  Create one
                </Link>
              </p>
              <div className="login-benefits">
              <h3>It’s better when you’re signed Up</h3>
              <ul>
                <li>🎯 Exclusive Deals & Offers</li>
                <li>⚡ Faster Checkout & Easy Returns</li>
                <li>🏆 Rewards & Personalized Experience</li>
              </ul>
            </div>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
