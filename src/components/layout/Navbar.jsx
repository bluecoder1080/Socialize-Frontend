import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Code2,
  Sparkles,
  Users,
  Bell,
  User,
  LogOut,
  Menu,
  X,
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
    toast.success("Logged out");
  };

  const linkCls = (to) =>
    "relative inline-flex items-center gap-2 px-0 py-2 text-[10px] font-medium uppercase tracking-[0.32em] transition-colors after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-0 after:bg-[#e8ff3b] after:transition-all hover:after:w-full " +
    (location.pathname === to
      ? "text-[#e8ff3b] after:w-full"
      : "text-[#f5f0e8] hover:text-[#e8ff3b]");

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2a24] bg-[#0f0f0d]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-mono-ui text-lg uppercase tracking-[0.45em] text-[#f5f0e8]">
            Socialize
          </span>
        </Link>

        {user ? (
          <>
            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} className={linkCls(to)}>
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
                  className="ring-1 ring-[#2a2a24]"
                />
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-[#bcb7ad] group-hover:text-[#e8ff3b] transition-colors">
                  {user.firstName}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-[#6b6b5e] hover:text-[#ff4f1a] transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden p-2 text-[#f5f0e8] hover:text-[#e8ff3b] transition-colors"
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
              className="button-ghost px-4 py-2 text-[10px] uppercase tracking-[0.28em]"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="button-accent px-4 py-2 text-[10px] uppercase tracking-[0.28em] font-semibold"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      {/* ── Mobile menu ── */}
      {user && mobileOpen && (
        <div className="md:hidden border-t border-[#2a2a24] bg-[#1a1a17] px-6 py-4 flex flex-col gap-3">
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
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#ff4f1a]"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
