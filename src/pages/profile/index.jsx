import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit3, Lock } from 'lucide-react';
import ProfileView    from './ProfileView';
import ProfileEdit    from './ProfileEdit';
import PasswordChange from './PasswordChange';

const TABS = [
  { id: 'view',     label: 'My Profile', Icon: User  },
  { id: 'edit',     label: 'Edit Info',  Icon: Edit3 },
  { id: 'password', label: 'Security',   Icon: Lock  },
];

export default function ProfilePage() {
  const [tab, setTab] = useState('view');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-12">
      <div className="max-w-md mx-auto px-4 pt-8">

        {/* Tab bar */}
        <div className="bg-pink-50 rounded-2xl p-1 flex gap-1 mb-6 shadow-inner">
          {TABS.map(function (t) {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={function () { setTab(t.id); }}
                className={'flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ' + (isActive ? 'bg-white shadow text-pink-600' : 'text-gray-400 hover:text-gray-600')}
              >
                <t.Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === 'view' && (
            <ProfileView
              key="view"
              onEdit={function () { setTab('edit'); }}
            />
          )}
          {tab === 'edit' && (
            <ProfileEdit
              key="edit"
              onCancel={function () { setTab('view'); }}
              onSaved={function ()  { setTab('view'); }}
            />
          )}
          {tab === 'password' && (
            <PasswordChange key="password" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
