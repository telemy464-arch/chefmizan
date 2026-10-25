"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
  Droplets,
  User,
  Phone,
  ShieldCheck,
} from "lucide-react";

// Water Ripple Wave Interface
interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
  lineWidth: number;
}

export default function IndexPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Ripple state tracking in ref for 60fps smooth canvas rendering
  const ripplesRef = useRef<WaterRipple[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Floating 3D card tilt state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [isPressing, setIsPressing] = useState(false);

  // Mode: Sign In or Sign Up
  const [isSignUp, setIsSignUp] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Button Ripple effect state
  const [btnRipples, setBtnRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Setup Canvas Water Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initial ambient gentle ripples
    const spawnRipple = (x: number, y: number, isMajor = false) => {
      const colors = isMajor
        ? ["rgba(56, 189, 248, 0.7)", "rgba(147, 197, 253, 0.6)", "rgba(251, 191, 36, 0.4)"]
        : ["rgba(56, 189, 248, 0.4)", "rgba(125, 211, 252, 0.3)", "rgba(14, 165, 233, 0.3)"];

      const count = isMajor ? 3 : 2;
      for (let i = 0; i < count; i++) {
        ripplesRef.current.push({
          x,
          y,
          radius: 4 + i * 8,
          maxRadius: isMajor ? 180 + i * 40 : 90 + i * 20,
          alpha: isMajor ? 0.7 - i * 0.15 : 0.45 - i * 0.1,
          speed: isMajor ? 3.5 + i * 0.8 : 2.2 + i * 0.5,
          color: colors[i % colors.length],
          lineWidth: isMajor ? 2.5 : 1.5,
        });
      }
    };

    // Ambient random water droplets
    const ambientInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        const randX = Math.random() * window.innerWidth;
        const randY = Math.random() * window.innerHeight;
        spawnRipple(randX, randY, false);
      }
    }, 2800);

    // Canvas render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha *= 0.965; // Smooth exponential decay

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color.replace(/[\d.]+\)$/g, `${r.alpha.toFixed(3)})`);
        ctx.lineWidth = r.lineWidth;
        ctx.shadowColor = "rgba(56, 189, 248, 0.6)";
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Inner refraction wave
        if (r.radius > 15) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(2, r.radius - 8), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(r.alpha * 0.35).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(ambientInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle pointer/touch interaction across the screen
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    const dist = Math.hypot(x - lastSpawnRef.current.x, y - lastSpawnRef.current.y);
    if (dist > 35 && now - lastSpawnRef.current.time > 60) {
      lastSpawnRef.current = { x, y, time: now };

      ripplesRef.current.push({
        x,
        y,
        radius: 5,
        maxRadius: 100,
        alpha: 0.5,
        speed: 2.8,
        color: "rgba(56, 189, 248, 0.4)",
        lineWidth: 1.8,
      });
      ripplesRef.current.push({
        x,
        y,
        radius: 12,
        maxRadius: 140,
        alpha: 0.3,
        speed: 3.4,
        color: "rgba(147, 197, 253, 0.3)",
        lineWidth: 1.2,
      });
    }

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (x - centerX) / (rect.width / 2);
      const deltaY = (y - centerY) / (rect.height / 2);

      const maxTilt = 12;
      setTilt({
        rotateX: -Math.max(-maxTilt, Math.min(maxTilt, deltaY * maxTilt)),
        rotateY: Math.max(-maxTilt, Math.min(maxTilt, deltaX * maxTilt)),
        scale: isPressing ? 0.985 : 1,
      });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressing(true);
    const x = e.clientX;
    const y = e.clientY;

    for (let i = 0; i < 3; i++) {
      ripplesRef.current.push({
        x,
        y,
        radius: 4 + i * 10,
        maxRadius: 180 + i * 35,
        alpha: 0.75 - i * 0.15,
        speed: 4 + i * 1.2,
        color: i === 0 ? "rgba(251, 191, 36, 0.6)" : "rgba(56, 189, 248, 0.6)",
        lineWidth: 2.5,
      });
    }
  };

  const handlePointerUp = () => {
    setIsPressing(false);
  };

  const handlePointerLeave = () => {
    setIsPressing(false);
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  // Button touch water ripple
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newId = Date.now();

    setBtnRipples((prev) => [...prev, { x, y, id: newId }]);
    setTimeout(() => {
      setBtnRipples((prev) => prev.filter((r) => r.id !== newId));
    }, 700);
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (isSignUp) {
        // Sign Up API Call
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          setIsLoading(false);
          return;
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, emailOrPhone, password, confirmPassword }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setSuccessMessage("Account created! Redirecting to Dashboard...");
          if (typeof window !== "undefined") {
            localStorage.setItem("chef_mizan_user", JSON.stringify(data.user));
          }
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          setErrorMessage(data.message || "Failed to create account.");
        }
      } else {
        // Sign In API Call
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailOrPhone, password, rememberMe }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setSuccessMessage("Signed in successfully! Redirecting to Dashboard...");
          if (typeof window !== "undefined") {
            localStorage.setItem("chef_mizan_user", JSON.stringify(data.user));
          }
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          setErrorMessage(data.message || "Invalid credentials.");
        }
      }
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Quick 1-click fill
  const handleQuickDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSignUp) {
      setName("MD Mizanur Rahman");
      setEmailOrPhone("chef@chefmizan.cyou");
      setPassword("masterchef2026");
      setConfirmPassword("masterchef2026");
    } else {
      setEmailOrPhone("chef@chefmizan.cyou");
      setPassword("masterchef2026");
    }
  };

  return (
    <main
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 select-none cursor-default"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #0a192f 0%, #020617 75%, #000208 100%)",
      }}
    >
      {/* Interactive Water Ripple Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Ambient Liquid Waves & Caustics in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/20 blur-[100px] liquid-caustic" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px] liquid-caustic" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[140px] liquid-caustic" style={{ animationDelay: "-5s" }} />
      </div>

      {/* Subtle Water Surface Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Floating Liquid Glass Login/Sign-Up Card Container with 3D Perspective */}
      <div
        className="relative z-20 w-full max-w-[440px] px-4 py-8"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={cardRef}
          className="water-floating transition-transform duration-150 ease-out rounded-3xl relative backdrop-blur-2xl bg-slate-900/40 border border-white/10 shadow-[0_20px_60px_-15px_rgba(2,132,199,0.25)] p-8 sm:p-10 text-white overflow-hidden"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
            transformStyle: "preserve-3d",
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px 2px rgba(56, 189, 248, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)`,
          }}
        >
          {/* Glass Specular Water Glare Highlight */}
          <div
            className="absolute -inset-full pointer-events-none opacity-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 300px at ${tilt.rotateY * 15 + 50}% ${-tilt.rotateX * 15 + 50}%, rgba(255,255,255,0.4), transparent 70%)`,
            }}
          />

          {/* Card Water Shimmer Border */}
          <div className="absolute inset-0 rounded-3xl border border-sky-400/20 pointer-events-none" />

          {/* Top Droplet & Domain Info */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-2.5 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/20 via-sky-400/10 to-amber-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-transform duration-300 group-hover:scale-110">
                <Droplets className="w-7 h-7 animate-pulse text-sky-300" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-sky-400/20 blur-md -z-10 animate-ping opacity-25" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              {isSignUp ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-xs text-sky-400/90 font-mono tracking-widest mt-0.5">
              chefmizan.cyou
            </p>
          </div>

          {/* Mode Switcher Tabs: Sign In ⇄ Sign Up */}
          <div className="flex rounded-2xl bg-slate-950/60 p-1 border border-white/10 mb-6 text-xs font-semibold backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
                !isSignUp
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
                isSignUp
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Success Message Banner */}
          {successMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs text-center flex items-center justify-center gap-2 animate-in fade-in duration-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-950/70 border border-rose-500/30 text-rose-200 text-xs text-center">
              {errorMessage}
            </div>
          )}

          {/* Interactive Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If Sign Up: 1. Full Name */}
            {isSignUp && (
              <div className="space-y-1.5 animate-in fade-in duration-300">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-300">
                  Full Name *
                </label>
                <div className="relative group">
                  <User className="w-4 h-4 text-sky-400/70 absolute left-3.5 top-3.5 transition-colors group-focus-within:text-sky-300" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. MD Mizanur Rahman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400/60 focus:bg-slate-950/70 focus:ring-2 focus:ring-sky-400/20 transition-all backdrop-blur-md"
                  />
                </div>
              </div>
            )}

            {/* Email or Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-300">
                {isSignUp ? "Email or Mobile Number *" : "Email or Username *"}
              </label>
              <div className="relative group">
                {isSignUp ? (
                  <Phone className="w-4 h-4 text-sky-400/70 absolute left-3.5 top-3.5 transition-colors group-focus-within:text-sky-300" />
                ) : (
                  <Mail className="w-4 h-4 text-sky-400/70 absolute left-3.5 top-3.5 transition-colors group-focus-within:text-sky-300" />
                )}
                <input
                  type="text"
                  required
                  placeholder={isSignUp ? "name@example.com or +8801700..." : "name@chefmizan.cyou"}
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400/60 focus:bg-slate-950/70 focus:ring-2 focus:ring-sky-400/20 transition-all backdrop-blur-md"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-300">
                  Password *
                </label>
                {!isSignUp && (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions sent.");
                    }}
                    className="text-[11px] text-sky-400/80 hover:text-sky-300 transition-colors"
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 text-sky-400/70 absolute left-3.5 top-3.5 transition-colors group-focus-within:text-sky-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400/60 focus:bg-slate-950/70 focus:ring-2 focus:ring-sky-400/20 transition-all backdrop-blur-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* If Sign Up: 4. Confirm Password */}
            {isSignUp && (
              <div className="space-y-1.5 animate-in fade-in duration-300">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-300">
                  Confirm Password *
                </label>
                <div className="relative group">
                  <ShieldCheck className="w-4 h-4 text-sky-400/70 absolute left-3.5 top-3.5 transition-colors group-focus-within:text-sky-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400/60 focus:bg-slate-950/70 focus:ring-2 focus:ring-sky-400/20 transition-all backdrop-blur-md"
                  />
                </div>
              </div>
            )}

            {/* Helper Bar: Remember me + Quick Demo */}
            <div className="flex items-center justify-between pt-1">
              {!isSignUp ? (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900/60 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 hover:text-slate-300">
                    Remember me
                  </span>
                </label>
              ) : (
                <span className="text-[11px] text-slate-400">
                  By joining, you agree to portal terms
                </span>
              )}

              <button
                type="button"
                onClick={handleQuickDemo}
                className="inline-flex items-center gap-1 text-[11px] text-amber-400/90 hover:text-amber-300 transition-colors bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-fill Demo</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleButtonClick}
                className="relative w-full py-3.5 rounded-2xl overflow-hidden bg-gradient-to-r from-sky-500 via-sky-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {/* Expanding Click Water Ripples inside Button */}
                {btnRipples.map((r) => (
                  <span
                    key={r.id}
                    className="absolute rounded-full bg-white/40 pointer-events-none animate-ping"
                    style={{
                      left: r.x - 20,
                      top: r.y - 20,
                      width: 40,
                      height: 40,
                    }}
                  />
                ))}

                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? "Sign Up & Enter Portal" : "Sign In to Dashboard"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Bottom Switcher text */}
          <div className="mt-6 text-center text-xs text-slate-400">
            {isSignUp ? (
              <p>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Sign In instead
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Create one now (Sign Up)
                </button>
              </p>
            )}
          </div>

          {/* Bottom Water Glow Effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent blur-sm" />
        </div>
      </div>
    </main>
  );
}
