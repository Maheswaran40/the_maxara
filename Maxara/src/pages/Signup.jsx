import axios from "axios";
import maxara_logo from "../assets/images/maxara_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Singup() {
  let Navigate = useNavigate();
  const signup_API = import.meta.env.VITE_API_SIGNUP;

  // Store all form inputs in one object
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    userPass: "",
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("User Details:", userDetails);

    try {
      const response = await axios.post(signup_API, userDetails);

      console.log("Signup Success:", response.data);

      // Optional: clear form after successful signup
      setUserDetails({
        userName: "",
        userEmail: "",
        userPass: "",
      });
      // Send email to OTP page
      Navigate("/otp", {
        state: {
          userEmail: userDetails.userEmail,
        },
      });
    } 
    catch (error) {
  const message =
    error.response?.data?.error ||
    error.response?.data?.message ||
    "Something went wrong. Please try again.";

  toast.error(message);
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
          <img src={maxara_logo} alt="" />
        </div>

        {/* Signup form */}
        <div className="signup-page">
          <div className="signup-card">
            <h2 className="text-center font-bold text-2xl">Let's go!</h2>

            <form className="form mt-4" onSubmit={handleSubmit}>
              <label>Username</label>
              <br />

              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="Username"
                value={userDetails.userName}
                onChange={handleChange}
                required
              />

              <br />

              <label>Email</label>
              <br />

              <input
                type="email"
                name="userEmail"
                className="form-control"
                placeholder="E-mail"
                value={userDetails.userEmail}
                onChange={handleChange}
                required
              />

              <br />

              <label>Password</label>
              <br />

              <input
                type="password"
                name="userPass"
                className="form-control"
                placeholder="Password"
                value={userDetails.userPass}
                onChange={handleChange}
                required
              />

              <br />

              <button type="submit" className="btn-submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Singup;
