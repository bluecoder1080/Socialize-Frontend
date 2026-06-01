import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { rememberFreshImage } from "../components/ui/Avatar";

const AuthContext = createContext(null);

function normalizeUser(user) {
  if (!user) return null;

  const photoUrl =
    user.photoUrl || user.profilePhoto || user.imageUrl || user.avatarUrl || "";

  return {
    ...user,
    photoUrl,
    profilePhoto: photoUrl,
    imageUrl: photoUrl,
    avatarUrl: photoUrl,
  };
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get("/profile");
      setUser(normalizeUser(res.data));
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    await api.post("/signin", { Email: email, Password: password });
    await checkAuth();
  };

  const signup = async (data) => {
    await api.post("/signup", data);
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
  };

  const updateUser = (patch) => {
    setUser((prev) => {
      const next = normalizeUser({ ...prev, ...patch });
      const previousPhoto =
        prev &&
        (prev.photoUrl || prev.profilePhoto || prev.imageUrl || prev.avatarUrl);
      const nextPhoto =
        next &&
        (next.photoUrl || next.profilePhoto || next.imageUrl || next.avatarUrl);

      if (previousPhoto && nextPhoto && previousPhoto !== nextPhoto) {
        rememberFreshImage(nextPhoto);
      }

      return next;
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, updateUser, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
