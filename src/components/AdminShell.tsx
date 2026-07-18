"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CarFront,
  FileText,
  Globe,
  ListChecks,
  LogOut,
  MessageCircle,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Bookings", icon: ListChecks, exact: true },
  { href: "/admin/documents", label: "Documents", icon: FileText, exact: false },
];

export default function AdminShell({
  children,
  userEmail,
  onLogout,
  center = false,
}: {
  children: React.ReactNode;
  userEmail?: string;
  onLogout?: () => void;
  center?: boolean;
}) {
  const pathname = usePathname();
  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-zinc-100">
      {/* ---- Sidebar (desktop) ---- */}
      <aside className="no-print sticky top-0 hidden h-screen w-60 flex-col bg-brand-black lg:flex">
        <Link href="/admin" className="flex items-center gap-2 px-5 py-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white">
            <CarFront className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <div>
            <div className="font-bold text-white">Kuwait Taxi</div>
            <div className="text-xs text-zinc-500">Admin Panel</div>
          </div>
        </Link>

        <nav className="flex flex-col gap-1 px-3">
          {nav.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                isActive(href, exact)
                  ? "bg-brand-green text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Globe className="h-5 w-5" />
            View Website
          </a>
        </nav>

        {/* Sidebar footer */}
        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 px-3 py-4">
          <a
            href="https://wa.me/96597896907"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-[#25D366]/15 px-4 py-3 text-sm font-semibold text-[#4ade80] transition-colors hover:bg-[#25D366]/25"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          )}
          {userEmail && (
            <div className="truncate px-4 pb-1 text-xs text-zinc-600">{userEmail}</div>
          )}
        </div>
      </aside>

      {/* ---- Content ---- */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="no-print flex items-center justify-between bg-brand-black px-4 py-3 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white">
              <CarFront className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-bold text-white">Admin</span>
          </Link>
          <div className="flex items-center gap-1">
            {nav.map(({ href, label, icon: Icon, exact }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  isActive(href, exact) ? "bg-brand-green text-white" : "text-zinc-400"
                }`}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
            <a
              href="https://wa.me/96597896907"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#4ade80]"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                aria-label="Logout"
                className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </header>

        <main
          className={`flex flex-1 flex-col px-4 py-8 sm:px-6 ${center ? "justify-center" : ""}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
