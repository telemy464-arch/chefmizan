"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Flame, 
  Clock, 
  ThumbsUp, 
  MessageSquare, 
  Search, 
  Play, 
  TrendingUp, 
  ChevronRight,
  Send,
  Globe,
  X,
  Check
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

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
  comments: Comment[];
  isLead?: boolean;
  isBreaking?: boolean;
}

const LANGUAGES = [
  { code: "en", name: "English (US)", native: "English" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "zh-CN", name: "Chinese (Simplified)", native: "中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "it", name: "Italian", native: "Italiano" }
];

const INITIAL_ARTICLES: Article[] = [
  {
    id: "llivia-enclave-day25",
    title: "Trapped Inside France: The Curious Spanish Enclave of Llívia",
    category: "Border Anomalies",
    summary: "Surrounded entirely by French territory, a lone Spanish town flies the Catalan flag in the heart of the Pyrenees. How a clever loophole in the 1659 treaty outsmarted King Louis XIV.",
    content: `Deep inside the French department of Pyrénées-Orientales lies an extraordinary sovereign territory: Llívia. Although completely surrounded by French soil, Llívia is legally part of Spain's Girona province.

The origin of this territorial anomaly dates back to November 7, 1659, when the Treaty of the Pyrenees was signed between King Louis XIV of France and King Philip IV of Spain to conclude the Franco-Spanish War. Under the agreement, Spain was obligated to cede all villages north of the Pyrenees mountains to the French Crown.

However, Spanish negotiators discovered a historic technicality: during ancient Roman rule and later under Holy Roman Emperor Charles V, Llívia had been formally granted the charter of a 'City' (Ciutat), rather than a village. Spain argued that the treaty explicitly ceded 'villages', not cities. France conceded the point, leaving Llívia an independent sovereign island trapped three miles deep inside France.`,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    youtubeId: "UpHUF-MFQFg",
    publishedAt: "25m ago",
    reads: 1420,
    likes: 128,
    isLead: true,
    isBreaking: true,
    comments: [
      { id: "c1", author: "David Vance", text: "Incredible historical breakdown! The Treaty of the Pyrenees has so many hidden loopholes.", time: "10m ago" },
      { id: "c2", author: "Marcus Aurelius", text: "Love the footage from the YouTube short. Keep these border documentaries coming!", time: "5m ago" }
    ]
  },
  {
    id: "baarle-nassau-puzzle",
    title: "Borders Through Living Rooms: The Mind-Bending Enclaves of Baarle-Nassau",
    category: "Border Anomalies",
    summary: "A town where dining tables sit in the Netherlands while the kitchen resides in Belgium. How 30 interlocking enclaves create the world's most tangled border.",
    content: "Baarle-Hertog and Baarle-Nassau represent the most fragmented international border on earth, consisting of 22 Belgian exclaves surrounded by Dutch soil, and 8 Dutch exclaves inside Belgian territory...",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    youtubeId: "ebWgF6fctmA",
    publishedAt: "1h ago",
    reads: 980,
    likes: 74,
    comments: []
  },
  {
    id: "bir-tawil-unclaimed",
    title: "The Land Nobody Wants: Bir Tawil's Unclaimed Sovereignty",
    category: "Geopolitics",
    summary: "A 2,060-square-kilometer trapezoid of desert between Egypt and Sudan that neither country claims, remaining one of earth's only terra nullius zones.",
    content: "Bir Tawil exists as a legal paradox created by conflicting 1899 political boundaries and 1902 administrative boundaries set by the British Empire...",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    publishedAt: "3h ago",
    reads: 2150,
    likes: 195,
    comments: []
  },
  {
    id: "global-media-headless-revolution",
    title: "Why Modern News Portals Are Switching to Headless Next.js Architecture",
    category: "Technology",
    summary: "Digital publishing giants are moving away from legacy monolithic CMS to high-speed Next.js edge networks for instant global reader experiences.",
    content: "Speed and instant caching define digital engagement. Media giants like Prothom Alo and international publishers adopt headless CMS structures like Quintype and custom React/Next.js stacks...",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    publishedAt: "4h ago",
    reads: 640,
    likes: 52,
    comments: []
  }
];

const CATEGORIES = [
  "Latest",
  "Border Anomalies",
  "Geopolitics",
  "Global News",
  "Historical Treaties",
  "Videos & Shorts",
  "Technology",
  "Investigations"
];

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("Latest");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<{ [key: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [userName, setUserName] = useState("Chef Mizan");

  // Custom Language State
  const [currentLang, setCurrentLang] = useState("en");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portal_articles");
    if (saved) {
      try {
        setArticles(JSON.parse(saved));
      } catch (e) {}
    }

    // Check existing google translate cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);

    if (langCode === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
      window.location.reload();
      return;
    }

    // Set google translate cookies
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/;`;
    window.location.reload();
  };

  const handleLike = (id: string) => {
    const isCurrentlyLiked = likedArticles[id];
    const updated = articles.map(a => {
      if (a.id === id) {
        return { ...a, likes: isCurrentlyLiked ? a.likes - 1 : a.likes + 1 };
      }
      return a;
    });
    setArticles(updated);
    setLikedArticles(prev => ({ ...prev, [id]: !isCurrentlyLiked }));
    localStorage.setItem("portal_articles", JSON.stringify(updated));
  };

  const handleAddComment = (articleId: string) => {
    const text = commentInputs[articleId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: userName || "Global Reader",
      text,
      time: "Just now"
    };

    const updated = articles.map(a => {
      if (a.id === articleId) {
        return { ...a, comments: [newComment, ...a.comments] };
      }
      return a;
    });

    setArticles(updated);
    setCommentInputs(prev => ({ ...prev, [articleId]: "" }));
    localStorage.setItem("portal_articles", JSON.stringify(updated));
  };

  const filteredArticles = selectedCategory === "Latest"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const leadArticle = articles.find(a => a.isLead) || articles[0];
  const sideArticles = articles.filter(a => a.id !== leadArticle.id).slice(0, 3);
  const breakingNews = articles.filter(a => a.isBreaking);

  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans selection:bg-rose-600 selection:text-white">
      
      {/* Top Bar with Date, Universal Language Selector, & Publishing Portal */}
      <header className="border-b border-slate-800 bg-[#090e1a]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 text-sm">
            
            {/* Date & Region Tag */}
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              <span className="hidden sm:inline-block text-slate-600">•</span>
              <span className="hidden sm:inline-block text-rose-400 font-semibold uppercase tracking-wider text-[11px]">
                US & Global Edition
              </span>
            </div>

            {/* Custom English/Native Language Selector Dropdown */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 transition shadow-sm"
                >
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span className="font-semibold">{currentLangObj.name}</span>
                  <span className="text-[10px] bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded border border-slate-700">
                    {currentLangObj.native}
                  </span>
                </button>

                {/* Dropdown Menu in English & Native Script */}
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#0f172a] border border-slate-700/80 rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Select Display Language
                    </div>
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition ${
                          currentLang === lang.code ? "bg-rose-600/20 text-rose-400 font-bold" : "text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.name}</span>
                          <span className="text-[11px] text-slate-500 font-normal">({lang.native})</span>
                        </div>
                        {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-rose-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin Dashboard Link */}
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md shadow-rose-950"
              >
                + Write Post
              </Link>
            </div>
          </div>
        </div>

        {/* Newspaper Masthead */}
        <div className="border-t border-slate-800/80 py-4 bg-[#080c16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex flex-col">
              <Link href="/" className="group inline-flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-serif">
                  CHEF MIZAN <span className="text-rose-500">.</span>
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">
                  THE BORDERS UNFOLDED
                </span>
              </Link>
              <p className="text-xs text-slate-400 mt-0.5">
                Investigative Geopolitics • Border Anomalies • Sovereign History • Global Reports
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-4 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-400">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Domain: <strong>chefmizan.cyou</strong> | YouTube: <strong>@TheBordersUnfolded</strong></span>
            </div>
          </div>
        </div>

        {/* Categories Bar Navigation */}
        <div className="border-t border-slate-800 bg-[#0b1120]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none text-sm font-medium">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs sm:text-sm ${
                      selectedCategory === cat
                        ? "bg-rose-600 text-white font-bold shadow-md shadow-rose-900/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>

              <div className="hidden md:flex items-center pl-4 border-l border-slate-800 text-slate-400">
                <Search className="w-4 h-4 cursor-pointer hover:text-white transition" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breaking News Ribbon */}
      {breakingNews.length > 0 && (
        <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border-b border-rose-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3 text-xs sm:text-sm">
            <span className="bg-rose-600 text-white font-black px-2.5 py-0.5 rounded text-[11px] tracking-wider uppercase flex items-center gap-1 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-current" /> BREAKING
            </span>
            <div className="overflow-hidden whitespace-nowrap text-slate-200 font-medium">
              <span className="hover:text-rose-400 cursor-pointer transition">
                {breakingNews[0].title} — {breakingNews[0].summary}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Newspaper Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section: Lead Story (8 Cols) + Sidebar Spotlight (4 Cols) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Main Lead Story */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="group cursor-pointer" onClick={() => setActiveArticle(leadArticle)}>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 mb-5 shadow-2xl">
                <img 
                  src={leadArticle.image} 
                  alt={leadArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                
                {leadArticle.youtubeId && (
                  <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Play className="w-3.5 h-3.5 fill-white" /> EXCLUSIVE VIDEO
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 rounded bg-rose-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
                    {leadArticle.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight font-serif group-hover:text-rose-400 transition-colors">
                    {leadArticle.title}
                  </h1>
                </div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
                {leadArticle.summary}
              </p>
            </div>

            {/* Engagement Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" /> {leadArticle.publishedAt}
                </span>
                <span>•</span>
                <span>{leadArticle.reads.toLocaleString()} readers viewed</span>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleLike(leadArticle.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                    likedArticles[leadArticle.id]
                      ? "bg-rose-600/20 text-rose-400 border-rose-500/40 font-bold"
                      : "bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${likedArticles[leadArticle.id] ? "fill-rose-500" : ""}`} />
                  <span>{leadArticle.likes}</span>
                </button>

                <button 
                  onClick={() => setActiveArticle(leadArticle)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 text-slate-300 border border-slate-700/60 hover:bg-slate-800 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{leadArticle.comments.length} Comments</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar News Stack */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-rose-600">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" /> Top Investigations
              </h2>
              <span className="text-xs text-slate-400">Live Wire</span>
            </div>

            <div className="divide-y divide-slate-800/80 flex flex-col space-y-4">
              {sideArticles.map(article => (
                <div 
                  key={article.id} 
                  className="pt-4 first:pt-0 group cursor-pointer"
                  onClick={() => setActiveArticle(article)}
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-24 h-24 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 relative border border-slate-800">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                      />
                      {article.youtubeId && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                        {article.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-100 group-hover:text-rose-400 leading-snug line-clamp-2 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span>{article.publishedAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> {article.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* YouTube Channel Spotlight Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-900/40 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-600/20 border border-rose-500/30 mx-auto flex items-center justify-center mb-3">
                <Play className="w-6 h-6 text-rose-500 fill-rose-500" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">The Borders Unfolded</h4>
              <p className="text-xs text-slate-400 mb-4">Investigating geopolitical anomalies, border treaties, and disputed territories worldwide.</p>
              <a 
                href="https://www.youtube.com/@TheBordersUnfolded" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-lg shadow-rose-950 w-full justify-center"
              >
                Watch on YouTube <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Global News Grid */}
        <section className="pt-10">
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-slate-800">
            <h2 className="text-xl font-black text-white tracking-wide">
              {selectedCategory}
            </h2>
            <span className="text-xs text-slate-400">{filteredArticles.length} Reports Published</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div 
                key={article.id}
                className="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition duration-300 group"
              >
                <div>
                  <div 
                    className="relative aspect-video overflow-hidden cursor-pointer bg-slate-950"
                    onClick={() => setActiveArticle(article)}
                  >
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-rose-400 border border-slate-800">
                      {article.category}
                    </div>
                    {article.youtubeId && (
                      <div className="absolute bottom-3 right-3 bg-rose-600 text-white p-1.5 rounded-full shadow-lg">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 
                      onClick={() => setActiveArticle(article)}
                      className="text-base font-bold text-slate-100 group-hover:text-rose-400 leading-snug cursor-pointer line-clamp-2 transition mb-2"
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-slate-800/60 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
                  <span>{article.publishedAt}</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleLike(article.id)}
                      className={`flex items-center gap-1 transition ${likedArticles[article.id] ? "text-rose-400 font-bold" : "hover:text-white"}`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${likedArticles[article.id] ? "fill-rose-500" : ""}`} />
                      <span>{article.likes}</span>
                    </button>
                    <button 
                      onClick={() => setActiveArticle(article)}
                      className="flex items-center gap-1 hover:text-white transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{article.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1120] border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-600/20 text-rose-400 text-xs font-bold mb-3 border border-rose-500/30">
                {activeArticle.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight font-serif mb-4">
                {activeArticle.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-400 pb-5 border-b border-slate-800 mb-6">
                <span>Published: {activeArticle.publishedAt}</span>
                <span>•</span>
                <span>{activeArticle.reads} Reads</span>
              </div>

              {activeArticle.youtubeId ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-slate-800 bg-black">
                  <iframe 
                    src={`https://www.youtube.com/embed/${activeArticle.youtubeId}`} 
                    title={activeArticle.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden mb-6 border border-slate-800">
                  <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-auto object-cover" />
                </div>
              )}

              <div className="prose prose-invert max-w-none text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-8">
                {activeArticle.content}
              </div>

              <div className="flex items-center justify-between py-4 border-y border-slate-800 my-6">
                <button 
                  onClick={() => handleLike(activeArticle.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition ${
                    likedArticles[activeArticle.id]
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-900/40"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Like ({activeArticle.likes})</span>
                </button>

                <div className="text-xs text-slate-400">
                  {activeArticle.comments.length} Reader Comments
                </div>
              </div>

              {/* Reader Comments */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-rose-500" /> Discussion & Analysis
                </h3>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {userName[0]}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input 
                      type="text" 
                      value={commentInputs[activeArticle.id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [activeArticle.id]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleAddComment(activeArticle.id)}
                      placeholder="Write your analysis or thoughts (Press Enter)..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                    <button 
                      onClick={() => handleAddComment(activeArticle.id)}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" /> Post
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-800/60 pt-2">
                  {activeArticle.comments.length === 0 ? (
                    <p className="text-xs text-slate-500 py-3">No comments yet. Be the first to share your perspective!</p>
                  ) : (
                    activeArticle.comments.map(c => (
                      <div key={c.id} className="py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-200">{c.author}</span>
                          <span className="text-[10px] text-slate-500">{c.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300">{c.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#080c16] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-white text-lg font-bold font-serif mb-2">CHEF MIZAN • The Borders Unfolded</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              An independent investigative platform exploring global sovereign anomalies, historical border treaties, and geopolitical curiosities.
            </p>
            <p className="text-slate-500">© 2026 All Rights Reserved | chefmizan.cyou</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-rose-400">Border Anomalies</a></li>
              <li><a href="#" className="hover:text-rose-400">Geopolitical Treaties</a></li>
              <li><a href="#" className="hover:text-rose-400">Investigative Shorts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://www.youtube.com/@TheBordersUnfolded" target="_blank" className="hover:text-rose-400">YouTube: @TheBordersUnfolded</a></li>
              <li><a href="https://facebook.com/Chefmizan7" target="_blank" className="hover:text-rose-400">Facebook: Chefmizan7</a></li>
              <li><a href="https://instagram.com/chefmizan" target="_blank" className="hover:text-rose-400">Instagram: @chefmizan</a></li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}
