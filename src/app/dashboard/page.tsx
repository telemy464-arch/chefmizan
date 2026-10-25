"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChefHat,
  LogOut,
  Calendar,
  Utensils,
  Award,
  ShieldCheck,
  User,
  Clock,
  CheckCircle2,
  Bell,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Chef Mizan");
  const [userRole, setUserRole] = useState("Master Chef & Owner");
  const [userEmail, setUserEmail] = useState("chef@chefmizan.cyou");

  useEffect(() => {
    // Read user from localStorage if saved during login
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("chef_mizan_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.name) setUserName(parsed.name);
          if (parsed.role) setUserRole(parsed.role);
          if (parsed.emailOrPhone || parsed.email) setUserEmail(parsed.emailOrPhone || parsed.email);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("chef_mizan_user");
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-amber-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold text-white tracking-wider uppercase block">
                Chef Mizan Portal
              </span>
              <span className="text-xs text-sky-400 font-mono">chefmizan.cyou</span>
            </div>
          </div>

          {/* User profile & actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/10">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-sm">
                {userName.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white leading-tight flex items-center gap-1.5">
                  {userName}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </p>
                <p className="text-xs text-sky-300/80 font-mono">{userRole}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 border border-white/10 hover:border-rose-500/40 text-xs font-semibold text-slate-300 hover:text-rose-300 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-950/70 via-slate-900 to-amber-950/40 border border-white/10 p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Authenticated Session
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Welcome to Your Dashboard, <br />
              <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-amber-400 bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              You are signed in to the official <strong>chefmizan.cyou</strong> system. Manage your table reservations, explore exclusive culinary recipes, and track special event bookings.
            </p>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Reservations</span>
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white font-serif">3</p>
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Next dining: Oct 28, 7:30 PM</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Master Recipes</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white font-serif">14</p>
            <p className="text-xs text-slate-400 mt-2">Signature culinary dishes</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Membership</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-400 font-serif">VIP</p>
            <p className="text-xs text-purple-300 mt-2">Active Gold Tier privileges</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Domain Status</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-400 font-mono">Active</p>
            <p className="text-xs text-slate-400 mt-2">chefmizan.cyou</p>
          </div>
        </div>

        {/* Section: Upcoming Reservations & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservation Card */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Upcoming Dining Reservations</h3>
                <p className="text-xs text-slate-400">Your booked private tables at Chef Mizan</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                Confirmed
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Royal Table - Chef's Tasting Menu</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Booking ID: <strong className="text-amber-400">CMZ-855363</strong></p>
                    <p className="text-xs text-slate-500 mt-0.5">Date: October 28, 2026 • 07:30 PM • 4 Guests</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                    Ready
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Truffle Salmon & Wagyu Special</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Booking ID: <strong className="text-amber-400">CMZ-392104</strong></p>
                    <p className="text-xs text-slate-500 mt-0.5">Date: November 05, 2026 • 08:00 PM • 2 Guests</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-950 border border-sky-500/30 text-sky-300 text-xs font-medium">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Profile Summary */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-md space-y-6">
            <h3 className="text-lg font-serif font-bold text-white">Profile Details</h3>
            
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <p className="text-slate-400 uppercase tracking-wider text-[10px]">Registered Name</p>
                <p className="font-semibold text-white mt-1 text-sm">{userName}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <p className="text-slate-400 uppercase tracking-wider text-[10px]">Email / Phone</p>
                <p className="font-semibold text-sky-300 mt-1">{userEmail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <p className="text-slate-400 uppercase tracking-wider text-[10px]">Portal Domain</p>
                <p className="font-semibold text-amber-400 font-mono mt-1">https://chefmizan.cyou</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold tracking-wider uppercase text-slate-300 transition-all text-center flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
