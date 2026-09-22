import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const forgotPassword_API =
    import.meta.env.VITE_FORGOT_PASSWORD_API;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        forgotPassword_API,
        {
          userEmail: email,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Forgot Password Response:", response.data);

      if (response.data.success) {
        alert("OTP sent to your email");

        navigate("/otp", {
          state: {
            email: email,
            purpose: "forgot-password",
          },
        });
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);

      alert(
        error.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">

      <div className="login-card">

        <div className="login-form">

          <h2 className="title">
            Forgot Password?
          </h2>

          <p className="subtitle">
            Enter your registered email address
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;