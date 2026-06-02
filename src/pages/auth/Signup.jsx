import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const TESTIMONIALS = [
  {
    author: "Mina / React + Node",
    quote: "pairing felt easier when the profile showed stack and intent first",
  },
  {
    author: "Arun / Backend",
    quote: "mutual interest turned into a code review and then a weekend build",
  },
  {
    author: "Tara / Product Design",
    quote: "it read like a printed issue, not another bubbly signup modal",
  },
];

function FloatingField({ label, error, children }) {
  return (
    <div className="relative pt-6">
      {children}
      <label className="absolute left-0 top-0 ui-kicker text-[#6b6b5e] transition-colors peer-focus-within:text-[#e8ff3b]">
        {label}
      </label>
      {error && (
        <p className="mt-2 font-mono-ui text-[11px] text-[#6b6b5e]">
          // error: {error}
        </p>
      )}
    </div>
  );
}

function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({ FirstName: "", LastName: "", Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const errors = useMemo(() => {
    const next = {};
    if (!form.FirstName.trim()) next.FirstName = "field required";
    if (!form.LastName.trim()) next.LastName = "field required";
    if (!form.Email.trim()) next.Email = "field required";
    else if (!isEmail(form.Email)) next.Email = "invalid email";
    if (!form.Password.trim()) next.Password = "field required";
    else if (form.Password.length < 8) next.Password = "min 8 chars";
    return next;
  }, [form]);

  if (user) return <Navigate to="/feed" replace />;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched({ FirstName: true, LastName: true, Email: true, Password: true });
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await signup(form);
      toast.success("Account created.");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data || err?.message || "Sign up failed";
      toast.error(typeof msg === "string" ? msg.slice(0, 100) : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  const current = TESTIMONIALS[slide];

  return (
    <div className="min-h-screen bg-ui text-[#f5f0e8] lg:grid lg:grid-cols-[1fr_1.1fr]">
      <aside className="border-b border-ui bg-[#1a1a17] px-6 py-10 lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
        <div className="flex h-full flex-col justify-between">
          <div>
            <span className="badge-square text-[#e8ff3b]">[ editorial notes ]</span>
            <h1 className="mt-6 max-w-md font-mono-display text-4xl uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
              Join the room where devs actually meet to build.
            </h1>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="surface mt-12 p-5"
            >
              <p className="font-mono-display text-[11px] uppercase tracking-[0.28em] text-[#e8ff3b]">
                / testimonial
              </p>
              <div className="mt-4 space-y-2 text-sm leading-7 text-[#d8d3c6]">
                {current.quote.split(" ").reduce((lines, word, index) => {
                  const line = Math.floor(index / 6);
                  lines[line] = (lines[line] || "") + (lines[line] ? " " : "") + word;
                  return lines;
                }, []).map((line, index) => (
                  <motion.p
                    key={line + index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <p className="mt-5 font-mono-ui text-[10px] uppercase tracking-[0.28em] text-[#6b6b5e]">
                {current.author}
              </p>
            </motion.div>
          </AnimatePresence>

          <p className="mt-8 max-w-sm text-sm leading-7 text-[#6b6b5e]">
            No loud gradients. No bubbly cards. Just a sharp place to find people
            who want to ship.
          </p>
        </div>
      </aside>

      <main className="px-6 py-10 lg:px-10 lg:py-14">
        <div className="mx-auto flex max-w-xl flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#e8ff3b]">
              <Code2 className="h-4 w-4" />
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.32em]">
                create account
              </span>
            </div>
            <h2 className="mt-4 font-mono-display text-3xl uppercase tracking-[-0.05em] md:text-4xl">
              Build with people you want to keep talking to.
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FloatingField label="First name" error={touched.FirstName && errors.FirstName}>
                <input
                  className="peer field-line"
                  name="FirstName"
                  value={form.FirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder=" "
                  autoComplete="given-name"
                />
              </FloatingField>

              <FloatingField label="Last name" error={touched.LastName && errors.LastName}>
                <input
                  className="peer field-line"
                  name="LastName"
                  value={form.LastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder=" "
                  autoComplete="family-name"
                />
              </FloatingField>
            </div>

            <FloatingField label="Email" error={touched.Email && errors.Email}>
              <input
                className="peer field-line"
                name="Email"
                type="email"
                value={form.Email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=" "
                autoComplete="email"
              />
            </FloatingField>

            <FloatingField label="Password" error={touched.Password && errors.Password}>
              <input
                className="peer field-line pr-16"
                name="Password"
                type={showPassword ? "text" : "password"}
                value={form.Password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=" "
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-8 font-mono-ui text-[10px] uppercase tracking-[0.28em] text-[#e8ff3b]"
              >
                [{showPassword ? "hide" : "show"}]
              </button>
              <p className="mt-2 font-mono-ui text-[11px] text-[#6b6b5e]">
                /* min 8 chars · 1 uppercase · 1 number */
              </p>
            </FloatingField>

            <button
              type="submit"
              disabled={loading}
              className="button-accent flex w-full items-center justify-center gap-2 py-4 font-mono-ui text-sm uppercase tracking-[0.3em] disabled:opacity-70"
            >
              {loading ? "creating account" : "create account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-sm text-[#6b6b5e]">
            Already have an account?{" "}
            <Link className="text-[#e8ff3b]" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
