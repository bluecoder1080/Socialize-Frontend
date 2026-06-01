import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HEARTS = ['💕', '❤️', '💗', '💖', '💝', '💘', '💞', '🌹'];

const STATS = [
  { num: '50K+', label: 'Active Users' },
  { num: '12K+', label: 'Matches Made' },
  { num: '4.9★', label: 'Rating' },
];

const FEATURES = [
  {
    icon: '💕',
    title: 'Smart Matching',
    desc: 'Our algorithm finds compatible matches based on your interests and preferences.',
  },
  {
    icon: '✅',
    title: 'Real Profiles',
    desc: 'Every profile is verified. Connect with genuine people looking for real connections.',
  },
  {
    icon: '⚡',
    title: 'Instant Connect',
    desc: 'Match and start chatting instantly. No delays, no waiting — just connections.',
  },
];

export default function Landing() {
  const { user } = useAuth();
  if (user) return <Navigate to="/feed" replace />;

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
                left: (i * 12 + 4) + '%',
                top: (i % 3 === 0 ? 15 : i % 3 === 1 ? 55 : 78) + '%',
                animationDelay: (i * 0.35) + 's',
                animationDuration: (2 + i * 0.25) + 's',
                opacity: 0.35 + (i % 3) * 0.15,
                fontSize: (16 + (i % 4) * 8) + 'px',
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
            Connect with real people, build meaningful relationships, and find your perfect match with Socialize.
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-12 flex-wrap"
          >
            {STATS.map(function (s) {
              return (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-gradient">{s.num}</div>
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
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-3xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-black mb-4">Ready to Find Love? 💕</h2>
          <p className="text-pink-100 mb-8 text-lg">
            Join thousands of happy couples who found their match on Socialize.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg"
          >
            <Heart className="w-5 h-5 fill-current" />
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        Made with 💕 by Socialize Team
      </footer>
    </div>
  );
}
