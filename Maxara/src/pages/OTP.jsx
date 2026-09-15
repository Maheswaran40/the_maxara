import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const inputRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  const verify_otp = import.meta.env.VITE_VERIFYOTP_API;

  // Get email from Signup page
  const userEmail = location.state?.userEmail;

  function handleChange(e, index) {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    const newOtp = ["", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 3);

    inputRefs.current[nextIndex]?.focus();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const otpValue = otp.join("");

    // Check email
    if (!userEmail) {
      alert("Email not found. Please signup again.");
      navigate("/signup");
      return;
    }

    // Check OTP length
    if (otpValue.length !== 4) {
      alert("Please enter the 4-digit OTP");
      return;
    }

    console.log("Email:", userEmail);
    console.log("OTP:", otpValue);

    try {
      const response = await axios.post(
        verify_otp,
        {
          userEmail: userEmail,
          otp: otpValue,
        }
      );

      console.log("OTP Response:", response.data);

      if (
        response.data.message ===
        "Email verified successfully"
      ) {
        alert("Email verified successfully!");

        // Go to login
        navigate("/login");
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data.message ||
          "OTP verification failed"
        );
      } else {
        alert("Server error");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="w-[350px] rounded-xl border p-8 shadow-lg">

        <h2 className="mb-2 text-center text-2xl font-bold">
          Verify OTP
        </h2>

        <p className="mb-6 text-center text-gray-500">
          Enter the 4-digit OTP sent to your email
        </p>

        {/* Show email */}
        <p className="mb-5 text-center text-sm">
          {userEmail}
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-6 flex justify-center gap-3">

            {otp.map((digit, index) => (

              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                onPaste={handlePaste}
                className="h-14 w-12 rounded-lg border-2 text-center text-2xl font-bold outline-none focus:border-blue-500"
              />

            ))}

          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 text-white"
          >
            Verify OTP
          </button>

        </form>

      </div>

    </div>
  );
}

export default OTP;