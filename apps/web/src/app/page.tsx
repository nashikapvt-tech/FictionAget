"use client";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   COLOUR PALETTE
───────────────────────────────────────────────────────── */
const C = {
  /* light surfaces */
  bgParchment:  "#FAF6EE",
  bgCream:      "#F4EEE2",
  bgCard:       "#FFFDF7",
  /* dark surfaces */
  bgEspresso:   "#18100A",
  bgWalnut:     "#221712",
  bgBark:       "#2E1E14",
  /* text on light bg */
  ink:          "#18100A",
  sepia:        "#5C4733",
  muted:        "#998674",
  /* text on dark bg */
  parchment:    "#EDE0CC",
  parchmentDim: "rgba(237,224,204,0.55)",
  parchmentMute:"rgba(237,224,204,0.35)",
  /* accents */
  gold:         "#A0813A",
  copper:       "#C49A3C",
  /* borders light bg */
  borderFaint:  "rgba(92,71,51,0.10)",
  borderLight:  "rgba(92,71,51,0.18)",
  borderMedium: "rgba(92,71,51,0.28)",
  /* borders dark bg */
  borderGoldDim:"rgba(196,154,60,0.13)",
  borderGold:   "rgba(196,154,60,0.28)",
};

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const features = [
  { numeral:"I",   title:"Deep AI Analysis",     desc:"Our multi-agent pipeline reads every page, cross-references themes, and builds a full semantic map of the work — never merely a surface skim." },
  { numeral:"II",  title:"60-Second Summaries",  desc:"From upload to insight in under a minute. Parallel inference pipelines distil thousands of pages into structured wisdom at extraordinary speed." },
  { numeral:"III", title:"Multi-Layer Outputs",  desc:"Choose your depth: a single-paragraph précis, chapter-by-chapter breakdown, key concepts map, or a full Socratic Q&A — all from one scan." },
  { numeral:"IV",  title:"50+ Languages",        desc:"Read a Japanese novel, receive insights in English. Translate summaries with full semantic fidelity across more than fifty languages." },
  { numeral:"V",   title:"Privacy by Design",    desc:"Zero-knowledge processing. Your books are analysed in isolated, ephemeral sessions and permanently deleted within 24 hours." },
  { numeral:"VI",  title:"Reading Queue",        desc:"Build a personal library. Queue a dozen books overnight and wake to a morning brief of everything you intended to absorb this week." },
];

const steps = [
  { numeral:"I",   title:"Submit your book",      desc:"Upload any PDF, EPUB, MOBI, or paste a URL. Forty file formats supported, including scanned pages via optical character recognition." },
  { numeral:"II",  title:"The agents deliberate", desc:"A swarm of specialised AI agents divides the text, analyses in parallel — one for structure, one for ideas, one for tone — then a synthesis agent reconciles all findings." },
  { numeral:"III", title:"Wisdom, delivered",     desc:"Receive your personalised brief: key ideas, memorable passages, actionable items, and a ten-question retention quiz to cement what you have learned." },
];

const testimonials = [
  { quote:"I read two or three business books each week for investment research. PageMind reduced that time by eighty percent without sacrificing a single insight. It is the only AI tool that genuinely understands context.", name:"Priya Malhotra",  role:"Founder, BookStack VC",              initials:"PM", books:247 },
  { quote:"For my dissertation I processed forty academic texts over a single weekend. The chapter-level analysis is extraordinary, and the cross-reference capability alone justifies the subscription ten times over.", name:"Marcus Chen",    role:"DPhil Researcher, Oxford",           initials:"MC", books:412 },
  { quote:"We deployed this across two hundred employees. Knowledge-retention scores in our quarterly reviews rose thirty-four percent. People are reading again — only more deliberately.", name:"Sofia Reyes",    role:"Head of Learning & Development, Stripe", initials:"SR", books:89  },
];

const plans = [
  {
    name:"Reader",  latin:"Lector",      price:"0",  period:"free, perpetually", desc:"For the curious mind",
    features:["5 summaries per month","Single-paragraph précis","Ten languages","PDF & EPUB","Basic Q&A"],
    missing:["Chapter analysis","Audio digest","Team library","API access"],
    style:"outline" as const,
  },
  {
    name:"Scholar", latin:"Scholaris",   price:"19", period:"per month", desc:"For the serious reader", badge:"Most Chosen",
    features:["Unlimited summaries","Full chapter breakdown","50+ languages","All formats + OCR","Deep Q&A & quizzes","Audio digest","Concept map"],
    missing:["Team library","API access"],
    style:"featured" as const,
  },
  {
    name:"Library", latin:"Bibliotheca", price:"79", period:"per month", desc:"For teams & institutions",
    features:["Everything in Scholar","Unlimited seats","Shared reading queue","Full API access","Custom summaries","Priority processing","SSO & audit logs"],
    missing:[],
    style:"gold" as const,
  },
];

const stats = [
  { value:"4.2M+", label:"Books Analysed"   },
  { value:"98%",   label:"Accuracy Rating"  },
  { value:"127K+", label:"Active Scholars"  },
  { value:"60s",   label:"Avg. Processing"  },
];

const books = [
  { title:"Atomic Habits",           author:"James Clear",       spine:"#1B2A4A", accent:"#4A7CB5", emoji:"⚡" },
  { title:"Thinking, Fast and Slow", author:"Daniel Kahneman",   spine:"#2B1A3A", accent:"#7A5BAA", emoji:"🧠" },
  { title:"The Lean Startup",        author:"Eric Ries",          spine:"#1A3020", accent:"#4A8C5C", emoji:"🚀" },
  { title:"Sapiens",                 author:"Yuval Noah Harari",  spine:"#3A1A0A", accent:"#C47A3A", emoji:"🌍" },
  { title:"Zero to One",             author:"Peter Thiel",        spine:"#1A1A1A", accent:"#8C8C8C", emoji:"◆" },
  { title:"Deep Work",               author:"Cal Newport",        spine:"#1A2A3A", accent:"#4A7C9A", emoji:"🎯" },
];

const faqs = [
  { q:"How accurate are the summaries?",            a:"Our agent pipeline achieves above 98% fidelity on structured non-fiction. For fiction, the focus is themes, character arcs, and narrative arc. Every summary carries a confidence score." },
  { q:"Which file formats are supported?",           a:"PDF, EPUB, MOBI, DOCX, TXT, and web URLs. For scanned physical books we apply OCR at 99.2% character accuracy before summarisation begins." },
  { q:"May I summarise copyrighted works?",          a:"Yes — you must own or hold rights to the material. We process your files and do not distribute them. All content is permanently deleted from our servers within 24 hours of processing." },
  { q:"How does the multi-agent architecture work?", a:"We instantiate a swarm of specialised agents: one for narrative structure, one for key concepts, one for notable passages, one for sentiment and tone. A synthesis agent reconciles and ranks all findings by significance." },
];

/* ─────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────── */
const ChevronDown = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);
const ArrowRight = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
const Check = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   ORNAMENT DIVIDER
───────────────────────────────────────────────────────── */
function Ornament({ symbol = "§", onDark = false }: { symbol?: string; onDark?: boolean }) {
  const color = onDark ? "rgba(196,154,60,0.32)" : "rgba(160,129,58,0.32)";
  return (
    <div className="flex items-center gap-4 my-2" style={{ color }}>
      <div style={{ flex: 1, borderTop: `1px solid ${color}` }} />
      <span style={{ fontSize: "0.85rem", fontStyle: "italic" }}>{symbol}</span>
      <div style={{ flex: 1, borderTop: `1px solid ${color}` }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   NAVBAR  — now dark espresso
───────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(24,16,10,0.93)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: `1px solid ${C.borderGoldDim}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: C.parchment, color: C.bgEspresso, fontFamily: "Georgia, serif" }}
          >
            P
          </div>
          <span style={{ fontSize: "1.1rem", color: C.parchment, fontFamily: "Georgia, serif" }}>
            Page<em>Mind</em>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label:"Features", href:"#features" },
            { label:"Method",   href:"#method"   },
            { label:"Pricing",  href:"#pricing"  },
            { label:"FAQ",      href:"#faq"      },
          ].map(({ label, href }) => (
            <a
              key={label} href={href}
              className="label-caps transition-colors"
              style={{ color: C.parchmentMute }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = C.parchment)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = C.parchmentMute)}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="label-caps px-4 py-2 rounded" style={{ color: C.parchmentMute }}>
            Sign in
          </button>
          <button
            className="label-caps px-5 py-2.5 rounded transition-all"
            style={{
              background: C.parchment, color: C.bgEspresso,
              fontFamily: "Georgia, serif", fontSize: "0.65rem", letterSpacing: "0.14em",
            }}
          >
            Begin reading →
          </button>
        </div>

        <button className="md:hidden" style={{ color: C.parchment }} onClick={() => setOpen(!open)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 py-5 flex flex-col gap-5"
          style={{ background: C.bgEspresso, borderTop: `1px solid ${C.borderGoldDim}` }}
        >
          {["Features","Method","Pricing","FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="label-caps" style={{ color: C.parchmentDim }}
              onClick={() => setOpen(false)}
            >{item}</a>
          ))}
          <button className="label-caps px-5 py-3 rounded mt-1"
            style={{ background: C.parchment, color: C.bgEspresso, fontFamily: "Georgia, serif", fontSize: "0.65rem" }}
          >
            Begin reading →
          </button>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO  — now warm parchment / cream
───────────────────────────────────────────────────────── */
function Hero() {
  const [email, setEmail] = useState("");
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden"
      style={{ background: C.bgParchment }}
    >
      {/* Subtle warm vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(160,129,58,0.07) 0%, transparent 65%)" }}
      />
      <div className="grid-paper absolute inset-0 pointer-events-none" />

      {/* Floating book spines */}
      <div className="absolute top-32 left-[7%] hidden lg:block animate-float-a"
        style={{ filter: "drop-shadow(0 4px 12px rgba(92,71,51,0.18))" }}
      >
        <div className="w-11 h-[3.8rem] rounded-sm flex items-center justify-center text-2xl"
          style={{ background: "linear-gradient(180deg,#1B2A4A,#243560)", border: "1px solid rgba(74,124,181,0.3)" }}
        >⚡</div>
      </div>
      <div className="absolute top-44 right-[8%] hidden lg:block animate-float-b"
        style={{ filter: "drop-shadow(0 4px 12px rgba(92,71,51,0.18))" }}
      >
        <div className="w-10 h-[3.4rem] rounded-sm flex items-center justify-center text-xl"
          style={{ background: "linear-gradient(180deg,#3A1A0A,#5C2E14)", border: "1px solid rgba(196,122,58,0.35)" }}
        >🌍</div>
      </div>
      <div className="absolute bottom-40 left-[14%] hidden lg:block animate-float-c"
        style={{ filter: "drop-shadow(0 4px 12px rgba(92,71,51,0.15))" }}
      >
        <div className="w-9 h-[3rem] rounded-sm flex items-center justify-center text-lg"
          style={{ background: "linear-gradient(180deg,#2B1A3A,#3D2558)", border: "1px solid rgba(122,91,170,0.3)" }}
        >🧠</div>
      </div>

      {/* Edition label */}
      <div className="mb-8">
        <span className="label-caps" style={{ color: C.muted, letterSpacing: "0.22em" }}>
          Est. 2026 &ensp;·&ensp; AI Reading Intelligence
        </span>
      </div>

      <div className="w-full max-w-2xl mb-6"><Ornament symbol="✦" /></div>

      {/* Headline — ink on parchment */}
      <h1
        className="text-center font-bold leading-[1.08] mb-6 max-w-3xl"
        style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)", color: C.ink, letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}
      >
        Turn any book into
        <br />
        <em className="text-gradient-sepia" style={{ fontStyle: "italic" }}>actionable wisdom</em>
        <br />
        in <span style={{ color: C.gold }}>sixty seconds.</span>
      </h1>

      <div className="w-full max-w-2xl mb-8"><Ornament symbol="✦" /></div>

      <p className="text-center mb-10 max-w-xl leading-relaxed"
        style={{ fontSize: "1.05rem", color: C.muted, fontStyle: "italic", fontFamily: "Georgia, serif" }}
      >
        PageMind deploys a swarm of specialised AI agents that read, analyse,
        and synthesise any book — so you may absorb the grand ideas without
        surrendering the hours.
      </p>

      {/* Email capture */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-5">
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 px-5 py-3.5 rounded text-sm outline-none"
          style={{
            background: C.bgCard,
            border: `1px solid ${C.borderLight}`,
            color: C.ink, fontFamily: "Georgia, serif",
          }}
        />
        <button
          className="btn-ink px-6 py-3.5 rounded text-sm whitespace-nowrap flex items-center justify-center gap-2 label-caps"
          style={{ fontSize: "0.65rem" }}
        >
          Begin reading <ArrowRight />
        </button>
      </div>

      <p className="label-caps mb-16" style={{ color: C.muted, fontSize: "0.6rem" }}>
        No card required &ensp;·&ensp; Five summaries free each month
      </p>

      {/* Preview card — dark on light page */}
      <div className="w-full max-w-2xl rounded-xl overflow-hidden"
        style={{
          background: C.bgEspresso,
          border: `1px solid ${C.borderGoldDim}`,
          boxShadow: "0 24px 60px rgba(92,71,51,0.16), 0 4px 16px rgba(92,71,51,0.08)",
        }}
      >
        <div className="flex items-center gap-2 px-5 py-3"
          style={{ background: "rgba(0,0,0,0.3)", borderBottom: `1px solid ${C.borderGoldDim}` }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#FFBD2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#28C840" }} />
          <span className="ml-3 label-caps" style={{ color: C.parchmentMute, fontSize: "0.6rem" }}>
            pagemind.ai &ensp;—&ensp; Atomic Habits · James Clear
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-5">
            <div className="w-14 h-20 rounded-sm flex-shrink-0 flex items-center justify-center text-2xl relative overflow-hidden"
              style={{ background: "linear-gradient(180deg,#1B2A4A,#243560)" }}
            >
              <div className="absolute inset-0" style={{ background:"radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08), transparent 55%)" }} />
              <span className="relative z-10">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                <span style={{ fontFamily:"Georgia, serif", color:C.parchment, fontWeight:600 }}>Atomic Habits</span>
                <span className="label-caps px-2 py-0.5 rounded-sm"
                  style={{ background:"rgba(40,200,64,0.12)", color:"#5DCE71", fontSize:"0.58rem", border:"1px solid rgba(40,200,64,0.2)" }}
                >✓ Analysed</span>
              </div>
              <p className="label-caps mb-3" style={{ color:C.parchmentMute, fontSize:"0.6rem" }}>
                James Clear &ensp;·&ensp; 320 pages &ensp;·&ensp; Self-Improvement
              </p>
              <p style={{ fontSize:"0.88rem", lineHeight:1.7, color:C.parchmentDim, fontFamily:"Georgia, serif" }}>
                <em style={{ color:C.copper }}>Core thesis:</em>{" "}
                Marginal 1% improvements compound into extraordinary results over time. Identity-based habits outlast outcome-based goals. The four-stage loop of Cue, Craving, Response, and Reward governs every human behaviour.
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3"
            style={{ borderTop:`1px solid ${C.borderGoldDim}`, paddingTop:"1.25rem" }}
          >
            {[
              { label:"Key Ideas", value:"12 extracted" },
              { label:"Time Saved", value:"4 h 20 m" },
              { label:"Quiz", value:"10 questions" },
            ].map(item => (
              <div key={item.label} className="rounded text-center py-3"
                style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.borderGoldDim}` }}
              >
                <div style={{ color:C.copper, fontFamily:"Georgia, serif", fontSize:"0.9rem", fontWeight:600 }}>{item.value}</div>
                <div className="label-caps mt-0.5" style={{ color:C.parchmentMute, fontSize:"0.55rem" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   STATS BAR  — now dark espresso
───────────────────────────────────────────────────────── */
function StatsBar() {
  return (
    <section style={{
      background: C.bgEspresso,
      borderTop: `1px solid ${C.borderGoldDim}`,
      borderBottom: `1px solid ${C.borderGoldDim}`,
    }}>
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={s.label} className="text-center">
            <div style={{
              fontFamily:"Georgia, serif", fontSize:"2.4rem", fontWeight:700,
              color: i % 2 === 0 ? C.parchment : C.copper,
              letterSpacing:"-0.02em",
            }}>
              {s.value}
            </div>
            <div className="label-caps mt-1" style={{ color:C.parchmentMute }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FEATURES  — now dark espresso
───────────────────────────────────────────────────────── */
function Features() {
  return (
    <section id="features" style={{ background: C.bgWalnut, position:"relative" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 70% 50% at 50% 0%, rgba(160,129,58,0.05) 0%, transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 py-28 relative">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color:C.copper }}>Features</p>
          <h2 style={{
            fontFamily:"Georgia, serif", fontSize:"clamp(2rem,4vw,3rem)",
            color:C.parchment, letterSpacing:"-0.02em", lineHeight:1.15,
          }}>
            Reading intelligence,{" "}
            <em className="text-gradient-sepia">reconceived.</em>
          </h2>
          <div className="max-w-sm mx-auto mt-6"><Ornament onDark /></div>
          <p className="mt-4 max-w-lg mx-auto"
            style={{ color:C.parchmentDim, fontStyle:"italic", lineHeight:1.75, fontSize:"1rem" }}
          >
            Every capability exists to serve one end: that you absorb more, in less time, and retain it for longer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.numeral} className="card-espresso rounded-xl p-7">
              <div className="label-caps mb-5" style={{ color:C.copper, fontSize:"0.65rem", letterSpacing:"0.18em" }}>
                {f.numeral}.
              </div>
              <h3 style={{ fontFamily:"Georgia, serif", fontSize:"1.1rem", color:C.parchment, marginBottom:"0.75rem", fontWeight:700 }}>
                {f.title}
              </h3>
              <p style={{ fontSize:"0.88rem", lineHeight:1.75, color:C.parchmentDim, fontStyle:"italic" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   METHOD  — now dark espresso
───────────────────────────────────────────────────────── */
function Method() {
  return (
    <section id="method" style={{ background: C.bgEspresso, position:"relative" }}>
      <div className="absolute inset-0 grid-paper pointer-events-none" style={{ opacity:0.06 }} />
      <div className="max-w-5xl mx-auto px-6 py-28 relative">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color:C.copper }}>Method</p>
          <h2 style={{
            fontFamily:"Georgia, serif", fontSize:"clamp(2rem,4vw,3rem)",
            color:C.parchment, letterSpacing:"-0.02em",
          }}>
            Three steps to read{" "}
            <em className="text-gradient-sepia">with greater purpose.</em>
          </h2>
          <div className="max-w-sm mx-auto mt-6"><Ornament onDark /></div>
        </div>

        <div className="space-y-20">
          {steps.map((step, i) => (
            <div key={step.numeral}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2">
                <p className="label-caps mb-3" style={{ color:C.copper, fontSize:"0.65rem" }}>
                  Chapter {step.numeral}
                </p>
                <h3 style={{ fontFamily:"Georgia, serif", fontSize:"1.5rem", color:C.parchment, marginBottom:"1rem", fontWeight:700 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize:"0.95rem", lineHeight:1.8, color:C.parchmentDim, fontStyle:"italic" }}>
                  {step.desc}
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-40 h-40 rounded-2xl flex items-center justify-center"
                  style={{ background:C.bgWalnut, border:`1px solid ${C.borderGoldDim}` }}
                >
                  <span style={{
                    fontFamily:"Georgia, serif", fontSize:"4.5rem",
                    fontStyle:"italic", color:C.copper, opacity:0.45, lineHeight:1,
                  }}>
                    {step.numeral}
                  </span>
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
   BOOK SHOWCASE  — now light parchment
───────────────────────────────────────────────────────── */
function BookShowcase() {
  return (
    <section className="py-20 px-6 overflow-hidden"
      style={{ background: C.bgCream, borderTop:`1px solid ${C.borderFaint}`, borderBottom:`1px solid ${C.borderFaint}` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="label-caps mb-3" style={{ color:C.gold }}>The Collection</p>
          <h2 style={{
            fontFamily:"Georgia, serif", fontSize:"clamp(1.75rem,3.5vw,2.4rem)",
            color:C.ink, letterSpacing:"-0.02em",
          }}>
            Already across{" "}
            <em className="text-gradient-sepia">4.2 million volumes.</em>
          </h2>
          <p className="mt-3" style={{ color:C.muted, fontStyle:"italic", fontSize:"0.9rem" }}>
            Every genre. Every language. Every era of human thought.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 justify-start md:justify-center" style={{ scrollbarWidth:"none" }}>
          {books.map(book => (
            <div key={book.title}
              className="flex-shrink-0 w-32 rounded-sm overflow-hidden cursor-pointer"
              style={{
                background: C.bgCard,
                border:`1px solid ${C.borderLight}`,
                transition:"all 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(92,71,51,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div className="h-44 relative flex items-center justify-center text-3xl"
                style={{ background:`linear-gradient(180deg, ${book.spine}, ${book.accent}40)` }}
              >
                <div className="absolute inset-0" style={{ background:`radial-gradient(circle at 40% 30%, rgba(255,255,255,0.07), transparent 60%)` }} />
                <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background:`rgba(255,255,255,0.08)` }} />
                <span className="relative z-10">{book.emoji}</span>
              </div>
              <div className="p-3">
                <p style={{ fontFamily:"Georgia, serif", fontSize:"0.72rem", color:C.ink, fontWeight:600, lineHeight:1.3, marginBottom:"0.25rem" }}>
                  {book.title}
                </p>
                <p className="label-caps" style={{ color:C.muted, fontSize:"0.55rem" }}>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   TESTIMONIALS  — now dark espresso
───────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section style={{ background: C.bgWalnut }}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color:C.copper }}>Testimonials</p>
          <h2 style={{
            fontFamily:"Georgia, serif", fontSize:"clamp(2rem,4vw,3rem)",
            color:C.parchment, letterSpacing:"-0.02em",
          }}>
            Trusted by <em className="text-gradient-sepia">127,000 readers.</em>
          </h2>
          <div className="max-w-sm mx-auto mt-6"><Ornament onDark /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="card-espresso rounded-xl p-8 flex flex-col"
              style={{ background: C.bgBark }}
            >
              <div style={{
                fontFamily:"Georgia, serif", fontSize:"5rem", lineHeight:0.75,
                color:C.copper, opacity:0.28, marginBottom:"0.5rem", userSelect:"none",
              }}>
                &ldquo;
              </div>
              <p className="flex-1 mb-6" style={{
                fontFamily:"Georgia, serif", fontSize:"0.92rem",
                fontStyle:"italic", lineHeight:1.78, color:C.parchmentDim,
              }}>
                {t.quote}
              </p>
              <div style={{ borderTop:`1px solid ${C.borderGoldDim}`, marginBottom:"1rem" }} />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                  style={{ background:C.bgEspresso, color:C.parchment, fontFamily:"Georgia, serif", fontSize:"0.65rem", letterSpacing:"0.05em" }}
                >
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily:"Georgia, serif", fontSize:"0.85rem", color:C.parchment, fontWeight:600 }}>{t.name}</p>
                  <p className="label-caps" style={{ color:C.parchmentMute, fontSize:"0.58rem" }}>{t.role}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p style={{ fontFamily:"Georgia, serif", fontSize:"1rem", color:C.gold, fontWeight:700 }}>{t.books}</p>
                  <p className="label-caps" style={{ color:C.parchmentMute, fontSize:"0.55rem" }}>volumes</p>
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
   PRICING  — now dark espresso
───────────────────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" style={{ background: C.bgEspresso }}>
      <div className="max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color:C.copper }}>Pricing</p>
          <h2 style={{
            fontFamily:"Georgia, serif", fontSize:"clamp(2rem,4vw,3rem)",
            color:C.parchment, letterSpacing:"-0.02em",
          }}>
            Honest prices. <em className="text-gradient-sepia">No surprises.</em>
          </h2>
          <div className="max-w-sm mx-auto mt-6"><Ornament onDark /></div>
          <p className="mt-4" style={{ color:C.parchmentDim, fontStyle:"italic" }}>
            Begin freely. Ascend when you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(plan => {
            const isFeatured = plan.style === "featured";
            return (
              <div key={plan.name} className="relative rounded-xl p-8"
                style={{
                  background: isFeatured ? C.bgParchment : C.bgWalnut,
                  border: isFeatured
                    ? `1px solid ${C.borderMedium}`
                    : plan.style === "gold"
                    ? `1px solid ${C.borderGold}`
                    : `1px solid ${C.borderGoldDim}`,
                  boxShadow: isFeatured ? "0 12px 48px rgba(0,0,0,0.35)" : "none",
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 label-caps whitespace-nowrap px-4 py-1 rounded-sm"
                    style={{ background:C.bgEspresso, color:C.copper, border:`1px solid ${C.borderGold}`, fontSize:"0.6rem" }}
                  >
                    {plan.badge}
                  </div>
                )}

                <p style={{ fontFamily:"Georgia, serif", fontSize:"1rem", fontWeight:700, color: isFeatured ? C.ink : C.parchment, marginBottom:"0.1rem" }}>
                  {plan.name}
                </p>
                <p className="label-caps mb-5" style={{ color: isFeatured ? C.muted : C.parchmentMute, fontSize:"0.58rem", fontStyle:"italic" }}>
                  {plan.latin}
                </p>

                <div className="flex items-end gap-1 mb-7">
                  <span style={{ fontFamily:"Georgia, serif", fontSize:"2.6rem", fontWeight:700, color: isFeatured ? C.ink : C.parchment, lineHeight:1 }}>
                    ${plan.price}
                  </span>
                  <span className="pb-1.5 label-caps" style={{ color: isFeatured ? C.muted : C.parchmentMute, fontSize:"0.6rem" }}>
                    / {plan.period}
                  </span>
                </div>

                <button
                  className="w-full py-3 rounded label-caps mb-7 transition-all"
                  style={{
                    fontSize:"0.65rem",
                    ...(isFeatured
                      ? { background:C.bgEspresso, color:C.parchment, fontFamily:"Georgia, serif" }
                      : plan.style === "gold"
                      ? { border:`1.5px solid ${C.borderGold}`, color:C.copper, fontFamily:"Georgia, serif" }
                      : { border:`1.5px solid ${C.borderGoldDim}`, color:C.parchmentDim, fontFamily:"Georgia, serif" }),
                  }}
                >
                  {plan.style === "gold" ? "Write to us" : isFeatured ? "Begin your trial" : "Start reading"}
                </button>

                <div style={{ borderTop:`1px solid ${isFeatured ? C.borderFaint : C.borderGoldDim}`, marginBottom:"1.25rem" }} />

                <div className="space-y-3.5">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <span style={{ color:"#5DCE71", flexShrink:0 }}><Check /></span>
                      <span style={{ fontSize:"0.83rem", fontStyle:"italic", color: isFeatured ? C.sepia : C.parchmentDim }}>{f}</span>
                    </div>
                  ))}
                  {plan.missing.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <span style={{ color:"transparent", flexShrink:0, opacity:0.2 }}><Check /></span>
                      <span style={{ fontSize:"0.83rem", fontStyle:"italic", color: isFeatured ? "rgba(92,71,51,0.28)" : "rgba(237,224,204,0.18)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ  — now dark espresso
───────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ background: C.bgWalnut }}>
      <div className="max-w-2xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="label-caps mb-4" style={{ color:C.copper }}>Enquiries</p>
          <h2 style={{ fontFamily:"Georgia, serif", fontSize:"clamp(1.75rem,3.5vw,2.4rem)", color:C.parchment, letterSpacing:"-0.02em" }}>
            Frequently asked questions.
          </h2>
          <div className="max-w-xs mx-auto mt-6"><Ornament onDark /></div>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderTop:`1px solid ${C.borderGoldDim}`,
              ...(i === faqs.length - 1 ? { borderBottom:`1px solid ${C.borderGoldDim}` } : {}),
            }}>
              <button className="w-full flex items-start justify-between py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span style={{
                  fontFamily:"Georgia, serif", fontSize:"0.95rem",
                  color:C.parchment, fontWeight: open === i ? 700 : 400,
                }}>
                  {faq.q}
                </span>
                <span style={{
                  color:C.parchmentMute, flexShrink:0, marginTop:"0.15rem",
                  transform: open === i ? "rotate(180deg)" : "rotate(0)",
                  transition:"transform 0.25s ease",
                }}>
                  <ChevronDown />
                </span>
              </button>
              {open === i && (
                <p style={{
                  fontFamily:"Georgia, serif", fontStyle:"italic",
                  fontSize:"0.9rem", lineHeight:1.8, color:C.parchmentDim, paddingBottom:"1.25rem",
                }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   CTA  — now warm parchment / cream
───────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section style={{ background: C.bgCream }}>
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="relative rounded-2xl corner-ornament"
          style={{
            background: C.bgCard,
            border:`1px solid ${C.borderLight}`,
            padding:"4rem 3rem", textAlign:"center",
            boxShadow:"0 8px 40px rgba(92,71,51,0.09)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background:"radial-gradient(ellipse 60% 40% at 50% 0%, rgba(160,129,58,0.05) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <p className="label-caps mb-5" style={{ color:C.gold }}>Begin today</p>
            <h2 style={{
              fontFamily:"Georgia, serif", fontSize:"clamp(1.75rem,4vw,3rem)",
              color:C.ink, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:"1rem",
            }}>
              Read smarter.
              <br />
              <em className="text-gradient-sepia">Think deeper.</em>
            </h2>
            <div className="max-w-xs mx-auto my-6"><Ornament symbol="✦" /></div>
            <p style={{
              fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:"1rem",
              color:C.muted, maxWidth:"30rem", margin:"0 auto 2.5rem", lineHeight:1.75,
            }}>
              Join 127,000 scholars and professionals who have reclaimed their time
              without surrendering intellectual depth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-ink label-caps px-8 py-4 rounded flex items-center justify-center gap-2" style={{ fontSize:"0.65rem" }}>
                Get started free <ArrowRight />
              </button>
              <button className="btn-outline label-caps px-8 py-4 rounded" style={{ fontSize:"0.65rem" }}>
                View a live demo
              </button>
            </div>
            <p className="label-caps mt-5" style={{ color:"rgba(153,134,116,0.5)", fontSize:"0.58rem" }}>
              Free perpetually &ensp;·&ensp; No card required &ensp;·&ensp; Cancel whenever you wish
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FOOTER  — now dark espresso
───────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: C.bgEspresso, borderTop:`1px solid ${C.borderGoldDim}` }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                style={{ background:C.parchment, color:C.bgEspresso, fontFamily:"Georgia, serif" }}
              >P</div>
              <span style={{ fontFamily:"Georgia, serif", color:C.parchment, fontSize:"1.05rem" }}>
                Page<em>Mind</em>
              </span>
            </div>
            <p style={{
              fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:"0.85rem",
              lineHeight:1.7, color:C.parchmentDim, maxWidth:"18rem",
            }}>
              Multi-agent AI that transforms books into actionable wisdom.
              Read more. Retain more. Achieve more.
            </p>
          </div>

          {[
            { title:"Product", links:["Features","Pricing","API","Changelog"] },
            { title:"Company", links:["About","Blog","Careers","Press"] },
            { title:"Legal",   links:["Privacy","Terms","Security","Cookies"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="label-caps mb-4" style={{ color:C.parchmentDim }}>{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#"
                      style={{ fontFamily:"Georgia, serif", fontStyle:"italic", fontSize:"0.85rem", color:C.parchmentMute, transition:"color 0.2s", display:"block" }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = C.parchment)}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = C.parchmentMute)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop:`1px solid ${C.borderGoldDim}`, paddingTop:"2rem" }}>
          <Ornament symbol="·" onDark />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <p className="label-caps" style={{ color:"rgba(196,154,60,0.25)", fontSize:"0.58rem" }}>
              © 2026 PageMind. All rights reserved.
            </p>
            <p className="label-caps" style={{ color:"rgba(196,154,60,0.22)", fontSize:"0.58rem" }}>
              Crafted with devotion &ensp;·&ensp; For readers everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main style={{ fontFamily:"Georgia, 'Times New Roman', Times, serif" }}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <Method />
      <BookShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
