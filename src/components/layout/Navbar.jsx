import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  Users,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../ui";

const NAV_LINKS = [
  { to: "/feed", Icon: Sparkles, label: "Discover" },
  { to: "/connections", Icon: Users, label: "Connections" },
  { to: "/requests", Icon: Bell, label: "Requests" },
  { to: "/profile", Icon: User, label: "Profile" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_) {
      // silently handle
    }
    navigate("/");
    toast.success("Logged out 💕");
  };

  const linkCls = (to) =>
    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all " +
    (location.pathname === to
      ? "bg-pink-500 text-white"
      : "text-gray-600 hover:bg-pink-50 hover:text-pink-600");

  return (
    <nav className="sticky top-0 z-50 glass border-b border-pink-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md shadow-pink-200">
            <Heart size={18} className="text-white fill-white" />
          </div>
          <span className="text-xl font-black text-gradient">Socialize</span>
        </Link>

        {user ? (
          <>
            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, Icon, label }) => (
                <Link key={to} to={to} className={linkCls(to)}>
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>

            {/* ── Desktop user + logout ── */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 group">
                <Avatar
                  src={user.profilePhoto}
                  name={user.firstName}
                  size="sm"
                  className="ring-2 ring-pink-300"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-pink-500 transition-colors">
                  {user.firstName}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        ) : (
          /* ── Guest nav ── */
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-md shadow-pink-200"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      {/* ── Mobile menu ── */}
      {user && mobileOpen && (
        <div className="md:hidden border-t border-pink-100 bg-white px-4 py-3 flex flex-col gap-1 shadow-lg">
          {NAV_LINKS.map(({ to, Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={linkCls(to)}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all mt-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
