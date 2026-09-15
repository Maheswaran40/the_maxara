import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import maxara_logo from "../assets/images/maxara_logo.png";

function Login() {

  const navigate = useNavigate();

  const login_API = import.meta.env.VITE_LOGIN_API;

  const [loginDetails, setLoginDetails] = useState({
    userEmail: "",
    userPass: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Login Details:", loginDetails);

      const response = await axios.post(
        login_API,
        loginDetails,
        {
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.message === "Login successful") {

        alert("Login successful!");

        // Go to home page
        navigate("/");

      }

    } catch (error) {

      console.error("Login Error:", error);

      if (error.response) {

        console.log(
          "Backend Error:",
          error.response.data
        );

        // User not verified
        if (error.response.status === 403) {

          alert(
            error.response.data.error ||
            "Please verify your email before login"
          );

          // Optional:
          // navigate("/otp", {
          //   state: {
          //     userEmail: loginDetails.userEmail
          //   }
          // });

        }

        // User not found / wrong password
        else if (error.response.status === 400) {

          alert(
            error.response.data.error ||
            "Invalid login details"
          );

        }

        else {

          alert(
            error.response.data.error ||
            "Something went wrong"
          );

        }

      } else {

        alert("Unable to connect to server");

      }

    } finally {

      setLoading(false);

    }
  }

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
          <img src={maxara_logo} alt="Maxara Logo" />
        </div>

        <div className="login-wrapper">

          <div className="login-card">

            <div className="login-form">

              <h2 className="title">
                Welcome Back
              </h2>

              <p className="subtitle">
                Login to continue shopping with MAXARA
              </p>

              <form onSubmit={handleSubmit}>

                <input
                  type="email"
                  name="userEmail"
                  placeholder="Email"
                  className="form-input"
                  value={loginDetails.userEmail}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="userPassword"
                  placeholder="Password"
                  className="form-input"
                  value={loginDetails.userPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

              </form>

              <p className="signup-text">
                No account?

                <Link
                  to="/signup"
                  className="signup-link"
                >
                  Create one
                </Link>
              </p>

              <div className="login-benefits">

                <h3>
                  It’s better when you’re signed Up
                </h3>

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

export default Login;
