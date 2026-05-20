"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// ─── Motion helpers ───────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const avatarData = [
  { color: "#d97706", initials: "SR" },
  { color: "#b45309", initials: "MK" },
  { color: "#92400e", initials: "AL" },
  { color: "#f59e0b", initials: "RN" },
];

const steps = [
  {
    emoji: "📋",
    number: "01",
    title: "Post a Request",
    desc: "Tell us what you want. Share a link, photo, or product name. Set your pickup city and budget.",
  },
  {
    emoji: "🧳",
    number: "02",
    title: "Traveler Picks It Up",
    desc: "A verified traveler heading your way finds your request, buys the item, and tucks it in their bag.",
  },
  {
    emoji: "🎁",
    number: "03",
    title: "You Receive It",
    desc: "Meet your traveler, confirm delivery, release payment, and leave a warm review. Done!",
  },
];

const testimonials = [
  {
    name: "Sofia Largo",
    initials: "SL",
    color: "#d97706",
    route: "Barcelona → Buenos Aires",
    quote:
      "I found the exact Zara bag I wanted online but it wasn't available in Argentina. A traveler brought it for me — two weeks later it was on my doorstep. Absolute magic.",
  },
  {
    name: "James Okonkwo",
    initials: "JO",
    color: "#b45309",
    route: "London → Lagos",
    quote:
      "I travel for work constantly and always had empty suitcase space. Now I turn that extra room into real income while helping people. It's part of every trip now.",
  },
  {
    name: "Priya Mehta",
    initials: "PM",
    color: "#92400e",
    route: "Toronto → Mumbai",
    quote:
      "My mum wanted Canadian maple syrup for her 60th birthday. I posted on Cokatoo and a traveler delivered it to her door in Pune. She cried happy tears. So did I.",
  },
];

const requests = [
  {
    emoji: "💇‍♀️",
    product: "Dyson Airwrap Complete",
    from: "🇬🇧 London",
    to: "🇦🇪 Dubai",
    reward: "$45 reward",
    tag: "Beauty",
  },
  {
    emoji: "👟",
    product: "Nike Dunk Low Panda",
    from: "🇺🇸 New York",
    to: "🇪🇬 Cairo",
    reward: "$60 reward",
    tag: "Sneakers",
  },
  {
    emoji: "🍯",
    product: "Manuka Honey MGO 1000+",
    from: "🇳🇿 Auckland",
    to: "🇫🇷 Paris",
    reward: "$35 reward",
    tag: "Food",
  },
  {
    emoji: "🎮",
    product: "Nintendo Switch OLED",
    from: "🇯🇵 Tokyo",
    to: "🇧🇷 São Paulo",
    reward: "$55 reward",
    tag: "Tech",
  },
];

const trustPillars = [
  {
    icon: "👥",
    title: "Real People",
    desc: "Every traveler and shopper is ID-verified and community-reviewed. We know who's in the flock.",
  },
  {
    icon: "🔐",
    title: "Secure Payments",
    desc: "Funds are held in escrow until you confirm delivery. Pay only when your item actually arrives.",
  },
  {
    icon: "⭐",
    title: "Community Rated",
    desc: "Transparent ratings for every exchange. The community keeps each other accountable and kind.",
  },
];

const navLinks = ["How it works", "Community", "About", "FAQ", "Contact"];

// ─── Bird SVG logo ────────────────────────────────────────────────────────────
function BirdLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M13 12 Q14 5 17 9" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M17 9 Q19 2 22 7" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 7 Q24 1 26 6" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="15" r="8" fill="#f59e0b" />
      <ellipse cx="16" cy="27" rx="10" ry="11" fill="#d97706" />
      <path d="M6 25 Q2 20 5 28 Q10 32 18 30" fill="#f59e0b" />
      <circle cx="21" cy="14" r="2.5" fill="white" />
      <circle cx="21.5" cy="14" r="1.2" fill="#1c1917" />
      <circle cx="21.9" cy="13.5" r="0.4" fill="white" />
      <path d="M23 16.5 L30 18 L23 19.5 Z" fill="#92400e" />
      <path d="M16 37 Q12 43 10 40" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 37 Q18 44 22 41" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 37 Q21 41 24 39" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Scroll-triggered reveal ──────────────────────────────────────────────────
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 38 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 38 }}
      transition={{ duration: 0.72, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-3">
      {children}
    </p>
  );
}

// ─── Star icon ────────────────────────────────────────────────────────────────
function StarIcon({ size = 20, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm shadow-amber-100/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <BirdLogo size={34} />
            <span
              className="text-xl font-black tracking-tight text-stone-900"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Cokatoo
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm font-semibold text-stone-500 hover:text-amber-700 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 transition-colors text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-amber-200"
          >
            Join the flock 🐦
          </motion.a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-stone-800 rounded-full origin-center"
            />
            <motion.div
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-5 h-0.5 bg-stone-800 rounded-full"
            />
            <motion.div
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-stone-800 rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-amber-100 shadow-xl px-5 py-5"
          >
            <ul className="flex flex-col gap-4 mb-5">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold text-stone-700 hover:text-amber-600 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-amber-600 text-white font-bold py-3 rounded-full text-sm"
            >
              Join the flock 🐦
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const sparklePositions: Array<{ style: React.CSSProperties; delay: number }> = [
  { style: { top: "22%", left: "7%" }, delay: 0 },
  { style: { top: "18%", right: "10%" }, delay: 0.6 },
  { style: { top: "68%", left: "5%" }, delay: 1.1 },
  { style: { top: "72%", right: "7%" }, delay: 1.6 },
];

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.45], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream pt-16 pb-20 px-5">
      {/* Warm atmospheric blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute -bottom-12 -left-16 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-56 h-56 rounded-full bg-orange-100/25 blur-2xl" />
      </div>

      {/* Floating sparkle icons */}
      {sparklePositions.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-300 select-none pointer-events-none"
          style={sp.style}
          animate={{ y: [0, -14, 0], rotate: [0, 18, -6, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 4.5 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sp.delay,
          }}
        >
          <StarIcon size={22} />
        </motion.div>
      ))}

      {/* Floating rings */}
      <motion.div
        className="absolute top-32 left-[8%] w-14 h-14 rounded-full border-2 border-amber-300/40 pointer-events-none hidden sm:block"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-44 right-[10%] w-9 h-9 rounded-full bg-amber-200/55 pointer-events-none hidden sm:block"
        animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      />
      <motion.div
        className="absolute top-48 right-[22%] w-5 h-5 rounded-full bg-orange-300/40 pointer-events-none hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      />

      {/* Main content — parallax container */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-3xl mx-auto w-full"
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease }}
          className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Now accepting early access
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-6xl lg:text-[5.25rem] font-black leading-[1.06] text-stone-900 mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Your wishlist.
          <br />
          <span className="text-amber-600">Their next trip.</span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.14 }}
          className="text-lg sm:text-xl text-stone-500 max-w-lg mx-auto leading-relaxed mb-10"
        >
          Cokatoo connects people who want products from abroad with travelers
          who have suitcase space. Real people helping each other cross borders
          — and budgets.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.26 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.05, boxShadow: "0 16px 40px rgba(217,119,6,0.28)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 transition-colors text-white font-bold px-8 py-4 rounded-full text-base shadow-lg shadow-amber-200"
          >
            🛍️ I Want Something
          </motion.a>
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border-2 border-amber-600 text-amber-700 font-bold px-8 py-4 rounded-full text-base hover:bg-amber-50 transition-colors"
          >
            ✈️ I&apos;m Traveling
          </motion.a>
        </motion.div>

        {/* Avatar stack + social proof */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.38 }}
          className="flex items-center justify-center gap-3.5"
        >
          <div className="flex -space-x-3">
            {avatarData.map((av, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.42 + i * 0.09,
                  duration: 0.45,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md"
                style={{ backgroundColor: av.color }}
              >
                {av.initials}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.78, duration: 0.45, type: "spring", stiffness: 260, damping: 20 }}
              className="w-10 h-10 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-amber-800 text-[10px] font-black shadow-md"
            >
              +2k
            </motion.div>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-stone-800 leading-tight">
              2,400+ people already on the waitlist.
            </p>
            <p className="text-xs text-stone-400 mt-0.5">Be next. 🐦</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-stone-300 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-stone-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
// function HowItWorksSection() {
//   return (
//     <section className="py-24 sm:py-32 bg-white px-5">
//       <div className="max-w-6xl mx-auto">
//         <Reveal className="text-center mb-16">
//           <SectionLabel>Simple as 1-2-3</SectionLabel>
//           <h2
//             className="text-4xl sm:text-5xl font-black text-stone-900"
//             style={{ fontFamily: "var(--font-fraunces)" }}
//           >
//             How Cokatoo works
//           </h2>
//           <p className="mt-4 text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
//             Three friendly steps. Real connections. Products you love, brought by people who care.
//           </p>
//         </Reveal>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
//           {steps.map((step, i) => (
//             <Reveal key={step.number} delay={i * 0.11}>
//               <motion.div
//                 whileHover={{ y: -8, boxShadow: "0 24px 56px rgba(0,0,0,0.08)" }}
//                 transition={{ type: "spring", stiffness: 280, damping: 20 }}
//                 className="relative bg-amber-50 border border-amber-100 rounded-3xl p-8 cursor-default overflow-hidden group hover:bg-white transition-colors duration-300"
//               >
//                 <span
//                   className="absolute -top-1 right-5 text-6xl font-black text-amber-200/80 leading-none select-none"
//                   style={{ fontFamily: "var(--font-fraunces)" }}
//                 >
//                   {step.number}
//                 </span>

//                 <div className="text-4xl mb-5">{step.emoji}</div>

//                 <h3
//                   className="text-xl font-bold text-stone-900 mb-3"
//                   style={{ fontFamily: "var(--font-fraunces)" }}
//                 >
//                   {step.title}
//                 </h3>
//                 <p className="text-stone-500 leading-relaxed text-sm">{step.desc}</p>

//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   whileHover={{ scaleX: 1 }}
//                   transition={{ duration: 0.3, ease }}
//                   className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 origin-left"
//                 />
//               </motion.div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Community Stories ────────────────────────────────────────────────────────
function CommunityStoriesSection() {
  return (
    <section className="py-24 sm:py-32 bg-amber-50 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <SectionLabel>Real stories</SectionLabel>
          <h2
            className="text-4xl sm:text-5xl font-black text-stone-900"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            The flock speaks
          </h2>
          <p className="mt-4 text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
            From birthday gifts to rare finds — these are the moments that make Cokatoo worth it.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.13}>
              <motion.div
                whileHover={{ y: -7, boxShadow: "0 20px 48px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 270, damping: 22 }}
                className="bg-white rounded-3xl p-7 shadow-sm border border-amber-100 h-full flex flex-col"
              >
                <div
                  className="text-5xl font-black leading-none text-amber-200 mb-3 select-none"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  &ldquo;
                </div>

                <p className="text-stone-600 leading-relaxed text-sm flex-1 mb-6">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-amber-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm leading-tight">{t.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{t.route}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <StarIcon key={si} size={12} fill="#f59e0b" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Live Requests ────────────────────────────────────────────────────────────
function LiveRequestsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live right now
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-stone-900"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Things people want right now
          </h2>
          <p className="mt-4 text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
            Travelers are already browsing. Your item could be picked up on the next flight.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {requests.map((req, i) => (
            <Reveal key={req.product} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -7, boxShadow: "0 22px 50px rgba(217,119,6,0.13)" }}
                transition={{ type: "spring", stiffness: 290, damping: 20 }}
                className="bg-amber-50 border border-amber-100/80 rounded-2xl p-5 cursor-pointer group relative overflow-hidden"
              >
                {/* Shimmer sweep on hover */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 0.18 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
                />

                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{req.emoji}</span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                    {req.tag}
                  </span>
                </div>

                <h4 className="font-bold text-stone-900 text-sm leading-snug mb-3">
                  {req.product}
                </h4>

                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <span>{req.from}</span>
                  <span className="text-amber-400 font-bold">→</span>
                  <span>{req.to}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200/70 flex items-center justify-between">
                  <span className="text-amber-700 font-black text-sm">{req.reward}</span>
                  <span className="text-xs text-amber-600 font-bold group-hover:underline transition-all">
                    Pick up →
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.04, backgroundColor: "#fff7ed" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border-2 border-amber-600 text-amber-700 font-bold px-8 py-3.5 rounded-full transition-colors text-sm"
          >
            Browse all requests →
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Trust ────────────────────────────────────────────────────────────────────
function TrustSection() {
  return (
    <section className="py-24 sm:py-32 bg-cream px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <SectionLabel>Built on trust</SectionLabel>
          <h2
            className="text-4xl sm:text-5xl font-black text-stone-900"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Safety travels with you
          </h2>
          <p className="mt-4 text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
            We built Cokatoo so every exchange is protected, transparent, and genuinely human.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {trustPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.13}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(3)].map((_, di) => (
                    <div
                      key={di}
                      className={`h-1 rounded-full ${di === 1 ? "w-8 bg-amber-500" : "w-4 bg-amber-200"}`}
                    />
                  ))}
                </div>
                <h3
                  className="text-xl font-bold text-stone-900 mb-3"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {pillar.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Waitlist ─────────────────────────────────────────────────────────────────
function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="relative py-28 sm:py-36 px-5 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #d97706 0%, #f59e0b 55%, #ea580c 100%)",
      }}
    >
      {/* Atmospheric decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-yellow-200/15 blur-2xl" />
      </div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <Reveal>
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BirdLogo size={54} />
            </motion.div>
          </div>

          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Join the flock
          </h2>

          <p className="text-amber-100 text-lg mb-10 leading-relaxed">
            Be among the first to shop across borders or earn by carrying for others.
            We&apos;ll let you know the moment we launch.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          {/* Avatar stack */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-3">
              {avatarData.map((av, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-amber-400/60 flex items-center justify-center text-white text-xs font-bold shadow-md"
                  style={{ backgroundColor: av.color }}
                >
                  {av.initials}
                </div>
              ))}
            </div>
            <p className="text-amber-100 text-sm font-semibold">2,400+ already in</p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-6 py-3.5 text-white placeholder-amber-200/70 focus:outline-none focus:border-white/60 focus:bg-white/22 transition-all text-sm"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(0,0,0,0.22)" }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-white text-amber-700 font-black px-7 py-3.5 rounded-full text-sm hover:bg-amber-50 transition-colors shadow-lg shrink-0"
                >
                  Count me in 🐦
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-8 py-7"
              >
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-white font-bold text-lg">You&apos;re in the flock!</p>
                <p className="text-amber-100 text-sm mt-2">
                  We&apos;ll let you know the moment Cokatoo takes flight.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-amber-200/70 text-xs mt-5">
            No spam, ever. Unsubscribe anytime. We promise. 🤝
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const footerLinks: Record<string, string[]> = {
  Product: ["How it works", "Browse requests", "Become a traveler", "Pricing"],
  Company: ["About us", "Blog", "Careers", "Press"],
  Support: ["Help center", "Safety", "Contact", "FAQ"],
};

function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-500 pt-16 pb-8 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <BirdLogo size={30} />
              <span
                className="text-white text-lg font-black"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Cokatoo
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500 max-w-[200px] mb-5">
              Connecting the world one suitcase at a time.
            </p>
            <div className="flex gap-2.5">
              {[
                { label: "𝕏", title: "Twitter / X" },
                { label: "ig", title: "Instagram" },
                { label: "in", title: "LinkedIn" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  title={s.title}
                  whileHover={{ scale: 1.15, backgroundColor: "#d97706", color: "white" }}
                  className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[11px] font-bold text-stone-400 transition-colors"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-stone-500 hover:text-amber-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <p>© 2026 Cokatoo. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="hover:text-stone-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      {/* <HowItWorksSection /> */}
      <CommunityStoriesSection />
      <LiveRequestsSection />
      <TrustSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
