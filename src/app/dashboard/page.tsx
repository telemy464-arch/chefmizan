"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, CheckCircle2, Sparkles, Lock, KeyRound, Edit, Trash2 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  youtubeId?: string;
  publishedAt: string;
  reads: number;
  likes: number;
  comments: any[];
  isLead?: boolean;
  isBreaking?: boolean;
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Border Anomalies");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [isLead, setIsLead] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const existing = localStorage.getItem("portal_articles");
    if (existing) {
      try {
        setArticles(JSON.parse(existing));
      } catch (err) {}
    }
  };

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

  const handleEditClick = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setSummary(article.summary);
    setContent(article.content);
    setImageUrl(article.image);
    setYoutubeId(article.youtubeId || "");
    setIsLead(!!article.isLead);
    setIsBreaking(!!article.isBreaking);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      localStorage.setItem("portal_articles", JSON.stringify(updated));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setImageUrl("");
    setYoutubeId("");
    setIsLead(false);
    setIsBreaking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      // Update existing post
      const updated = articles.map(a => {
        if (a.id === editingId) {
          return {
            ...a,
            title,
            category,
            summary,
            content,
            image: imageUrl || a.image,
            youtubeId: youtubeId.trim() || undefined,
            isLead,
            isBreaking
          };
        }
        return a;
      });
      setArticles(updated);
      localStorage.setItem("portal_articles", JSON.stringify(updated));
      setEditingId(null);
    } else {
      // Create new post
      const newPost: Article = {
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
      const updated = [newPost, ...articles];
      setArticles(updated);
      localStorage.setItem("portal_articles", JSON.stringify(updated));
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      handleCancelEdit();
      window.location.href = "/";
    }, 1200);
  };

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
      <div className="max-w-4xl mx-auto">
        
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

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2 font-serif">
                <PlusCircle className="w-6 h-6 text-rose-500" /> 
                {editingId ? "Edit Existing Story" : "Create & Publish New Story"}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {editingId ? "Modify your headline, video ID, or story content and save." : "Fill out details to publish a new investigation live on the frontpage."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 
              {editingId ? "Story updated successfully!" : "Article published successfully!"} Redirecting to frontpage...
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
              <Sparkles className="w-4 h-4" /> 
              {editingId ? "Save & Update Story" : "Publish Story Instantly"}
            </button>
          </form>
        </div>

        {/* Existing Published Articles List with Edit & Delete Actions */}
        {articles.length > 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Manage Published Stories ({articles.length})
            </h2>

            <div className="divide-y divide-slate-800/80">
              {articles.map(article => (
                <div key={article.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex gap-3 items-center">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {article.title}
                      </h4>
                      <span className="text-[11px] text-slate-500">{article.publishedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleEditClick(article)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(article.id)}
                      className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-rose-900/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
