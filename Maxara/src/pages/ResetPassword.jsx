import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const resetPassword_API =
    import.meta.env.VITE_RESET_PASSWORD_API;

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !otp) {
      alert(
        "Reset information is missing. Please request a new OTP."
      );

      navigate("/forgot-password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      console.log("RESET DATA:", {
        userEmail: email,
        otp: otp,
        newPassword: password,
      });

      const response = await axios.post(
        resetPassword_API,
        {
          userEmail: email,
          otp: otp,
          newPassword: password,
        }
      );

      console.log(
        "Reset Password Response:",
        response.data
      );

      if (response.data.success) {
        alert(
          "Password reset successfully! Please login."
        );

        navigate("/login");
      } else {
        alert(
          response.data.message ||
            response.data.error ||
            "Password reset failed"
        );
      }

    }catch (error) {
  console.error("Reset Password Error:", error);

  console.log(
    "STATUS:",
    error.response?.status
  );

  console.log(
    "BACKEND RESPONSE:",
    error.response?.data
  );

  alert(
    error.response?.data?.error ||
    error.response?.data?.message ||
    "Password reset failed"
  );
} finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">

      <div className="w-[350px] rounded-xl border p-8 shadow-lg">

        <h2 className="mb-2 text-center text-2xl font-bold">
          Reset Password
        </h2>

        <p className="mb-6 text-center text-gray-500">
          Create your new password
        </p>

        <p className="mb-5 text-center text-sm text-gray-600">
          {email}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-lg border-2 p-3 outline-none focus:border-blue-500"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-lg border-2 p-3 outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;