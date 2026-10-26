import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role) {
        localStorage.setItem("role", data.user.role);
      }

      setSuccess(`Sign in successful! Welcome back, ${data.user.username}.`);

      // Give the user time to read the success message.
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(
        err.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-[#F5F0E7] px-5 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-[#44352D]/10 bg-[#FAF5EB] p-8 shadow-sm sm:p-10">
            {/* Brand */}
            <Link to="/" className="flex flex-col items-center text-center">
              <span className="font-serif text-2xl font-semibold text-[#44352D]">
                Modesty Girlboss
              </span>

              <span className="mt-1 font-serif text-xs tracking-[0.3em] text-[#A7833E]">
                ENTERPRISES
              </span>
            </Link>

            {/* Heading */}
            <div className="mt-10 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                Welcome Back
              </p>

              <h1 className="mt-3 font-serif text-3xl font-semibold text-[#44352D]">
                Sign In
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Sign in to access your account.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div
                role="status"
                className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                ✓ {success}
              </div>
            )}
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#44352D]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#44352D]/15 bg-white/60 px-4 py-3 text-sm text-[#44352D] outline-none transition focus:border-[#A7833E] focus:ring-2 focus:ring-[#A7833E]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#44352D]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#44352D]/15 bg-white/60 px-4 py-3 pr-20 text-sm text-[#44352D] outline-none transition focus:border-[#A7833E] focus:ring-2 focus:ring-[#A7833E]/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#A7833E] transition-colors hover:text-[#44352D]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#44352D] px-6 py-3.5 text-sm font-medium text-[#FAF5EB] transition-colors hover:bg-[#362419] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-neutral-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#A7833E] transition-colors hover:text-[#44352D]"
              >
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-neutral-500 transition-colors hover:text-[#A7833E]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
