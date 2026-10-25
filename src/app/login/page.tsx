"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChefHat,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  User,
  ArrowLeft,
} from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    role: string;
    avatar: string;
  } | null>(null);

  // Quick fill demo credentials
  const fillDemoCredentials = (role: "chef" | "member") => {
    if (role === "chef") {
      setEmail("chef@chefmizan.cyou");
      setPassword("masterchef2026");
      setName("Chef Mizan");
    } else {
      setEmail("vip.guest@gmail.com");
      setPassword("gourmet1234");
      setName("VIP Diner");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe, name }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUserProfile(data.user);
      } else {
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setErrorMessage("Network error occurred while connecting to authentication service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 text-stone-100 flex flex-col lg:flex-row selection:bg-amber-500 selection:text-black">
      {/* Left Column: Brand & Luxury Visual Showcase */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-stone-900 overflow-hidden items-center justify-between flex-col p-12 border-r border-stone-800">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80"
            alt="Chef Mizan Ambience"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/50 to-stone-950"></div>
        </div>

        {/* Top Header */}
        <div className="relative z-10 w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-full bg-stone-950/60 backdrop-blur-md border border-stone-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </Link>

          <span className="text-xs tracking-widest uppercase font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            chefmizan.cyou
          </span>
        </div>

        {/* Center Quote & Culinary Identity */}
        <div className="relative z-10 max-w-lg my-auto space-y-6 text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 shadow-2xl shadow-amber-500/30">
            <ChefHat className="w-9 h-9" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Laravel & Next.js Full-Stack Architecture
            </div>
            <h1 className="text-4xl font-serif font-bold text-white leading-tight">
              Exclusive Culinary Gateway for <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                Chef Mizan & Guests
              </span>
            </h1>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Access the private dining portal, view reservations, manage artisan recipes, and unlock curated gastronomic experiences with seamless authentication.
            </p>
          </div>

          {/* Feature Points */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <div className="flex items-center gap-3 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full-Stack Protected Session with Encrypted Auth Tokens</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Direct Sync with chefmizan.cyou Reservation Engine</span>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="relative z-10 w-full p-4 rounded-2xl bg-stone-950/70 backdrop-blur-md border border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
          <p>© 2026 Chef Mizan. All rights reserved.</p>
          <p className="text-amber-400 font-serif font-semibold">Master Culinary Arts</p>
        </div>
      </div>

      {/* Right Column: Laravel-Style Clean Authentication Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Back Button & Brand */}
          <div className="flex items-center justify-between lg:hidden mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-400" />
              <span className="font-serif font-bold text-sm tracking-wider uppercase text-amber-400">
                Chef Mizan
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {isLogin ? "Sign In to Your Account" : "Create Member Profile"}
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              {isLogin
                ? "Enter your credentials to access your Chef Mizan dining panel"
                : "Register for exclusive recipe cards and private table privileges"}
            </p>
          </div>

          {/* Tabs: Sign In / Register */}
          <div className="flex rounded-xl bg-stone-900 p-1 border border-stone-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setUserProfile(null);
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                isLogin
                  ? "bg-amber-500 text-stone-950 shadow-md font-bold"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setUserProfile(null);
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                !isLogin
                  ? "bg-amber-500 text-stone-950 shadow-md font-bold"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Fast Demo Credentials Assistant */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Quick 1-Click Demo Fill:
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fillDemoCredentials("chef")}
                className="px-2.5 py-1 rounded-md bg-stone-900 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition-colors text-[11px] font-medium"
              >
                Chef Account
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("member")}
                className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-700 text-stone-300 hover:bg-stone-800 transition-colors text-[11px] font-medium"
              >
                VIP Guest Account
              </button>
            </div>
          </div>

          {/* Successful Login Confirmation Card */}
          {userProfile ? (
            <div className="p-6 rounded-2xl bg-stone-900 border border-emerald-500/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base flex items-center gap-1.5">
                    {userProfile.name}
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">{userProfile.role}</p>
                  <p className="text-[11px] text-stone-400">{userProfile.email}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs">
                Authentication Successful! You are logged in with full session privileges on <strong>chefmizan.cyou</strong>.
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs text-center hover:bg-amber-400 transition-colors"
                >
                  Go to Main Site
                </Link>
                <button
                  type="button"
                  onClick={() => setUserProfile(null)}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 text-stone-300 text-xs hover:bg-stone-700 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            /* Authentication Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name for Registration */}
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mizanur Rahman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@chefmizan.cyou"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Password
                  </label>
                  {isLogin && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Password reset instructions sent to registered email.");
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-stone-500 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              {isLogin && (
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-stone-800 bg-stone-900 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-xs text-stone-400 hover:text-stone-300">
                      Remember this device for 30 days
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 disabled:opacity-60 text-xs mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In to chefmizan.cyou" : "Create VIP Account"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social Authentication Options */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-stone-950 px-3 text-stone-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setEmail("google.user@gmail.com");
                  setPassword("google_authenticated");
                  setName("Google User");
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-medium transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail("github.dev@gmail.com");
                  setPassword("github_authenticated");
                  setName("GitHub Dev");
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-medium transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
