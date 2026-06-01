import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Input, Button } from "../../components/ui";
import { PasswordInput } from "../../components/ui/PasswordInput";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/feed" replace />;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(function (prev) {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      toast.success("Account created! Please sign in 💕");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data || err?.message || "Sign up failed";
      toast.error(
        typeof msg === "string" ? msg.slice(0, 100) : "Sign up failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-pink-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg shadow-pink-200 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-gray-800 mb-1">
              Join Socialize ✨
            </h1>
            <p className="text-gray-400 text-sm">
              Create your free account today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                name="FirstName"
                value={form.FirstName}
                onChange={handleChange}
                placeholder="Jane"
                required
              />
              <Input
                label="Last Name"
                name="LastName"
                value={form.LastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
            <Input
              label="Email Address"
              name="Email"
              type="email"
              value={form.Email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
            <div>
              <PasswordInput
                label="Password"
                name="Password"
                value={form.Password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5 ml-1">
                Min 8 chars · 1 uppercase · 1 number · 1 symbol
              </p>
            </div>
            <Button
              type="submit"
              loading={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold shadow-lg shadow-pink-200 py-3 text-base"
            >
              {loading ? "Creating account…" : "Create Account 💕"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-500 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
