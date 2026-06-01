import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { changePassword } from "../../services/authService";
import { PasswordInput } from "../../components/ui/PasswordInput";

export default function PasswordChange() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);

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
      await changePassword(form);
      toast.success("Password changed successfully! 🔒");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to change password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="glass rounded-3xl p-8 shadow-2xl shadow-pink-100">
        <h2 className="text-2xl font-black text-gray-800 mb-1">
          Change Password 🔒
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Use a strong password: min 8 chars, 1 uppercase, 1 number, 1 symbol.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            required
          />
          <PasswordInput
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={
              "w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-pink-200 transition-all " +
              (loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-[1.02]")
            }
          >
            {loading ? "Changing…" : "Change Password 🔒"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
