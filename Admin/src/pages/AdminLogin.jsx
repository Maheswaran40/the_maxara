
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import adminApi from "../api/adminApi";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await adminApi.post("/login", {
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        // The JWT is stored in an HTTP-only cookie.
        // Do not store an admin flag or token in localStorage.

        const from = location.state?.from || "/dashboard";

        navigate(from, { replace: true });
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data?.message ||
            "Unable to log in. Please try again."
        );
      } else if (err.request) {
        setError(
          "Cannot connect to the server. Check whether the backend is running."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        bg-slate-100
        px-4
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white
          p-8
          shadow-xl
        "
      >
        {/* LOGO */}

        <div className="mb-8 text-center">
          <div
            className="
              mx-auto mb-4
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-blue-600
              text-white
            "
          >
            <ShieldCheck size={32} />
          </div>

          <h1 className="text-2xl font-bold">
            MAXARA
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@maxara.com"
              autoComplete="username"
              required
              disabled={loading}
              className="
                w-full rounded-lg
                border border-slate-300
                px-4 py-3
                outline-none
                focus:border-blue-500
                disabled:opacity-60
              "
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                disabled={loading}
                className="
                  w-full rounded-lg
                  border border-slate-300
                  px-4 py-3 pr-12
                  outline-none
                  focus:border-blue-500
                  disabled:opacity-60
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="
                  absolute right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div
              role="alert"
              className="
                rounded-lg
                bg-red-50
                px-4 py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* LOGIN */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-blue-600
              px-4 py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Signing in..." : "Login to Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
