"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/authActions";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={action}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-5"
    >
      <h2 className="text-xl font-bold text-gray-900 text-center">Sign In</h2>
      <p className="text-sm text-gray-400 text-center">
        Enter your credentials to access the admin panel
      </p>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Email
        </label>
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            name="email"
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            placeholder="admin@jolaestates.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors text-sm"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
