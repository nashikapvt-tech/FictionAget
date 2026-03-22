"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────── */
const Icons = {
  Sparkles: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  Brain: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),
  Zap: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Star: ({ filled = false }: { filled?: boolean }) => (
    <svg width="16" height="16" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Layers: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const features = [
  {
    icon: Icons.Brain,
    title: "Deep AI Analysis",
    desc: "Our multi-agent pipeline doesn't just skim — it reads every page, cross-references themes, and builds a semantic understanding of the entire work.",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    icon: Icons.Zap,
    title: "60-Second Summaries",
    desc: "From upload to insight in under a minute. Optimised inference pipelines deliver structured summaries faster than any human speed-reader.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: Icons.Layers,
    title: "Multi-Layer Outputs",
    desc: "Choose your depth: one-paragraph overview, chapter-by-chapter breakdown, key concepts map, or full Socratic Q&A — all from one scan.",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.15)",
  },
  {
    icon: Icons.Globe,
    title: "50+ Languages",
    desc: "Summarise in any language. Read a Japanese novel, get insights in English. Translate summaries on-the-fly with full fidelity.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: Icons.Shield,
    title: "Privacy First",
    desc: "Your books never leave your hands unencrypted. Zero-knowledge processing means our models read but we never store your content.",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.15)",
  },
  {
    icon: Icons.Clock,
    title: "Reading Queue",
    desc: "Build a personal library. Queue books overnight, wake up to a morning brief of everything you planned to read this week.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.15)",
  },
];

const steps = [
  {
    num: "01",
    title: "Drop your book",
    desc: "Upload any PDF, EPUB, or paste a URL. We support 40+ file formats including scanned images via OCR.",
    icon: "📚",
  },
  {
    num: "02",
    title: "Agents go to work",
    desc: "Our AI agent swarm divides the text, analyses in parallel, then synthesises — distilling thousands of pages into structured wisdom.",
    icon: "🤖",
  },
  {
    num: "03",
    title: "Read smarter",
    desc: "Get your personalised brief: key ideas, memorable quotes, action items, and a 10-question quiz to lock in the knowledge.",
    icon: "✨",
  },
];

const testimonials = [
  {
    name: "Priya Malhotra",
    role: "Founder, BookStack VC",
    avatar: "PM",
    avatarColor: "#6366F1",
    quote: "I read 2–3 business books a week for research. PageMind cut that time by 80% without sacrificing depth. It's the only AI tool that actually understands context.",
    books: 247,
  },
  {
    name: "Marcus Chen",
    role: "PhD Researcher, Oxford",
    avatar: "MC",
    avatarColor: "#A855F7",
    quote: "The chapter-level analysis is extraordinary. For my dissertation I processed 40 academic texts in a weekend. The cross-reference feature alone is worth 10x the price.",
    books: 412,
  },
  {
    name: "Sofia Reyes",
    role: "Head of L&D, Stripe",
    avatar: "SR",
    avatarColor: "#F59E0B",
    quote: "We rolled this out to 200 employees. Knowledge retention scores in our quarterly reviews jumped 34%. People are actually reading again — just smarter.",
    books: 89,
  },
];

const plans = [
  {
    name: "Reader",
    price: "0",
    period: "forever",
    desc: "Perfect for curious minds",
    colorBg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.1)",
    cta: "Start free",
    ctaStyle: "border" as const,
    features: ["5 summaries / month", "1-paragraph overview", "10 languages", "PDF & EPUB", "Basic Q&A"],
    missing: ["Chapter analysis", "Audio brief", "Team sharing", "API access"],
  },
  {
    name: "Scholar",
    price: "19",
    period: "per month",
    desc: "For serious learners",
    colorBg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.5)",
    cta: "Start free trial",
    ctaStyle: "primary" as const,
    badge: "Most Popular",
    features: ["Unlimited summaries", "Full chapter breakdown", "50+ languages", "All formats + OCR", "Deep Q&A & quizzes", "Audio brief", "Key concepts map"],
    missing: ["Team sharing", "API access"],
  },
  {
    name: "Library",
    price: "79",
    period: "per month",
    desc: "For teams & organisations",
    colorBg: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.3)",
    cta: "Contact sales",
    ctaStyle: "gold" as const,
    features: ["Everything in Scholar", "Unlimited team seats", "Shared reading queue", "API access", "Custom summaries", "Priority processing", "SSO & audit logs"],
    missing: [],
  },
];

const stats = [
  { value: "4.2M+", label: "Books Summarised" },
  { value: "98%", label: "Accuracy Rating" },
  { value: "127K+", label: "Active Readers" },
  { value: "60s", label: "Avg. Processing Time" },
];

const books = [
  { title: "Atomic Habits", author: "James Clear", color: "#1E3A8A", accent: "#3B82F6", emoji: "⚡" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", color: "#1E1B4B", accent: "#8B5CF6", emoji: "🧠" },
  { title: "The Lean Startup", author: "Eric Ries", color: "#14532D", accent: "#22C55E", emoji: "🚀" },
  { title: "Sapiens", author: "Yuval Noah Harari", color: "#431407", accent: "#F97316", emoji: "🌍" },
  { title: "Zero to One", author: "Peter Thiel", color: "#1C1917", accent: "#D4D4D8", emoji: "🔮" },
  { title: "Deep Work", author: "Cal Newport", color: "#1E293B", accent: "#38BDF8", emoji: "🎯" },
];

const faqs = [
  {
    q: "How accurate are the summaries?",
    a: "Our agent pipeline achieves 98%+ fidelity on structured non-fiction. For fiction we focus on themes, character arcs, and narrative beats. Every summary includes a confidence score.",
  },
  {
    q: "What file formats do you support?",
    a: "PDF, EPUB, MOBI, DOCX, TXT, and URLs. For scanned books we run OCR with 99.2% character accuracy before summarisation.",
  },
  {
    q: "Can I summarise copyrighted books?",
    a: "Yes — you must own or have rights to the content. We process your files, we don't distribute them. All content is deleted from our servers within 24 hours.",
  },
  {
    q: "How does the multi-agent system work?",
    a: "We spawn a swarm of specialised agents: one for narrative structure, one for key concepts, one for quotations, one for sentiment/tone. A synthesis agent then merges and ranks insights by importance.",
  },
];

/* ─────────────────────────────────────────────────────────
   STARS BACKGROUND
───────────────────────────────────────────────────────── */
function Stars() {
  const positions = [
    { top: "8%",  left: "12%", delay: "0s",   size: 2, dur: "3s"  },
    { top: "15%", left: "35%", delay: "0.8s",  size: 3, dur: "4.2s" },
    { top: "22%", left: "72%", delay: "1.6s",  size: 2, dur: "3.8s" },
    { top: "5%",  left: "88%", delay: "2.4s",  size: 2, dur: "5s"   },
    { top: "38%", left: "5%",  delay: "0.4s",  size: 3, dur: "4s"   },
    { top: "45%", left: "92%", delay: "1.2s",  size: 2, dur: "3.4s" },
    { top: "60%", left: "18%", delay: "2s",    size: 2, dur: "4.6s" },
    { top: "70%", left: "80%", delay: "0.6s",  size: 3, dur: "3.2s" },
    { top: "80%", left: "50%", delay: "1.8s",  size: 2, dur: "5.2s" },
    { top: "90%", left: "30%", delay: "3s",    size: 2, dur: "4.8s" },
    { top: "12%", left: "60%", delay: "2.2s",  size: 2, dur: "3.6s" },
    { top: "55%", left: "43%", delay: "1.4s",  size: 3, dur: "4.4s" },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {positions.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            background: "#fff",
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 left-0 right-0"
      style={{
        background: "rgba(8,7,26,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        zIndex: 100,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#6366F1,#A855F7)" }}
          >P</div>
          <span className="font-semibold text-white text-lg tracking-tight">
            Page<span className="text-gradient">Mind</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.2s" }}
              className="text-sm hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Log in
          </button>
          <button className="btn-primary text-white text-sm font-medium px-5 py-2 rounded-lg">
            Get started free
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(8,7,26,0.98)" }}
        >
          {["Features", "How it works", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.7)" }}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="btn-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg mt-2">
            Get started free
          </button>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
function HeroSection() {
  const [email, setEmail] = useState("");
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)" }}
      />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Floating book decorations */}
      <div
        className="absolute top-28 left-[7%] hidden lg:block animate-float"
        style={{ filter: "drop-shadow(0 8px 24px rgba(99,102,241,0.5))" }}
      >
        <div
          className="w-12 h-16 rounded-r flex items-center justify-center text-2xl"
          style={{
            background: "linear-gradient(135deg,#1E1B4B,#312E81)",
            border: "1px solid rgba(99,102,241,0.4)",
            transform: "rotate(-12deg)",
          }}
        >📖</div>
      </div>
      <div
        className="absolute top-36 right-[9%] hidden lg:block animate-float-delayed"
        style={{ filter: "drop-shadow(0 8px 24px rgba(245,158,11,0.4))" }}
      >
        <div
          className="w-10 h-14 rounded-r flex items-center justify-center text-xl"
          style={{
            background: "linear-gradient(135deg,#451A03,#78350F)",
            border: "1px solid rgba(245,158,11,0.4)",
            transform: "rotate(8deg)",
          }}
        >📚</div>
      </div>
      <div
        className="absolute bottom-36 left-[14%] hidden lg:block animate-float-slow"
        style={{ filter: "drop-shadow(0 8px 24px rgba(168,85,247,0.4))" }}
      >
        <div
          className="w-9 h-12 rounded-r flex items-center justify-center text-lg"
          style={{
            background: "linear-gradient(135deg,#2E1065,#4C1D95)",
            border: "1px solid rgba(168,85,247,0.4)",
            transform: "rotate(5deg)",
          }}
        >🔮</div>
      </div>

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-sm font-medium"
        style={{
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.35)",
          color: "#A5B4FC",
        }}
      >
        <Icons.Sparkles />
        Powered by multi-agent AI
      </div>

      {/* Headline */}
      <h1
        className="text-center font-bold leading-[1.1] mb-6 max-w-4xl"
        style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", letterSpacing: "-0.02em" }}
      >
        <span style={{ color: "#F1EEE9" }}>Turn any book into</span>
        <br />
        <span className="text-shimmer">actionable wisdom</span>
        <br />
        <span style={{ color: "#F1EEE9" }}>in </span>
        <span style={{ color: "#F59E0B" }}>60 seconds.</span>
      </h1>

      {/* Subheading */}
      <p
        className="text-center text-lg leading-relaxed mb-10 max-w-2xl"
        style={{ color: "rgba(241,238,233,0.55)" }}
      >
        PageMind deploys a swarm of specialised AI agents that read, analyse, and synthesise
        any book — so you absorb the big ideas without the time investment.
      </p>

      {/* Email capture */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#F1EEE9",
          }}
        />
        <button className="btn-primary text-white font-semibold px-6 py-3.5 rounded-xl text-sm whitespace-nowrap flex items-center justify-center gap-2">
          Start for free <Icons.ArrowRight />
        </button>
      </div>
      <p className="text-xs mb-14" style={{ color: "rgba(255,255,255,0.3)" }}>
        No credit card required · 5 free summaries every month
      </p>

      {/* Preview window */}
      <div
        className="w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(99,102,241,0.08)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ background: "rgba(0,0,0,0.35)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
          <span className="ml-3 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            pagemind.ai — Atomic Habits by James Clear
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-5">
            {/* Book cover */}
            <div
              className="w-14 h-20 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1E3A8A,#1D4ED8)" }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)" }} />
              <span className="relative z-10">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold text-white">Atomic Habits</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#4ADE80", border: "1px solid rgba(34,197,94,0.2)" }}
                >✓ Analysed</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                James Clear · 320 pages · Non-fiction · Business
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(241,238,233,0.7)" }}>
                <strong style={{ color: "#A5B4FC" }}>Core Idea:</strong>{" "}
                Tiny 1% improvements compound into remarkable results over time.
                Identity-based habits (who you want to be) outlast outcome-based goals.
                The 4-step loop — Cue, Craving, Response, Reward — is the engine behind every behaviour.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Key Ideas", value: "12 extracted" },
              { label: "Time saved", value: "4h 20m" },
              { label: "Quiz", value: "10 questions" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-3 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-sm font-semibold" style={{ color: "#A5B4FC" }}>{item.value}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────────── */
function StatsBar() {
  return (
    <section
      className="py-14 px-6 relative"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        zIndex: 1,
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={s.label} className="text-center">
            <div
              className="text-3xl sm:text-4xl font-bold mb-1.5"
              style={{
                color: i === 0 ? "#A5B4FC" : i === 1 ? "#4ADE80" : i === 2 ? "#F59E0B" : "#C084FC",
              }}
            >
              {s.value}
            </div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6 relative overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 section-glow-left pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#C084FC" }}
          >Features</div>
          <h2
            className="font-bold mb-5"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F1EEE9", letterSpacing: "-0.02em" }}
          >
            Reading intelligence,{" "}
            <span className="text-gradient">reimagined</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            Every feature is built by readers obsessed with extracting maximum value from every page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card glass-card-hover rounded-2xl p-7"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.glow, border: `1px solid ${f.color}50`, color: f.color }}
              >
                <f.icon />
              </div>
              <h3 className="font-semibold text-lg mb-2.5" style={{ color: "#F1EEE9" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────────────────── */
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 px-6 relative overflow-hidden" style={{ zIndex: 1 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", color: "#A5B4FC" }}
          >How it works</div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F1EEE9", letterSpacing: "-0.02em" }}
          >
            Three steps to{" "}
            <span className="text-gradient">read smarter</span>
          </h2>
        </div>

        <div className="space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2">
                <span
                  className="text-xs font-bold tracking-widest uppercase mb-3 block"
                  style={{ color: "rgba(99,102,241,0.6)" }}
                >Step {step.num}</span>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#F1EEE9" }}>{step.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{step.desc}</p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div
                  className="w-44 h-44 rounded-3xl flex items-center justify-center text-6xl animate-pulse-glow"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}
                >
                  {step.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   BOOK SHOWCASE
───────────────────────────────────────────────────────── */
function BookShowcase() {
  return (
    <section className="py-20 px-6 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-bold mb-3"
            style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", color: "#F1EEE9", letterSpacing: "-0.02em" }}
          >
            Already analysed{" "}
            <span className="text-gradient">4.2 million books</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>
            From bestsellers to obscure classics — every genre, every language.
          </p>
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-3 justify-start md:justify-center"
          style={{ scrollbarWidth: "none" }}
        >
          {books.map((book) => (
            <div
              key={book.title}
              className="flex-shrink-0 w-36 glass-card-hover cursor-pointer rounded-xl overflow-hidden"
              style={{ border: `1px solid ${book.accent}25` }}
            >
              <div
                className="h-48 flex items-center justify-center text-4xl relative overflow-hidden"
                style={{ background: `linear-gradient(145deg, ${book.color}, ${book.accent}35)` }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(circle at 40% 35%, ${book.accent}25, transparent 65%)` }}
                />
                <span className="relative z-10">{book.emoji}</span>
              </div>
              <div className="p-3">
                <p className="font-semibold text-xs leading-tight mb-1" style={{ color: "#F1EEE9" }}>
                  {book.title}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 section-glow-right pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#FCD34D" }}
          >Testimonials</div>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F1EEE9", letterSpacing: "-0.02em" }}
          >
            Loved by <span style={{ color: "#F59E0B" }}>127,000+</span> readers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col"
            >
              <div className="flex gap-1 mb-5" style={{ color: "#F59E0B" }}>
                {Array.from({ length: 5 }).map((_, i) => <Icons.Star key={i} filled />)}
              </div>
              <p
                className="text-sm leading-relaxed flex-1 mb-7 italic"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm" style={{ color: "#F1EEE9" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{t.role}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold" style={{ color: "#A5B4FC" }}>{t.books}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>books read</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   PRICING
───────────────────────────────────────────────────────── */
function PricingSection() {
  return (
    <section id="pricing" className="py-28 px-6 relative overflow-hidden" style={{ zIndex: 1 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", color: "#A5B4FC" }}
          >Pricing</div>
          <h2
            className="font-bold mb-3"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F1EEE9", letterSpacing: "-0.02em" }}
          >
            Simple, honest pricing
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)" }}>Start free, upgrade when you&apos;re ready.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-8"
              style={{
                background: plan.colorBg,
                border: `1px solid ${plan.border}`,
                boxShadow: plan.badge ? "0 0 80px rgba(99,102,241,0.12)" : "none",
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg,#6366F1,#A855F7)", color: "#fff" }}
                >
                  {plan.badge}
                </div>
              )}

              <p className="font-bold text-lg mb-0.5" style={{ color: "#F1EEE9" }}>{plan.name}</p>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>{plan.desc}</p>

              <div className="flex items-end gap-1 mb-7">
                <span className="text-4xl font-bold" style={{ color: "#F1EEE9" }}>${plan.price}</span>
                <span className="pb-1.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>/ {plan.period}</span>
              </div>

              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold mb-7 transition-all ${plan.ctaStyle === "primary" ? "btn-primary text-white" : ""}`}
                style={
                  plan.ctaStyle === "border"
                    ? { border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }
                    : plan.ctaStyle === "gold"
                    ? { border: "1px solid rgba(245,158,11,0.4)", color: "#F59E0B" }
                    : {}
                }
              >
                {plan.cta}
              </button>

              <div className="space-y-3.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                    <span className="flex-shrink-0" style={{ color: "#4ADE80" }}><Icons.Check /></span>
                    {f}
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
                    <span className="flex-shrink-0 opacity-25"><Icons.Check /></span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 px-6 relative" style={{ zIndex: 1 }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="font-bold mb-3"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#F1EEE9", letterSpacing: "-0.02em" }}
          >
            Frequently asked questions
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>
            Everything you need to know about PageMind.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all"
              style={{
                border: open === i ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between p-6">
                <span className="font-medium text-base pr-4" style={{ color: "#F1EEE9" }}>{faq.q}</span>
                <span
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <Icons.ChevronDown />
                </span>
              </div>
              {open === i && (
                <div className="px-6 pb-6 -mt-2">
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="py-20 px-6 relative" style={{ zIndex: 1 }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl p-12 sm:p-16 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.1) 50%, rgba(245,158,11,0.07) 100%)",
            border: "1px solid rgba(99,102,241,0.22)",
            boxShadow: "0 0 120px rgba(99,102,241,0.08), inset 0 0 60px rgba(99,102,241,0.04)",
          }}
        >
          {/* Orbit rings */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none orbit-ring"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none orbit-ring-reverse"
          />

          <div className="relative z-10">
            <div className="text-5xl mb-6">📚</div>
            <h2
              className="font-bold mb-5"
              style={{ fontSize: "clamp(1.75rem,4vw,3rem)", color: "#F1EEE9", letterSpacing: "-0.02em" }}
            >
              Start reading smarter <span className="text-gradient">today</span>
            </h2>
            <p className="mb-8 max-w-xl mx-auto text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Join 127,000 readers who have reclaimed their time without sacrificing intellectual depth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-white font-semibold px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2">
                Get started for free <Icons.ArrowRight />
              </button>
              <button
                className="font-medium px-8 py-4 rounded-xl text-base transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }}
              >
                View live demo
              </button>
            </div>
            <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              Free forever · No credit card · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      className="py-14 px-6 relative"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg,#6366F1,#A855F7)" }}
              >P</div>
              <span className="font-semibold text-white text-lg tracking-tight">
                Page<span className="text-gradient">Mind</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
              Multi-agent AI that transforms books into actionable wisdom. Read more, retain more, achieve more.
            </p>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "API", "Changelog", "Status"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press", "Partners"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.32)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            © 2026 PageMind. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            <span>Built with</span>
            <span style={{ color: "#6366F1" }}>♥</span>
            <span>for readers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main style={{ background: "#08071A", minHeight: "100vh" }}>
      <Stars />
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <BookShowcase />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
