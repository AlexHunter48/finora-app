import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Lock } from "lucide-react";
import heroBg from "../assets/login.png";

import useLogin from "../features/auth/useLogin";
import useGoogleLoginApi from "../features/useGoogleLogin";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isPending, error: loginError } = useLogin();
  const {
    googleSignIn,
    isPending: isSigningIn,
    error: googleSignInError,
  } = useGoogleLoginApi();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      googleSignIn(tokenResponse.access_token);
    },
    onError: () => console.log("Google login failed"),
  });

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;

    signIn({ email, password });
  }

  const isLoading = isPending || isSigningIn;
  const error = loginError || googleSignInError;
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
              Welcome back
            </h2>
            <p className="mt-2 mb-6 text-sm leading-relaxed text-[#A7A39C]">
              Sign in to continue to your account.
            </p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-400">
                {error.message || "Log in failed"}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                    placeholder="Enter your password"
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
                <div className="mt-2 flex justify-end">
                  <NavLink
                    to="#"
                    className="text-xs font-medium text-[#D07B3F] transition-colors hover:text-[#E59A5B]"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="gap -2 mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#C96F35] to-[#E08C49] font-semibold tracking-wide text-[#111111] shadow-lg shadow-[#C96F35]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#C96F35]/35 active:scale-[0.99]"
              >
                {isPending ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/8" />
                <span className="text-xs text-[#6D6A66]">or</span>
                <div className="h-px flex-1 bg-white/8" />
              </div>

              <button
                type="button"
                onClick={() => login()}
                disabled={isLoading}
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
                {isSigningIn ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin text-gray-700"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span>Signing in with Google...</span>
                  </>
                ) : (
                  <span>Continue with Google</span>
                )}
              </button>

              <p className="text-center text-xs text-[#99948D]">
                New to Finora?{" "}
                <NavLink
                  to="/Sign-up"
                  className="font-medium text-[#D07B3F] transition hover:text-[#E59A5B]"
                >
                  Create an account
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
            src={heroBg}
            alt="Finora"
            className="h-full w-full object-cover brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E0D] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
