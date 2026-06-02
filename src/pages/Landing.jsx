import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  MessageSquareCode,
  Sparkles,
  ShieldCheck,
  Users,
} from "lucide-react";

const STATS = [
  { num: "1.5K+", label: "Developer profiles" },
  { num: "320+", label: "Collab invites per day" },
  { num: "98%", label: "Profiles completed" },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Stack-aware matching",
    desc: "Find people by language, stack, project type, and how they like to work.",
  },
  {
    icon: ShieldCheck,
    title: "Clear profiles",
    desc: "See skills, availability, and collaboration intent before you reach out.",
  },
  {
    icon: Users,
    title: "Collab first",
    desc: "If both people like the fit, move straight into chat, review, or a project plan.",
  },
];

const FAQS = [
  {
    question: "If a person likes you too, can you collaborate?",
    answer:
      "Yes. Mutual interest opens a direct conversation so you can decide whether to pair, review code, or build something together.",
  },
  {
    question: "Who is this for?",
    answer:
      "Developers, designers, founders, and anyone who wants to meet people around building projects instead of endless scrolling.",
  },
  {
    question: "What can we build?",
    answer:
      "Side projects, hackathon ideas, open source work, portfolio apps, or a long-term product.",
  },
  {
    question: "Do I need a complete profile?",
    answer:
      "A fuller profile helps, but you can start exploring early and fill in the details as you go.",
  },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ui text-[#f5f0e8]">
      <div className="pointer-events-none absolute inset-0 scanlines opacity-80" />
      <div className="pointer-events-none absolute right-8 top-24 text-[clamp(12rem,24vw,30rem)] leading-none text-[#e8ff3b]/[0.04] ui-cursor-ghost">
        &gt;_
      </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_.9fr] lg:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-square mb-6 text-[#e8ff3b]"
            >
              [ developer network ]
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl text-[clamp(3.5rem,10vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.08em] font-mono-display"
            >
              Find devs who ship.
            </motion.h1>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="max-w-xl text-lg leading-8 text-[#d8d3c6]"
              >
                Socialize helps developers find people they like, talk through
                ideas, and collaborate on projects without the usual feed noise.
              </motion.p>

              <motion.pre
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="surface-soft overflow-hidden p-5 text-[11px] leading-6 text-[#e8ff3b] font-mono-display"
              >
{`┌───────────────────────┐
│  { stack }  { vibe }  │
│  { ship }   { repeat }│
│                       │
│  pair -> review -> PR │
└───────────────────────┘`}
              </motion.pre>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-2 button-accent px-6 py-4 font-mono-ui text-sm uppercase tracking-[0.3em]"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 button-ghost px-6 py-4 font-mono-ui text-sm uppercase tracking-[0.3em]"
              >
                Sign In
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="surface p-6 lg:p-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="ui-kicker text-[#6b6b5e]">[ status ]</span>
              <Code2 className="h-4 w-4 text-[#e8ff3b]" />
            </div>
            <div className="space-y-4 text-sm leading-7 text-[#d8d3c6]">
              <p>
                If both people like the fit, you can move into collaboration
                without extra friction.
              </p>
              <p>
                The goal is not more scrolling. It is faster pairing, better
                code reviews, and cleaner handoffs.
              </p>
              <p className="font-mono-display text-[11px] uppercase tracking-[0.32em] text-[#e8ff3b]">
                [ mutual interest → conversation → collaboration ]
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="surface p-5">
              <div className="font-mono-display text-2xl text-[#e8ff3b]">{stat.num}</div>
              <div className="mt-2 text-sm text-[#6b6b5e]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-6 lg:py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="surface p-6"
              >
                <Icon className="h-4 w-4 text-[#e8ff3b]" />
                <h2 className="mt-4 font-mono-display text-xl uppercase tracking-[-0.04em]">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#d8d3c6]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8">
          <span className="ui-kicker text-[#6b6b5e]">[ faqs ]</span>
          <h2 className="mt-3 font-mono-display text-3xl uppercase tracking-[-0.04em] md:text-4xl">
            Questions builders usually ask
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.question} className="surface p-5 group">
              <summary className="cursor-pointer list-none font-mono-display text-sm uppercase tracking-[0.22em] text-[#f5f0e8]">
                {faq.question}
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#d8d3c6]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-6">
        <div className="surface flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="ui-kicker text-[#6b6b5e]">[ call to action ]</span>
            <h2 className="mt-3 font-mono-display text-3xl uppercase tracking-[-0.04em]">
              If they like you too, collaborate.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d8d3c6]">
              Match, talk, and build without the clutter. Keep the focus on the
              project and the people who want to ship it.
            </p>
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 button-accent px-6 py-4 font-mono-ui text-sm uppercase tracking-[0.3em]"
          >
            Create account
            <MessageSquareCode className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
