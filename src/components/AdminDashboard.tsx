"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { CarFront, KeyRound, LogOut, RefreshCw } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
);

type Row = {
  id: string;
  created_at: string;
  form_type: string;
  data: Record<string, string>;
};

const inputClass =
  "w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand-green";

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [recovery, setRecovery] = useState(false);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadRows = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return;
    setBusy(true);
    setNotice("");
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setNotice(res.status === 401 ? "This account is not authorized for admin access." : "Failed to load bookings.");
        setRows([]);
        return;
      }
      const json = await res.json();
      setRows(json.rows ?? []);
    } catch {
      setNotice("Failed to load bookings.");
      setRows([]);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (!session || recovery) return;
    const t = setTimeout(loadRows, 0);
    return () => clearTimeout(t);
  }, [session, recovery, loadRows]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNotice("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setNotice(error.message);
    setBusy(false);
  }

  async function handleForgot() {
    if (!email) {
      setNotice("Enter your admin email first, then press Reset password.");
      return;
    }
    setBusy(true);
    setNotice("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    });
    setNotice(error ? error.message : "Password reset link sent — check your email inbox.");
    setBusy(false);
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      setNotice("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setNotice(error.message);
    else {
      setRecovery(false);
      setNotice("");
    }
    setBusy(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setRows(null);
  }

  // ---------- Set new password (arrived via email recovery link) ----------
  if (session && recovery) {
    return (
      <Shell>
        <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <h1 className="text-xl font-bold text-zinc-900">Set a New Password</h1>
          <p className="mt-1 text-sm text-zinc-500">For {session.user.email}</p>
          <form onSubmit={handleSetPassword} className="mt-6 flex flex-col gap-4">
            <input
              type="password"
              required
              minLength={8}
              placeholder="New password (min 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={busy}
              className="flex h-12 items-center justify-center rounded-xl bg-brand-green font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-50"
            >
              Save Password
            </button>
            {notice && <p className="text-sm text-brand-red">{notice}</p>}
          </form>
        </div>
      </Shell>
    );
  }

  // ---------- Login ----------
  if (!session) {
    return (
      <Shell>
        <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white">
              <KeyRound className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-zinc-900">Admin Login</h1>
              <p className="text-sm text-zinc-500">Kuwait Taxi Service</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={busy}
              className="flex h-12 items-center justify-center rounded-xl bg-brand-green font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-50"
            >
              {busy ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleForgot}
            disabled={busy}
            className="mt-4 text-sm font-medium text-brand-green hover:underline disabled:opacity-50"
          >
            Forgot / set password? Send reset email
          </button>

          {notice && <p className="mt-4 text-sm text-brand-red">{notice}</p>}
        </div>
      </Shell>
    );
  }

  // ---------- Dashboard ----------
  return (
    <Shell wide>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Bookings &amp; Inquiries</h1>
            <p className="text-sm text-zinc-500">
              {session.user.email} &middot; {rows ? `${rows.length} submissions` : "loading..."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadRows}
              disabled={busy}
              className="flex h-10 items-center gap-2 rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 items-center gap-2 rounded-full bg-zinc-200 px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {notice && <p className="text-sm text-brand-red">{notice}</p>}

        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-brand-green-light text-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Date &amp; Time</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {(rows ?? []).map((row) => (
                <tr key={row.id} className="align-top even:bg-zinc-50/60">
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-600">
                    {new Date(row.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold whitespace-nowrap text-brand-green">
                      {row.form_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                      {Object.entries(row.data).map(([k, v]) => (
                        <div key={k} className="flex gap-1.5">
                          <dt className="font-medium whitespace-nowrap text-zinc-500">{k}:</dt>
                          <dd className="break-all text-zinc-900">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </td>
                </tr>
              ))}
              {rows && rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-zinc-500">
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <header className="bg-brand-black">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
            <CarFront className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-bold text-white">Kuwait Taxi — Admin</span>
        </div>
      </header>
      <main className={`flex flex-1 flex-col px-6 py-12 ${wide ? "" : "justify-center"}`}>
        {children}
      </main>
    </div>
  );
}
