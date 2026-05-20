"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

// ── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ target, duration = 2200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// ── StarIcon ─────────────────────────────────────────────────────────────────
function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0d9488">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

// ── Plane path SVG animation ─────────────────────────────────────────────────
function PlanePathGraphic() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 560 280"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 30 230 C 130 80, 280 180, 390 110 S 520 40, 540 60"
          stroke="#0d9488"
          strokeWidth="1.5"
          strokeDasharray="7 5"
          opacity={0.22}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1.2,
          }}
        />
        {[
          { cx: 30, cy: 230, label: "NYC" },
          { cx: 540, cy: 60, label: "LHR" },
        ].map((dot) => (
          <g key={dot.label}>
            <circle cx={dot.cx} cy={dot.cy} r="4" fill="#0d9488" opacity={0.35} />
            <circle cx={dot.cx} cy={dot.cy} r="8" fill="#0d9488" opacity={0.1} />
            <text
              x={dot.cx + 12}
              y={dot.cy + 4}
              fontSize="9"
              fill="#0d9488"
              opacity={0.5}
              fontWeight="600"
            >
              {dot.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── World dots ────────────────────────────────────────────────────────────────
function WorldDots() {
  const dots = [
    [14, 34], [22, 28], [28, 44], [18, 54], [24, 64],
    [44, 24], [54, 28], [62, 18], [68, 34], [72, 42],
    [50, 50], [62, 56], [76, 28], [82, 46], [88, 62],
    [92, 34], [96, 22], [34, 62], [44, 72], [56, 66],
    [66, 72], [80, 66], [86, 76], [28, 76], [18, 80],
    [35, 18], [48, 12], [58, 22], [70, 16], [82, 14],
  ];
  return (
    <svg viewBox="0 0 120 96" className="w-full h-full">
      {dots.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="2.2"
          fill="#0d9488"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.9, 0.5, 0.9] }}
          transition={{
            delay: i * 0.06,
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 2,
          }}
        />
      ))}
    </svg>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["How it works", "For Travelers", "About", "FAQ"];

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className={`fixed inset-x-0 top-0 z-50 border-b border-slate-100 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <div
          className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4"
          style={{ height: "60px" }}
        >
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center shadow-sm shadow-teal-200">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <span
              className="text-[1.15rem] font-black text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Cokatoo
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm shadow-teal-200"
          >
            Join Waitlist
          </motion.a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 flex flex-col gap-[5px]"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-slate-800 rounded-full origin-center"
            />
            <motion.div
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-5 h-[2px] bg-slate-800 rounded-full"
            />
            <motion.div
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-slate-800 rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white border-b border-slate-100 shadow-xl px-5 py-5"
          >
            {links.map((l) => (
              <a
                key={l}
                href="#"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors border-b border-slate-50 last:border-0"
              >
                {l}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-4 block text-center bg-teal-600 text-white font-semibold py-3 rounded-full text-sm"
            >
              Join Waitlist
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[88px] pb-12 space-y-4">

        {/* ═══════════════════════════════════════════════════════
            BENTO SECTION 1 — Hero + Stats
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* ── Large hero card (col-span-2) ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.005, boxShadow: "0 24px 64px rgba(13,148,136,0.10)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="relative sm:col-span-2 bg-white rounded-3xl p-8 lg:p-10 overflow-hidden border border-slate-100 shadow-sm cursor-default min-h-[280px] flex flex-col justify-between"
          >
            <PlanePathGraphic />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                Peer-to-peer crowdshipping
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-900 leading-[1.1] mb-5 tracking-tight"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Shop the world.<br />
                <span className="text-teal-600">Someone&apos;s already going there.</span>
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-sm mb-7">
                Connect with verified travelers heading your way and get international products
                delivered in their carry-on.
              </p>
            </div>
            <div className="relative z-10">
              <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(13,148,136,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors shadow-sm shadow-teal-200"
              >
                Get Early Access →
              </motion.a>
            </div>
          </motion.div>

          {/* ── Counter card ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 56px rgba(13,148,136,0.22)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-teal-600 rounded-3xl p-7 flex flex-col justify-between cursor-default shadow-sm min-h-[200px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <div
                className="text-[2.8rem] font-black text-white leading-none tabular-nums mb-1"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                <CountUp target={12847} />
              </div>
              <p className="text-teal-100 text-sm font-medium">deliveries completed</p>
              <p className="text-teal-200/60 text-xs mt-1.5">and counting every day</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Second row of section 1 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {/* ── Countries small card ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm cursor-default flex flex-col"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Coverage
            </p>
            <div className="flex-1 min-h-[80px]">
              <WorldDots />
            </div>
            <div className="mt-2">
              <div
                className="text-3xl font-black text-slate-900"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                80+
              </div>
              <p className="text-slate-500 text-sm">countries connected</p>
            </div>
          </motion.div>

          {/* ── Product request card (col-span-2) ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.01, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="sm:col-span-2 bg-white rounded-3xl p-7 border border-slate-100 shadow-sm cursor-default"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Live Request
                </span>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                Tech
              </span>
            </div>
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shrink-0">
                🎧
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-slate-900 text-lg leading-tight mb-1"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  AirPods Pro (2nd Gen)
                </h3>
                <p className="text-slate-400 text-sm mb-3 truncate">
                  Apple noise-canceling earbuds — USB-C model
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span>🇺🇸</span> New York
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span className="flex items-center gap-1">
                    <span>🇵🇰</span> Lahore
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div
                  className="text-2xl font-black text-teal-600 leading-none mb-0.5"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  $35
                </div>
                <p className="text-xs text-slate-400 mb-2">reward</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  Accept
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            BENTO SECTION 2 — Rating + How It Works + Traveler
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4"
        >
          {/* ── Stars small card ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm cursor-default flex flex-col justify-between"
          >
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={18} />
              ))}
            </div>
            <div>
              <div
                className="text-[2.5rem] font-black text-slate-900 leading-none mb-1"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                4.9
              </div>
              <p className="text-slate-500 text-sm font-medium">avg rating</p>
              <p className="text-slate-300 text-xs mt-1">3,200+ reviews</p>
            </div>
          </motion.div>

          {/* ── How it works large card (col-span-2) ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.005, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="sm:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm cursor-default"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              How it works
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  n: "01",
                  icon: "📋",
                  title: "Post a Request",
                  desc: "Share the product, pickup city, and your reward amount.",
                },
                {
                  n: "02",
                  icon: "🧳",
                  title: "Traveler Picks Up",
                  desc: "A verified traveler buys it and carries it in their luggage.",
                },
                {
                  n: "03",
                  icon: "🎁",
                  title: "You Receive It",
                  desc: "Meet up, confirm delivery, release payment. Done.",
                },
              ].map((step, i) => (
                <div key={step.n} className="relative">
                  {i < 2 && (
                    <div className="absolute top-4 -right-2 text-slate-200 text-xs font-bold hidden sm:block select-none">
                      ›
                    </div>
                  )}
                  <span
                    className="text-[10px] font-black text-teal-300 tracking-widest"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {step.n}
                  </span>
                  <div className="text-2xl my-2">{step.icon}</div>
                  <h4
                    className="font-bold text-slate-900 text-[0.8rem] leading-snug mb-1"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-slate-400 text-[0.72rem] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Traveler profile card ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm cursor-default"
          >
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Verified Traveler
            </p>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                AK
              </div>
              <div>
                <p
                  className="font-bold text-slate-900 text-sm"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Amir Khan
                </p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={11} />
                  ))}
                  <span className="text-[11px] text-slate-400 ml-1">5.0</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5 mb-4">
              {[
                { label: "Trips completed", value: "47" },
                { label: "Next trip", value: "NYC → DXB" },
                { label: "Spare capacity", value: "3 kg" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400">{row.label}</span>
                  <span className="text-[11px] font-semibold text-slate-700">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 pt-4 border-t border-slate-50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[10px] text-slate-400 font-medium">
                ID verified · 0 disputes
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            BENTO SECTION 3 — CTAs + Trust badges
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* ── Traveling CTA (teal) ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 56px rgba(13,148,136,0.22)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-teal-600 rounded-3xl p-7 flex flex-col justify-between cursor-default shadow-sm min-h-[200px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              ✈️
            </div>
            <div>
              <p className="text-teal-200 text-xs font-medium mb-1.5">Are you traveling?</p>
              <h3
                className="text-xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Earn on your next trip
              </h3>
              <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 bg-white text-teal-700 font-semibold text-xs px-4 py-2 rounded-full hover:bg-teal-50 transition-colors"
              >
                List your trip →
              </motion.a>
            </div>
          </motion.div>

          {/* ── Need something CTA (white) ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-slate-100 shadow-sm cursor-default min-h-[200px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl">
              🛍️
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium mb-1.5">Need something?</p>
              <h3
                className="text-xl font-black text-slate-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Shop from anywhere
              </h3>
              <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 bg-slate-900 text-white font-semibold text-xs px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                Post a request →
              </motion.a>
            </div>
          </motion.div>

          {/* ── Trust badge: Secure Payments ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.03, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm cursor-default"
          >
            <div className="text-3xl mb-4">🔐</div>
            <h4
              className="font-bold text-slate-900 text-sm mb-1.5"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Secure Payments
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Funds held in escrow until you confirm your item arrived safely.
            </p>
          </motion.div>

          {/* ── Trust badge: Buyer Protection ── */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.03, boxShadow: "0 16px 48px rgba(0,0,0,0.07)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm cursor-default"
          >
            <div className="text-3xl mb-4">🛡️</div>
            <h4
              className="font-bold text-slate-900 text-sm mb-1.5"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Buyer Protection Guaranteed
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Full refund if your item doesn&apos;t arrive or isn&apos;t as described.
            </p>
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
            WAITLIST — Full-width teal card
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          id="waitlist"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="relative bg-teal-600 rounded-3xl overflow-hidden px-8 sm:px-14 py-12 sm:py-16"
        >
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-teal-500/50 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <p className="text-teal-200 text-xs font-semibold uppercase tracking-widest mb-3">
              Early Access
            </p>
            <h2
              className="text-3xl sm:text-[2.4rem] font-black text-white mb-3 leading-[1.15]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Be the first to know when we launch.
            </h2>
            <p className="text-teal-100 text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">
              Join 2,400+ shoppers and travelers already waiting. We&apos;ll notify you the moment
              we go live.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white/15 border border-white/25 rounded-full px-5 py-3 text-white placeholder-teal-200/60 text-sm focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-white text-teal-700 font-bold px-6 py-3 rounded-full text-sm hover:bg-teal-50 transition-colors shadow-sm shrink-0"
                  >
                    Notify me
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="bg-white/15 border border-white/20 rounded-2xl px-8 py-6 max-w-sm mx-auto"
                >
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-white font-bold text-base">You&apos;re on the list!</p>
                  <p className="text-teal-100 text-sm mt-1">
                    We&apos;ll reach out the moment Cokatoo launches.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-teal-200/50 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <span
                className="font-black text-slate-900 text-sm"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Cokatoo
              </span>
              <span className="text-slate-200 mx-1">·</span>
              <span className="text-slate-400 text-xs">
                Connecting the world, one suitcase at a time.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              {["How it works", "For Travelers", "Privacy", "Terms", "FAQ", "Contact"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-xs text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {l}
                  </a>
                )
              )}
            </div>

            <p className="text-slate-300 text-xs shrink-0">© 2026 Cokatoo</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
