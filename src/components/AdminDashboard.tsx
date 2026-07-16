"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import {
  FileText,
  KeyRound,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import AdminShell from "./AdminShell";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
);

type Row = {
  id: string;
  created_at: string;
  form_type: string;
  data: Record<string, string>;
  status: string;
};

const STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  confirmed: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

const inputClass =
  "w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand-green";

function customerName(data: Record<string, string>) {
  return (
    data.name ||
    [data.salutation, data.firstName, data.lastName].filter(Boolean).join(" ") ||
    "—"
  );
}

function phoneDigits(phone?: string) {
  return (phone ?? "").replace(/\D/g, "");
}

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [recovery, setRecovery] = useState(false);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const getToken = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }, []);

  const loadRows = useCallback(async () => {
    const token = await getToken();
    if (!token) return;
    setBusy(true);
    setNotice("");
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setNotice(
          res.status === 401
            ? "This account is not authorized for admin access."
            : "Failed to load bookings."
        );
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
  }, [getToken]);

  useEffect(() => {
    if (!session || recovery) return;
    const t = setTimeout(loadRows, 0);
    return () => clearTimeout(t);
  }, [session, recovery, loadRows]);

  async function updateStatus(id: string, status: string) {
    const token = await getToken();
    if (!token) return;
    // optimistic update
    setRows((r) => r?.map((row) => (row.id === id ? { ...row, status } : row)) ?? null);
    const res = await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setNotice("Status update failed — refreshing.");
      loadRows();
    }
  }

  function makeDocument(row: Row) {
    sessionStorage.setItem(
      "doc-prefill",
      JSON.stringify({ formType: row.form_type, data: row.data })
    );
    window.location.href = "/admin/documents";
  }

  async function deleteRow(id: string) {
    if (!window.confirm("Delete this booking permanently?")) return;
    const token = await getToken();
    if (!token) return;
    setRows((r) => r?.filter((row) => row.id !== id) ?? null);
    const res = await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setNotice("Delete failed — refreshing.");
      loadRows();
    }
  }

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

  const types = useMemo(
    () => Array.from(new Set((rows ?? []).map((r) => r.form_type))).sort(),
    [rows]
  );

  const filtered = useMemo(() => {
    let out = rows ?? [];
    if (statusFilter !== "all") out = out.filter((r) => r.status === statusFilter);
    if (typeFilter !== "all") out = out.filter((r) => r.form_type === typeFilter);
    const q = query.trim().toLowerCase();
    if (q) {
      out = out.filter((r) =>
        Object.values(r.data).some((v) => v.toLowerCase().includes(q))
      );
    }
    return out;
  }, [rows, statusFilter, typeFilter, query]);

  const stats = useMemo(() => {
    const all = rows ?? [];
    const today = new Date().toDateString();
    return {
      total: all.length,
      new: all.filter((r) => r.status === "new").length,
      confirmed: all.filter((r) => r.status === "confirmed").length,
      completed: all.filter((r) => r.status === "completed").length,
      today: all.filter((r) => new Date(r.created_at).toDateString() === today).length,
    };
  }, [rows]);

  // ---------- Set new password ----------
  if (session && recovery) {
    return (
      <AdminShell center>
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
      </AdminShell>
    );
  }

  // ---------- Login ----------
  if (!session) {
    return (
      <AdminShell center>
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
      </AdminShell>
    );
  }

  // ---------- Dashboard ----------
  return (
    <AdminShell userEmail={session.user.email} onLogout={handleLogout}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Bookings &amp; Inquiries</h1>
            <p className="text-sm text-zinc-500">{session.user.email}</p>
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
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { label: "Total", value: stats.total },
            { label: "Today", value: stats.today },
            { label: "New", value: stats.new },
            { label: "Confirmed", value: stats.confirmed },
            { label: "Completed", value: stats.completed },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
              <div className="text-2xl font-bold text-zinc-900">{value}</div>
              <div className="text-sm text-zinc-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {["all", ...STATUSES].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${
                  statusFilter === s
                    ? "bg-brand-green text-white"
                    : "bg-white text-zinc-600 ring-1 ring-black/10 hover:bg-zinc-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-1 gap-3 sm:justify-end">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-full bg-white px-4 py-1.5 text-sm text-zinc-700 ring-1 ring-black/10 outline-none"
            >
              <option value="all">All types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 ring-1 ring-black/10">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, phone, area..."
                className="w-44 text-sm text-zinc-900 outline-none"
              />
            </label>
          </div>
        </div>

        {notice && <p className="text-sm text-brand-red">{notice}</p>}

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-brand-green-light text-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Date &amp; Time</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Details</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((row) => {
                const digits = phoneDigits(row.data.phone);
                return (
                  <tr key={row.id} className="align-top even:bg-zinc-50/60">
                    <td className="px-4 py-3 whitespace-nowrap text-zinc-600">
                      {new Date(row.created_at).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-zinc-900">{customerName(row.data)}</div>
                      {row.data.phone && (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-zinc-500" dir="ltr">
                            {row.data.phone}
                          </span>
                          <a
                            href={`https://wa.me/${digits}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp customer"
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                          <a
                            href={`tel:+${digits}`}
                            aria-label="Call customer"
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      )}
                      {row.data.email && (
                        <a
                          href={`mailto:${row.data.email}`}
                          className="mt-0.5 block text-xs text-brand-green hover:underline"
                        >
                          {row.data.email}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold whitespace-nowrap text-brand-green">
                        {row.form_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <dl className="grid max-w-md grid-cols-1 gap-x-6 gap-y-1">
                        {Object.entries(row.data)
                          .filter(([k]) => !["name", "phone", "email", "firstName", "lastName", "salutation"].includes(k))
                          .map(([k, v]) => (
                            <div key={k} className="flex gap-1.5">
                              <dt className="font-medium whitespace-nowrap text-zinc-500">{k}:</dt>
                              <dd className="break-all text-zinc-900">{v}</dd>
                            </div>
                          ))}
                      </dl>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={row.status}
                        onChange={(e) => updateStatus(row.id, e.target.value)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize outline-none ${statusStyles[row.status] ?? "bg-zinc-100 text-zinc-600"}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => makeDocument(row)}
                          aria-label="Create quotation or invoice"
                          title="Create quotation / invoice"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-brand-green-light hover:text-brand-green"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRow(row.id)}
                          aria-label="Delete booking"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                    {rows.length === 0 ? "No submissions yet." : "No results match your filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
