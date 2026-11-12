"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, CheckCircle2, Sparkles, Lock, KeyRound } from "lucide-react";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Border Anomalies");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [isLead, setIsLead] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [success, setSuccess] = useState(false);

  // Strictly ONLY User PINs: "6492" (or "Mizanur@@@777") - NO HINTS GIVEN
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim();
    if (clean === "6492" || clean === "Mizanur@@@777") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPost = {
      id: "post-" + Date.now(),
      title,
      category,
      summary,
      content,
      image: imageUrl || "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
      youtubeId: youtubeId.trim() || undefined,
      publishedAt: "Just now",
      reads: 1,
      likes: 0,
      comments: [],
      isLead,
      isBreaking
    };

    const existing = localStorage.getItem("portal_articles");
    let articles = [];
    if (existing) {
      try {
        articles = JSON.parse(existing);
      } catch (err) {}
    }

    const updated = [newPost, ...articles];
    localStorage.setItem("portal_articles", JSON.stringify(updated));

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      window.location.href = "/";
    }, 1200);
  };

  // 100% Secure Gatekeeper with NO hints, clues, or default texts
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4 selection:bg-rose-600">
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-sm w-full p-8 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-600/20 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white font-serif mb-1">Editor Gatekeeper</h2>
          <p className="text-xs text-slate-400 mb-6">
            Enter authorized security PIN to access the dispatch desk.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input 
              type="password"
              autoFocus
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-center text-white text-xl tracking-widest font-mono focus:outline-none focus:border-rose-500 transition shadow-inner"
            />

            {pinError && (
              <p className="text-xs text-rose-400 font-semibold bg-rose-950/40 border border-rose-900/50 py-2 rounded-xl">
                Access Denied. Incorrect Security Key.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-rose-950 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" /> Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
              ← Return to Frontpage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <Link href="/" className="inline-flex items-center gap-2 text-rose-400 hover:text-white transition text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Return to News Portal (Home)
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-rose-600/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full font-bold">
              Chef Mizan Dispatch Desk
            </span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs text-slate-500 hover:text-rose-400 transition"
            >
              Lock
            </button>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2 font-serif">
              <PlusCircle className="w-6 h-6 text-rose-500" /> Create & Publish New Story
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Fill out the headline, video ID, and investigation details to publish live on the frontpage.
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Article published successfully! Redirecting to frontpage...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Headline / Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Trapped Inside France: The Curious Spanish Enclave of Llívia..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Border Anomalies">Border Anomalies</option>
                  <option value="Geopolitics">Geopolitics</option>
                  <option value="Global News">Global News</option>
                  <option value="Technology">Technology</option>
                  <option value="Historical Treaties">Historical Treaties</option>
                  <option value="Videos & Shorts">Videos & Shorts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">YouTube Video ID (Optional)</label>
                <input 
                  type="text" 
                  value={youtubeId}
                  onChange={(e) => setYoutubeId(e.target.value)}
                  placeholder="e.g. UpHUF-MFQFg or ebWgF6fctmA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Cover Image URL</label>
              <input 
                type="url" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Brief Summary</label>
              <textarea 
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="2-3 sentences teaser displayed on the frontpage grid..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Full Story / Investigation Text</label>
              <textarea 
                rows={6}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the full report, historical facts, and analysis here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isLead} 
                  onChange={(e) => setIsLead(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-rose-600 focus:ring-rose-500"
                />
                Feature as Lead Banner Story
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isBreaking} 
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-rose-600 focus:ring-rose-500"
                />
                Display in Breaking Ticker Ribbon
              </label>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-950 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Publish Story Instantly
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
