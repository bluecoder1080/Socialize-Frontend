import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { editProfile } from "../../services/authService";
import { Input, Button, Select, TextArea } from "../../components/ui";
import { Avatar } from "../../components/ui/Avatar";

export default function ProfileEdit({ onCancel, onSaved }) {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    FirstName: (user && user.FirstName) || "",
    LastName: (user && user.LastName) || "",
    Gender: (user && user.Gender) || "",
    photoUrl: (user && (user.photoUrl || user.profilePhoto)) || "",
    About: (user && user.About) || "",
    Skills: user && Array.isArray(user.Skills) ? user.Skills.join(", ") : "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        FirstName: form.FirstName,
        LastName: form.LastName,
        Gender: form.Gender,
        photoUrl: form.photoUrl,
        About: form.About,
        Skills: form.Skills.split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };
      const res = await editProfile(payload);
      updateUser(res.data.data);
      toast.success("Profile updated.");
      onSaved();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update profile.",
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
      <div className="surface-soft p-8">
        <h2 className="mb-3 font-mono-display text-2xl uppercase tracking-[-0.04em] text-[#f5f0e8]">
          Edit profile
        </h2>
        <p className="mb-6 text-sm text-[#6b6b5e]">
          Adjust the details people see before they message you.
        </p>

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
            />
          </div>

          <Select
            label="Gender"
            name="Gender"
            value={form.Gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </Select>

          <div>
            <Input
              label="Photo URL"
              name="photoUrl"
              type="url"
              value={form.photoUrl}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
            {form.photoUrl && (
              <div className="mt-2 flex items-center gap-2">
                <Avatar src={form.photoUrl} alt="Preview" size="sm" />
                <span className="text-xs text-[#6b6b5e]">Preview</span>
              </div>
            )}
          </div>

          <TextArea
            label="About"
            name="About"
            value={form.About}
            onChange={handleChange}
            rows={3}
            placeholder="Tell people a little about yourself..."
          />

          <div>
            <Input
              label="Skills"
              name="Skills"
              value={form.Skills}
              onChange={handleChange}
              placeholder="React, Node.js, Design..."
            />
            <p className="mt-1.5 ml-1 font-mono-ui text-[11px] text-[#6b6b5e]">
              Separate with commas
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
