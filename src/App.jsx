import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Feed from './pages/Feed';
import Connections from './pages/Connections';
import Requests from './pages/Requests';
import Profile from './pages/profile/index';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"            element={<Landing />} />
              <Route path="/login"       element={<Login />} />
              <Route path="/signup"      element={<Signup />} />
              <Route path="/feed"        element={<ProtectedRoute><Feed /></ProtectedRoute>} />
              <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
              <Route path="/requests"    element={<ProtectedRoute><Requests /></ProtectedRoute>} />
              <Route path="/profile"     element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*"            element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'white',
              color: '#1f2937',
              border: '1px solid #fbcfe8',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.15), 0 4px 6px -2px rgba(236, 72, 153, 0.05)',
            },
            success: {
              iconTheme: {
                primary: '#ec4899',
                secondary: 'white',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
