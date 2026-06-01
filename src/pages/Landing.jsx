import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

const HEARTS = ["💕", "❤️", "💗", "💖", "💝", "💘", "💞", "🌹"];

const STATS = [
  { num: "1.5K+", label: "Profiles Browsed Daily" },
  { num: "320+", label: "Daily Conversations" },
  { num: "98%", label: "Profiles Completed" },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Smart Matching",
    desc: "Browse people who actually fit your interests instead of random noise.",
  },
  {
    icon: ShieldCheck,
    title: "Real Profiles",
    desc: "Profiles are reviewed so you can focus on real conversations, not obvious fakes.",
  },
  {
    icon: Users,
    title: "Instant Connect",
    desc: "When there is interest, you can move from swipe to connection without extra friction.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Floating blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-fuchsia-300 rounded-full blur-3xl opacity-20 animate-pulse" />

        {/* Floating heart emojis */}
        {HEARTS.map(function (h, i) {
          return (
            <div
              key={i}
              className="absolute pointer-events-none select-none"
              style={{
                left: i * 12 + 4 + "%",
                top: (i % 3 === 0 ? 15 : i % 3 === 1 ? 55 : 78) + "%",
                animationDelay: i * 0.35 + "s",
                animationDuration: 2 + i * 0.25 + "s",
                opacity: 0.35 + (i % 3) * 0.15,
                fontSize: 16 + (i % 4) * 8 + "px",
              }}
            >
              {h}
            </div>
          );
        })}

        {/* Main content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            💕 Find Your Perfect Match
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black mb-6 leading-tight text-gray-800"
          >
            <span className="text-gradient">Love</span> Starts Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 mb-10 max-w-xl mx-auto"
          >
            Connect with real people, build meaningful relationships, and find
            your perfect match with Socialize.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 transition-all"
            >
              <Heart className="w-5 h-5 fill-current" />
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-pink-100"
            >
              Sign In
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mx-auto mb-10 max-w-xl"
          >
            <div className="glass rounded-3xl p-5 shadow-2xl shadow-pink-100 border-pink-100/70">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-xs uppercase tracking-[0.35em] text-pink-400 font-bold mb-2">
                    This week
                  </p>
                  <h3 className="text-lg md:text-xl font-black text-gray-800 mb-1">
                    A calmer way to meet people
                  </h3>
                  <p className="text-sm text-gray-500">
                    Less scrolling, more meaningful connections.
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200 shrink-0"
                >
                  <Heart className="w-7 h-7 text-white fill-current" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-12 flex-wrap"
          >
            {STATS.map(function (s) {
              return (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-gradient">
                    {s.num}
                  </div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {FEATURES.map(function (f, i) {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-3xl p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 text-pink-500 flex items-center justify-center shadow-sm"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-center text-white shadow-2xl shadow-pink-200"
        >
          <h2 className="text-4xl font-black mb-4">Ready to Find Love? 💕</h2>
          <p className="text-pink-100 mb-8 text-lg">
            Join people who want a better kind of connection, not a louder feed.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
          >
            <Heart className="w-5 h-5 fill-current" />
            Start Your Journey
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-pink-100/80 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            Socialize · built for real conversations, not endless scrolling.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/signup"
              className="hover:text-pink-500 transition-colors"
            >
              Sign up
            </Link>
            <Link to="/login" className="hover:text-pink-500 transition-colors">
              Log in
            </Link>
            <span>© 2026 Socialize</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
