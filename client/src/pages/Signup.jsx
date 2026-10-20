import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";
import authImage from "../assets/login.png";
import { API_BASE_URL } from "../config/api";

import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { Login } = useAuth();

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords must match");
      }
      const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sign-up failed");
        throw new Error(data.message || "Sign-up failed");
      }
      navigate("/Login");
    } catch (err) {
      setError(err.message);
    }
  }

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await res.json();

        console.log(data);

        if (!res.ok) {
          setError(data.message || "Log-in failed");
          throw new Error(data.message || "Log-in failed");
        }

        Login(data.user, data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
    onError: () => console.log("Google login failed"),
  });
  return (
    <section className="min-h-screen bg-[#0F0E0D]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
          <div className="w-full max-w-[420px] rounded-2xl border border-white/[0.06] bg-[#171513]/90 px-6 py-8 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-8 sm:py-10">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-[0.4em] text-[#F5F5F4]">
                FINORA
              </h1>
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#F8F7F5] sm:text-4xl">
              Create your account
            </h2>
            <p className="mt-2 mb-6 text-sm leading-relaxed text-[#A7A39C]">
              Join Finora today and take control of your finances.
            </p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-[#E6E2DD]"
                >
                  Full name
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.07] bg-[#11100F] px-4 py-3 text-sm text-white placeholder:text-[#6D6A66] focus:border-[#D07B3F] focus:ring-2 focus:ring-[#D07B3F]/10 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-[#E6E2DD]"
                >
                  Email address
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.07] bg-[#11100F] px-4 py-3 text-sm text-white placeholder:text-[#6D6A66] focus:border-[#D07B3F] focus:ring-2 focus:ring-[#D07B3F]/10 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-[#E6E2DD]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.07] bg-[#11100F] px-4 py-3 text-sm text-white placeholder:text-[#6D6A66] focus:border-[#D07B3F] focus:ring-2 focus:ring-[#D07B3F]/10 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-[#8C8780] transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-xs font-medium tracking-wide text-[#E6E2DD]"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.07] bg-[#11100F] px-4 py-3 text-sm text-white placeholder:text-[#6D6A66] focus:border-[#D07B3F] focus:ring-2 focus:ring-[#D07B3F]/10 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-[#8C8780] transition hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-[#C96F35] to-[#E08C49] font-semibold tracking-wide text-[#111111] shadow-lg shadow-[#C96F35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#C96F35]/35 active:scale-[0.99]"
              >
                Create account
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/8" />
                <span className="text-xs text-[#6D6A66]">or</span>
                <div className="h-px flex-1 bg-white/8" />
              </div>

              <button
                type="button"
                onClick={() => login()}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] text-sm text-[#F5F5F4] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="text-center text-xs text-[#99948D]">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="font-medium text-[#D07B3F] transition hover:text-[#E59A5B]"
                >
                  Sign in
                </NavLink>
              </p>

              <div className="flex items-center justify-center gap-2 text-xs text-[#7E7A74]">
                <Lock size={12} className="text-[#D07B3F]" />
                <span>Bank-level encryption & secure authentication</span>
              </div>
            </form>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img
            src={authImage}
            alt="Finora"
            className="h-full w-full object-cover brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E0D] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
