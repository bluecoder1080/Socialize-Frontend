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
    setForm(function (prev) {
      return { ...prev, [name]: value };
    });
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
          .map(function (s) {
            return s.trim();
          })
          .filter(Boolean),
      };
      const res = await editProfile(payload);
      updateUser(res.data.data);
      toast.success("Profile updated! 💕");
      onSaved();
    } catch (err) {
      toast.error(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to update profile.",
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
        <h2 className="text-2xl font-black text-gray-800 mb-6">
          Edit Profile ✏️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name row */}
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

          {/* Gender */}
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

          {/* Photo URL + preview */}
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
                <span className="text-xs text-gray-400">Preview</span>
              </div>
            )}
          </div>

          {/* About */}
          <TextArea
            label="About"
            name="About"
            value={form.About}
            onChange={handleChange}
            rows={3}
            placeholder="Tell people a little about yourself..."
          />

          {/* Skills */}
          <div>
            <Input
              label="Skills"
              name="Skills"
              value={form.Skills}
              onChange={handleChange}
              placeholder="React, Node.js, Design..."
            />
            <p className="text-xs text-gray-400 mt-1.5 ml-1">
              Separate with commas
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold shadow-lg shadow-pink-200"
            >
              {loading ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
