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
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await changePassword(form);
      toast.success("Password changed.");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to change password.");
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
      <div className="surface-soft p-8">
        <h2 className="mb-2 font-mono-display text-2xl uppercase tracking-[-0.04em] text-[#f5f0e8]">
          Change password
        </h2>
        <p className="mb-6 text-sm text-[#6b6b5e]">
          Use a strong password: min 8 chars, 1 uppercase, 1 number.
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
              "button-accent w-full py-3 font-mono-ui text-[10px] uppercase tracking-[0.28em] transition-all " +
              (loading ? "opacity-70 cursor-not-allowed" : "")
            }
          >
            {loading ? "changing" : "change password"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
