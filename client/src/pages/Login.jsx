import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Lock } from "lucide-react";
import heroBg from "../assets/login.png";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Login } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      try {
        const res = await fetch("http://localhost:3000/api/auth/google", {
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
        console.log("Status:", res.status);
        console.log("Response data:", data);

        Login(data.user, data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
    onError: () => console.log("Google login failed"),
  });

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/Login";
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Log-in failed");
      }

      Login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="min-h-screen bg-[#0F0E0D]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-[480px] rounded-[30px] border border-white/[0.06] bg-[#171513]/90 px-10 py-10 text-gray-300 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl lg:px-10 lg:py-9">
            <div className="mb-10 text-center">
              <h1 className="text-[30px] font-semibold tracking-[0.4em] text-[#F5F5F4]">
                FINORA
              </h1>
            </div>

            <form className="flex flex-col" onSubmit={handleLogin}>
              <h2 className="text-[48px] leading-none font-semibold tracking-[-0.04em] text-[#F8F7F5]">
                Welcome back
              </h2>

              <p className="mt-5 mb-12 max-w-xs text-[17px] leading-8 text-[#A7A39C]">
                Sign in to continue to your account.
              </p>

              {error && (
                <div className="mb-4 rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <label
                htmlFor="email"
                className="mb-3 text-sm font-medium tracking-wide text-[#E6E2DD]"
              >
                Email address
              </label>

              <input
                type="email"
                required="true"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter your email"
                className="mb-8 w-full rounded-2xl border border-white/[0.07] bg-[#11100F] px-5 py-4 text-white transition-all duration-300 placeholder:text-[#6D6A66] focus:border-[#D07B3F] focus:ring-4 focus:ring-[#D07B3F]/10 focus:outline-none"
              />

              <label
                htmlFor="password"
                className="mb-3 text-sm font-medium tracking-wide text-[#E6E2DD]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-white/[0.07] bg-[#11100F] px-5 py-4 text-white transition-all duration-300 placeholder:text-[#6D6A66] focus:border-[#D07B3F] focus:ring-4 focus:ring-[#D07B3F]/10 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-[#8C8780] transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-4 mb-8 flex justify-end">
                <NavLink
                  to="#"
                  className="text-sm font-medium text-[#D07B3F] transition-colors hover:text-[#E59A5B]"
                >
                  Forgot password?
                </NavLink>
              </div>

              <button className="h-14 rounded-2xl bg-gradient-to-r from-[#C96F35] to-[#E08C49] font-semibold tracking-wide text-[#111111] shadow-lg shadow-[#C96F35]/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#C96F35]/35 active:scale-[0.99]">
                Sign in
              </button>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/8"></div>
                <span className="text-sm text-[#6D6A66]">or</span>
                <div className="h-px flex-1 bg-white/8"></div>
              </div>

              <button
                onClick={() => login()}
                className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] text-[#F5F5F4] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
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

              <div className="mt-10 text-center text-sm text-[#99948D]">
                New to Finora?{" "}
                <NavLink
                  to="/Sign-up"
                  className="font-medium text-[#D07B3F] transition hover:text-[#E59A5B]"
                >
                  Create an account
                </NavLink>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 text-xs text-[#7E7A74]">
                <Lock size={14} className="text-[#D07B3F]" />
                <span>Bank-level encryption & secure authentication</span>
              </div>
            </form>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img
            src={heroBg}
            alt="Finora"
            className="h-full w-full object-cover brightness-90 contrast-110"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E0D] via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
