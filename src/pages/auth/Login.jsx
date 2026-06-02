import React, { useMemo, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Field({ label, children, error }) {
  return (
    <div className="relative pt-6">
      {children}
      <label className="absolute left-0 top-0 ui-kicker text-[#6b6b5e]">
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

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  if (user) return <Navigate to="/feed" replace />;

  const errors = useMemo(() => {
    const next = {};
    if (!form.email.trim()) next.email = "field required";
    if (!form.password.trim()) next.password = "field required";
    return next;
  }, [form]);

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
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/feed");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ui text-[#f5f0e8] lg:grid lg:grid-cols-[.9fr_1.1fr]">
      <aside className="border-b border-ui bg-[#1a1a17] px-6 py-10 lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
        <div className="flex h-full flex-col justify-between">
          <div>
            <span className="badge-square text-[#e8ff3b]">[ sign in ]</span>
            <h1 className="mt-6 max-w-sm font-mono-display text-4xl uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
              Welcome back to the build room.
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface mt-12 p-5"
          >
            <p className="font-mono-display text-[11px] uppercase tracking-[0.28em] text-[#e8ff3b]">
              / note
            </p>
            <p className="mt-4 text-sm leading-7 text-[#d8d3c6]">
              Match, talk, and build without the usual noise. Keep the room
              sharp and the feedback useful.
            </p>
            <p className="mt-5 font-mono-ui text-[10px] uppercase tracking-[0.28em] text-[#6b6b5e]">
              [ pair with people who like your stack ]
            </p>
          </motion.div>

          <p className="mt-8 max-w-sm text-sm leading-7 text-[#6b6b5e]">
            Mutual interest is the start of a conversation, not the end of the
            process.
          </p>
        </div>
      </aside>

      <main className="px-6 py-10 lg:px-10 lg:py-14">
        <div className="mx-auto flex max-w-xl flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#e8ff3b]">
              <Code2 className="h-4 w-4" />
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.32em]">
                sign in
              </span>
            </div>
            <h2 className="mt-4 font-mono-display text-3xl uppercase tracking-[-0.05em] md:text-4xl">
              Get back to the people you already want to build with.
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Email" error={touched.email && errors.email}>
              <input
                className="peer field-line"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=" "
                autoComplete="email"
              />
            </Field>

            <Field label="Password" error={touched.password && errors.password}>
              <input
                className="peer field-line pr-16"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=" "
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-0 top-8 font-mono-ui text-[10px] uppercase tracking-[0.28em] text-[#e8ff3b]"
              >
                [{showPassword ? "hide" : "show"}]
              </button>
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="button-accent flex w-full items-center justify-center gap-2 py-4 font-mono-ui text-sm uppercase tracking-[0.3em] disabled:opacity-70"
            >
              {loading ? "signing in" : "sign in"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-sm text-[#6b6b5e]">
            New here?{" "}
            <Link className="text-[#e8ff3b]" to="/signup">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
