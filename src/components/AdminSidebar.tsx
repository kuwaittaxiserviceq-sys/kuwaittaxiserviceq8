'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard, CalendarDays, ClipboardList, Users, Car, IdCard,
    DollarSign, TicketPercent, MapPin, FileText, Sparkles, MessageSquare,
    Star, HelpCircle, BarChart3, Bell, MessageCircle, ReceiptText,
    FolderOpen, LifeBuoy, ScrollText, Settings, LogOut, Menu, X,
    ChevronLeft, ChevronRight,
} from 'lucide-react';

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };
type NavGroup = { title: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
    {
        title: 'Operations',
        items: [
            { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/admin/bookings', label: 'Bookings', icon: ClipboardList },
            { href: '/admin/calendar', label: 'Calendar', icon: CalendarDays },
            { href: '/admin/customers', label: 'Customers', icon: Users },
            { href: '/admin/drivers', label: 'Drivers', icon: IdCard },
            { href: '/admin/fleet', label: 'Fleet', icon: Car },
        ],
    },
    {
        title: 'Revenue',
        items: [
            { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
            { href: '/admin/promo-codes', label: 'Promo Codes', icon: TicketPercent },
            { href: '/admin/invoice-generator', label: 'Invoices', icon: ReceiptText },
            { href: '/admin', label: 'Documents', icon: FolderOpen },
            { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
        ],
    },
    {
        title: 'Content',
        items: [
            { href: '/admin/blogs', label: 'Blogs', icon: FileText },
            { href: '/admin/generator', label: 'Blog Generator', icon: Sparkles },
            { href: '/admin/comments', label: 'Comments', icon: MessageSquare },
            { href: '/admin/reviews', label: 'Reviews', icon: Star },
            { href: '/admin/questions', label: 'Questions', icon: HelpCircle },
            { href: '/admin/locations', label: 'Locations', icon: MapPin },
        ],
    },
    {
        title: 'System',
        items: [
            { href: '/admin/notifications', label: 'Notifications', icon: Bell },
            { href: '/admin/whatsapp-templates', label: 'WhatsApp', icon: MessageCircle },
            { href: '/admin/support', label: 'Support', icon: LifeBuoy },
            { href: '/admin/audit-log', label: 'Audit Log', icon: ScrollText },
            { href: '/admin/settings', label: 'Settings', icon: Settings },
        ],
    },
];

export default function AdminSidebar({
    isCollapsed = false,
    onToggle,
}: {
    isCollapsed?: boolean;
    onToggle?: () => void;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) =>
        href === '/admin' ? pathname === '/admin' : pathname === href || pathname?.startsWith(href + '/');

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const nav = (
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
            {NAV_GROUPS.map(group => (
                <div key={group.title}>
                    {!isCollapsed && (
                        <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                            {group.title}
                        </p>
                    )}
                    <div className="space-y-0.5">
                        {group.items.map(item => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    title={isCollapsed ? item.label : undefined}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        active
                                            ? 'bg-emerald-600/20 text-emerald-400'
                                            : 'text-neutral-400 hover:bg-neutral-800 hover:text-white',
                                        isCollapsed && 'justify-center px-2'
                                    )}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>
    );

    const header = (
        <div className={cn('flex items-center gap-2 px-4 py-4 border-b border-neutral-800', isCollapsed && 'justify-center px-2')}>
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                <Car className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
                <div className="min-w-0">
                    <p className="text-sm font-bold text-white leading-tight truncate">Kuwait Taxi</p>
                    <p className="text-[10px] text-neutral-500 leading-tight">Admin Panel</p>
                </div>
            )}
        </div>
    );

    const footer = (
        <div className="border-t border-neutral-800 p-2 space-y-0.5">
            {onToggle && (
                <button
                    onClick={onToggle}
                    className={cn(
                        'hidden md:flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors',
                        isCollapsed && 'justify-center px-2'
                    )}
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    {!isCollapsed && <span>Collapse</span>}
                </button>
            )}
            <button
                onClick={handleLogout}
                className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors',
                    isCollapsed && 'justify-center px-2'
                )}
            >
                <LogOut className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>Logout</span>}
            </button>
        </div>
    );

    return (
        <>
            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between bg-neutral-950 border-b border-neutral-800 px-4 h-14 print:hidden">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <Car className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">Kuwait Taxi Admin</span>
                </div>
                <button
                    onClick={() => setMobileOpen(o => !o)}
                    className="text-neutral-300 hover:text-white p-2"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-40 print:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
                    <aside className="absolute left-0 top-14 bottom-0 w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col">
                        {nav}
                        {footer}
                    </aside>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside
                className={cn(
                    'hidden md:flex fixed inset-y-0 left-0 z-30 flex-col bg-neutral-950 border-r border-neutral-800 transition-all duration-300 print:hidden',
                    isCollapsed ? 'w-[64px]' : 'w-64'
                )}
            >
                {header}
                {nav}
                {footer}
            </aside>
        </>
    );
}
