import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Edit3, Lock } from "lucide-react";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import PasswordChange from "./PasswordChange";

const TABS = [
  { id: "view", label: "My Profile", Icon: User },
  { id: "edit", label: "Edit Info", Icon: Edit3 },
  { id: "password", label: "Security", Icon: Lock },
];

export default function ProfilePage() {
  const [tab, setTab] = useState("view");

  return (
    <div className="min-h-screen bg-ui pb-12 text-[#f5f0e8]">
      <div className="mx-auto max-w-md px-4 pt-8">
        <p className="ui-kicker text-[#6b6b5e]">[ profile ]</p>

        <div className="surface mt-4 flex gap-1 p-1">
          {TABS.map(function (t) {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={function () {
                  setTab(t.id);
                }}
                className={
                  "flex flex-1 items-center justify-center gap-1.5 rounded-[4px] px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors " +
                  (isActive
                    ? "bg-[#e8ff3b] text-[#0f0f0d]"
                    : "text-[#6b6b5e] hover:text-[#f5f0e8]")
                }
              >
                <t.Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === "view" && (
            <ProfileView
              key="view"
              onEdit={function () {
                setTab("edit");
              }}
            />
          )}
          {tab === "edit" && (
            <ProfileEdit
              key="edit"
              onCancel={function () {
                setTab("view");
              }}
              onSaved={function () {
                setTab("view");
              }}
            />
          )}
          {tab === "password" && <PasswordChange key="password" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
