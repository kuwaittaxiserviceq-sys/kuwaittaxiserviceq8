'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
    Printer, Plus, Trash2, FileText, RotateCcw, Mail, Phone,
    Globe, MapPin, Car, Calendar, Clock, Users, Download,
    MessageCircle, Save, CheckCircle, ChevronDown, ChevronUp,
    Percent, DollarSign, Copy, ExternalLink, Bookmark, FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type DocType = 'quotation' | 'invoice' | 'receipt' | 'letterhead';

interface Item {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

interface CompanyProfile {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logoUrl?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    iban?: string;
    swiftCode?: string;
}

const PROFILES: Record<string, CompanyProfile> = {
    'kuwait-taxi': {
        name: 'Kuwait Taxi Service',
        address: 'Kuwait City, Kuwait',
        phone: '+965 XXXX XXXX',
        email: 'kuwaittaxiserviceq@gmail.com',
        website: 'www.kuwaittaxiserviceq8.com',
        logoUrl: '/logo.svg',
        bankName: 'National Bank of Kuwait',
        accountName: 'Kuwait Taxi Service',
        accountNumber: '123456789012345',
        iban: 'KW81NBOK0000000000001234560101',
        swiftCode: 'NBOKKWKW',
    },
};

const VEHICLES = ['Toyota Camry', 'GMC Yukon', 'Hyundai Staria', 'Hiace', 'Fortuner', 'Land Cruiser'];
const CURRENCIES = ['KWD', 'SAR', 'AED', 'BHD', 'OMR', 'QAR', 'USD'];

const DOC_META: Record<DocType, { label: string; prefix: string; color: string }> = {
    quotation: { label: 'QUOTATION',  prefix: 'QT',  color: '#2563eb' },
    invoice:   { label: 'INVOICE',    prefix: 'INV', color: '#111827' },
    receipt:   { label: 'RECEIPT',    prefix: 'RCT', color: '#059669' },
    letterhead:{ label: 'LETTERHEAD', prefix: 'LH',  color: '#7c3aed' },
};

function genRef(prefix: string) {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${prefix}-${String(d.getFullYear()).slice(2)}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

const DRAFT_KEY = 'invoice-generator-draft';

export default function InvoiceGeneratorPage() {
    const router = useRouter();
    const [docType, setDocType] = useState<DocType>('invoice');
    const [profile, setProfile] = useState<CompanyProfile>(PROFILES['kuwait-taxi']);
    const [isMounted, setIsMounted] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [draftSaved, setDraftSaved] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>('items');

    const [recipient, setRecipient] = useState({ name: '', details: '', email: '', phone: '' });
    const [trip, setTrip] = useState({ pickup: '', destination: '', date: '', time: '', passengers: '', vehicle: '', showOnDoc: true });
    const [items, setItems] = useState<Item[]>([{ id: '1', description: 'Transport Service', quantity: 1, price: 0 }]);
    const [meta, setMeta] = useState({
        ref: '',
        date: '',
        dueDate: '',
        validUntil: '',
        currency: 'KWD',
        taxShow: false,
        taxRate: 5,
        taxLabel: 'VAT',
        discountType: 'fixed' as 'fixed' | 'percent',
        discountValue: 0,
        paymentStatus: 'Unpaid',
        paymentMethod: 'Cash to Driver',
        notes: 'Terms & Conditions:\n• Price includes fuel and toll fees.\n• Cancellation is free up to 24 hours before pickup.',
        subject: 'Official Confirmation of Transport Services',
        letterBody: 'Dear Client,\n\nWe are pleased to confirm your upcoming transport arrangements. Our professional chauffeur will be prepared at your designated pickup location.\n\nPlease ensure your booking details are correct. Thank you for choosing our services.',
    });
    const [bank, setBank] = useState({
        show: false,
        bankName: PROFILES['kuwait-taxi'].bankName ?? '',
        accountName: PROFILES['kuwait-taxi'].accountName ?? '',
        accountNumber: PROFILES['kuwait-taxi'].accountNumber ?? '',
        iban: PROFILES['kuwait-taxi'].iban ?? '',
        swift: PROFILES['kuwait-taxi'].swiftCode ?? '',
        transferNote: 'Please send transaction screenshot on WhatsApp once completed.',
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.push('/admin/login');
        });
        setMeta(prev => ({
            ...prev,
            ref: genRef(DOC_META[docType].prefix),
            date: new Date().toLocaleDateString('en-CA'),
            dueDate: new Date(Date.now() + 7*86400000).toLocaleDateString('en-CA'),
            validUntil: new Date(Date.now() + 14*86400000).toLocaleDateString('en-CA'),
        }));
        // Load draft
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            if (saved) {
                const draft = JSON.parse(saved);
                if (draft.docType) setDocType(draft.docType);
                if (draft.recipient) setRecipient(draft.recipient);
                if (draft.trip) setTrip(draft.trip);
                if (draft.items) setItems(draft.items);
                if (draft.meta) setMeta(m => ({ ...m, ...draft.meta }));
                if (draft.bank) setBank(b => ({ ...b, ...draft.bank }));
            }
        } catch {}
        setIsMounted(true);
    }, []);

    // Update ref when doc type changes
    useEffect(() => {
        if (isMounted) setMeta(m => ({ ...m, ref: genRef(DOC_META[docType].prefix) }));
    }, [docType]);

    if (!isMounted) return null;

    // Calculations
    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const discountAmt = meta.discountType === 'percent'
        ? (subtotal * meta.discountValue) / 100
        : meta.discountValue;
    const taxable = subtotal - discountAmt;
    const taxAmt = meta.taxShow ? (taxable * meta.taxRate) / 100 : 0;
    const total = taxable + taxAmt;

    const fmt = (n: number) => `${meta.currency} ${n.toFixed(meta.currency === 'KWD' || meta.currency === 'BHD' || meta.currency === 'OMR' ? 3 : 2)}`;

    // Save draft
    const saveDraft = () => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ docType, recipient, trip, items, meta, bank }));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2000);
    };

    // Clear
    const clearAll = () => {
        localStorage.removeItem(DRAFT_KEY);
        setRecipient({ name: '', details: '', email: '', phone: '' });
        setTrip({ pickup: '', destination: '', date: '', time: '', passengers: '', vehicle: '', showOnDoc: true });
        setItems([{ id: '1', description: 'Transport Service', quantity: 1, price: 0 }]);
        setMeta(m => ({ ...m, discountValue: 0, taxShow: false, paymentStatus: 'Unpaid' }));
    };

    // Download PDF
    const downloadPDF = async () => {
        const el = document.getElementById('print-doc');
        if (!el) return;
        const clientSlug = recipient.name ? recipient.name.replace(/\s+/g, '-') : 'Client';
        const filename = `${DOC_META[docType].label}-${meta.ref}-${clientSlug}.pdf`;
        const opt = {
            margin: [0,0,0,0] as [number,number,number,number],
            filename,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, windowWidth: 794, scrollY: 0 },
            jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        };
        try {
            // @ts-ignore
            const html2pdf = (await import('html2pdf.js')).default;
            await html2pdf().set(opt).from(el).save();
        } catch { window.print(); }
    };

    // Send email
    const sendEmail = async () => {
        if (!recipient.email) { alert('Enter client email first'); return; }
        setSendingEmail(true);
        try {
            const res = await fetch('/api/send-invoice-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: recipient.email,
                    clientName: recipient.name,
                    refId: meta.ref,
                    docType,
                    total: fmt(total),
                    currency: meta.currency,
                    fromCompany: profile.name,
                }),
            });
            if (res.ok) { setEmailSent(true); setTimeout(() => setEmailSent(false), 3000); }
            else alert('Email send failed');
        } catch { alert('Network error'); }
        setSendingEmail(false);
    };

    // WhatsApp share
    const whatsAppShare = () => {
        const msg = `*${DOC_META[docType].label} from ${profile.name}*\nRef: ${meta.ref}\nClient: ${recipient.name}\nAmount: ${fmt(total)}\nStatus: ${meta.paymentStatus}\n\nThank you for choosing us!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <button
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenSection(openSection === id ? null : id)}
            >
                <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{title}</span>
                {openSection === id ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            {openSection === id && <div className="px-5 pb-5 pt-2 space-y-3 border-t border-gray-100">{children}</div>}
        </div>
    );

    return (
        <div className="max-w-[1500px] mx-auto min-h-screen bg-gray-50 pb-24">

            {/* Topbar */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-6 py-3 print:hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <h1 className="text-base font-black text-gray-900">Document Generator</h1>
                        {/* Doc type tabs */}
                        <div className="hidden sm:flex bg-gray-100 rounded-lg p-1 gap-0.5">
                            {(['quotation','invoice','receipt','letterhead'] as DocType[]).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setDocType(t)}
                                    className={cn(
                                        'px-3 py-1 rounded-md text-xs font-bold transition-all capitalize',
                                        docType === t ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                    )}
                                >{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button size="sm" variant="outline" onClick={saveDraft} className="gap-1.5 h-8 text-xs border-gray-300">
                            {draftSaved ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Save className="w-3.5 h-3.5" />}
                            {draftSaved ? 'Saved!' : 'Save Draft'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={whatsAppShare} className="gap-1.5 h-8 text-xs border-green-300 text-green-700 hover:bg-green-50">
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </Button>
                        <Button size="sm" variant="outline" onClick={sendEmail} disabled={sendingEmail} className={cn('gap-1.5 h-8 text-xs border-gray-300', emailSent && 'border-green-300 text-green-600')}>
                            {emailSent ? <CheckCircle className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                            {emailSent ? 'Sent!' : sendingEmail ? 'Sending...' : 'Send Email'}
                        </Button>
                        <Button size="sm" onClick={downloadPDF} className="gap-1.5 h-8 text-xs bg-gray-900 text-white hover:bg-gray-700">
                            <Download className="w-3.5 h-3.5" /> Download PDF
                        </Button>
                    </div>
                </div>
                {/* Mobile doc type */}
                <div className="sm:hidden flex gap-1 mt-2 overflow-x-auto">
                    {(['quotation','invoice','receipt','letterhead'] as DocType[]).map(t => (
                        <button
                            key={t}
                            onClick={() => setDocType(t)}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap capitalize',
                                docType === t ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                            )}
                        >{t}</button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 print:p-0">

                {/* ─── EDITOR PANEL ─── */}
                <div className="w-full lg:w-[360px] xl:w-[400px] space-y-3 print:hidden shrink-0">

                    {/* Business Profile */}
                    <Section id="profile" title="Business Profile">
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Company Name</Label>
                            <Input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="h-9 text-sm font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Phone</Label>
                                <Input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="h-9 text-xs" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Email</Label>
                                <Input value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="h-9 text-xs" />
                            </div>
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Address</Label>
                            <Input value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} className="h-9 text-xs" />
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Website</Label>
                            <Input value={profile.website} onChange={e => setProfile({...profile, website: e.target.value})} className="h-9 text-xs" />
                        </div>
                    </Section>

                    {/* Client */}
                    <Section id="client" title="Client Details">
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Client Name *</Label>
                            <Input placeholder="Full name / Company" value={recipient.name} onChange={e => setRecipient({...recipient, name: e.target.value})} className="h-9 font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Email</Label>
                                <Input type="email" placeholder="client@email.com" value={recipient.email} onChange={e => setRecipient({...recipient, email: e.target.value})} className="h-9 text-xs" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Phone</Label>
                                <Input placeholder="+965 XXXX XXXX" value={recipient.phone} onChange={e => setRecipient({...recipient, phone: e.target.value})} className="h-9 text-xs" />
                            </div>
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Address / Notes</Label>
                            <Textarea placeholder="Client address or any additional info..." value={recipient.details} onChange={e => setRecipient({...recipient, details: e.target.value})} className="text-xs min-h-[60px]" />
                        </div>
                    </Section>

                    {/* Trip Details */}
                    <Section id="trip" title="Trip Details">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer mb-1">
                            <input type="checkbox" checked={trip.showOnDoc} onChange={e => setTrip({...trip, showOnDoc: e.target.checked})} className="rounded" />
                            Show trip info on document
                        </label>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Pickup Location</Label>
                            <Input placeholder="e.g. Kuwait International Airport" value={trip.pickup} onChange={e => setTrip({...trip, pickup: e.target.value})} className="h-9 text-xs" />
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Destination</Label>
                            <Input placeholder="e.g. Salmiya, Kuwait City" value={trip.destination} onChange={e => setTrip({...trip, destination: e.target.value})} className="h-9 text-xs" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Date</Label>
                                <Input type="date" value={trip.date} onChange={e => setTrip({...trip, date: e.target.value})} className="h-9 text-xs" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Time</Label>
                                <Input type="time" value={trip.time} onChange={e => setTrip({...trip, time: e.target.value})} className="h-9 text-xs" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Passengers</Label>
                                <Input type="number" min={1} placeholder="1" value={trip.passengers} onChange={e => setTrip({...trip, passengers: e.target.value})} className="h-9 text-xs" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Vehicle</Label>
                                <Input placeholder="e.g. Camry" value={trip.vehicle} onChange={e => setTrip({...trip, vehicle: e.target.value})} className="h-9 text-xs" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {VEHICLES.map(v => (
                                <span key={v} onClick={() => setTrip({...trip, vehicle: v})} className="text-[9px] px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer font-bold">{v}</span>
                            ))}
                        </div>
                    </Section>

                    {/* Items (not for letterhead) */}
                    {docType !== 'letterhead' && (
                        <Section id="items" title="Line Items">
                            <div className="space-y-3">
                                {items.map((item, idx) => (
                                    <div key={item.id} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder={`Item ${idx + 1} description`}
                                                value={item.description}
                                                onChange={e => setItems(prev => prev.map(i => i.id === item.id ? {...i, description: e.target.value} : i))}
                                                className="h-8 text-xs flex-1"
                                            />
                                            <Button size="icon" variant="ghost" onClick={() => items.length > 1 && setItems(prev => prev.filter(i => i.id !== item.id))} className="h-8 w-8 text-gray-300 hover:text-red-500 shrink-0">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label className="text-[9px] text-gray-400 uppercase">Qty</Label>
                                                <Input type="number" min={1} value={item.quantity} onChange={e => setItems(prev => prev.map(i => i.id === item.id ? {...i, quantity: parseFloat(e.target.value)||0} : i))} className="h-8 text-xs text-center" />
                                            </div>
                                            <div>
                                                <Label className="text-[9px] text-gray-400 uppercase">Price ({meta.currency})</Label>
                                                <Input type="number" min={0} value={item.price} onChange={e => setItems(prev => prev.map(i => i.id === item.id ? {...i, price: parseFloat(e.target.value)||0} : i))} className="h-8 text-xs text-right" />
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-right text-gray-500 font-bold">Subtotal: {fmt(item.quantity * item.price)}</p>
                                    </div>
                                ))}
                            </div>
                            <Button size="sm" variant="outline" onClick={() => setItems(prev => [...prev, { id: Date.now().toString(), description: '', quantity: 1, price: 0 }])} className="w-full h-8 text-xs gap-1.5 border-dashed border-gray-300">
                                <Plus className="w-3.5 h-3.5" /> Add Item
                            </Button>

                            {/* Currency */}
                            <div className="pt-2 border-t border-gray-100">
                                <Label className="text-[10px] text-gray-400 uppercase">Currency</Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {CURRENCIES.map(c => (
                                        <button key={c} onClick={() => setMeta(m => ({...m, currency: c}))} className={cn('text-[10px] px-2.5 py-1 rounded font-black uppercase transition-all', meta.currency === c ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>{c}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Discount */}
                            <div className="pt-2 border-t border-gray-100">
                                <Label className="text-[10px] text-gray-400 uppercase">Discount</Label>
                                <div className="flex gap-2 mt-1">
                                    <button onClick={() => setMeta(m => ({...m, discountType: 'fixed'}))} className={cn('text-[10px] px-2.5 py-1 rounded font-bold border transition-all', meta.discountType === 'fixed' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-500')}>Fixed {meta.currency}</button>
                                    <button onClick={() => setMeta(m => ({...m, discountType: 'percent'}))} className={cn('text-[10px] px-2.5 py-1 rounded font-bold border transition-all', meta.discountType === 'percent' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-500')}>Percent %</button>
                                    <Input type="number" min={0} value={meta.discountValue || ''} placeholder="0" onChange={e => setMeta(m => ({...m, discountValue: parseFloat(e.target.value)||0}))} className="h-8 text-xs flex-1" />
                                </div>
                            </div>

                            {/* Tax */}
                            <div className="pt-2 border-t border-gray-100">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                                    <input type="checkbox" checked={meta.taxShow} onChange={e => setMeta(m => ({...m, taxShow: e.target.checked}))} className="rounded" />
                                    Add Tax / VAT
                                </label>
                                {meta.taxShow && (
                                    <div className="flex gap-2 mt-2">
                                        <Input placeholder="VAT" value={meta.taxLabel} onChange={e => setMeta(m => ({...m, taxLabel: e.target.value}))} className="h-8 text-xs w-20" />
                                        <Input type="number" min={0} max={100} value={meta.taxRate} onChange={e => setMeta(m => ({...m, taxRate: parseFloat(e.target.value)||0}))} className="h-8 text-xs w-20 text-center" />
                                        <span className="text-xs text-gray-400 self-center">%</span>
                                    </div>
                                )}
                            </div>

                            {/* Totals preview */}
                            <div className="bg-gray-900 text-white rounded-lg p-3 space-y-1.5 text-xs mt-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="font-bold">{fmt(subtotal)}</span>
                                </div>
                                {discountAmt > 0 && (
                                    <div className="flex justify-between text-red-400">
                                        <span>Discount {meta.discountType === 'percent' ? `(${meta.discountValue}%)` : ''}</span>
                                        <span>-{fmt(discountAmt)}</span>
                                    </div>
                                )}
                                {meta.taxShow && (
                                    <div className="flex justify-between text-blue-400">
                                        <span>{meta.taxLabel} ({meta.taxRate}%)</span>
                                        <span>+{fmt(taxAmt)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t border-neutral-700 pt-1.5 font-black text-sm">
                                    <span>Total</span>
                                    <span className="text-green-400">{fmt(total)}</span>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* Letter body (letterhead only) */}
                    {docType === 'letterhead' && (
                        <Section id="letter" title="Letter Content">
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Subject</Label>
                                <Input value={meta.subject} onChange={e => setMeta(m => ({...m, subject: e.target.value}))} className="h-9 font-bold text-sm" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Body</Label>
                                <Textarea value={meta.letterBody} onChange={e => setMeta(m => ({...m, letterBody: e.target.value}))} className="text-sm min-h-[180px]" />
                            </div>
                        </Section>
                    )}

                    {/* Payment & Dates */}
                    <Section id="payment" title="Payment & Dates">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Reference</Label>
                                <Input value={meta.ref} onChange={e => setMeta(m => ({...m, ref: e.target.value}))} className="h-9 text-xs font-mono" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-gray-400 uppercase">Doc Date</Label>
                                <Input type="date" value={meta.date} onChange={e => setMeta(m => ({...m, date: e.target.value}))} className="h-9 text-xs" />
                            </div>
                            {docType === 'invoice' && (
                                <div>
                                    <Label className="text-[10px] text-gray-400 uppercase">Due Date</Label>
                                    <Input type="date" value={meta.dueDate} onChange={e => setMeta(m => ({...m, dueDate: e.target.value}))} className="h-9 text-xs" />
                                </div>
                            )}
                            {docType === 'quotation' && (
                                <div>
                                    <Label className="text-[10px] text-gray-400 uppercase">Valid Until</Label>
                                    <Input type="date" value={meta.validUntil} onChange={e => setMeta(m => ({...m, validUntil: e.target.value}))} className="h-9 text-xs" />
                                </div>
                            )}
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Payment Status</Label>
                            <div className="flex gap-1 mt-1">
                                {['Paid','Unpaid','Pending','Partial'].map(s => (
                                    <button key={s} onClick={() => setMeta(m => ({...m, paymentStatus: s}))} className={cn('text-[10px] px-2.5 py-1 rounded font-black uppercase', meta.paymentStatus === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Payment Method</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {['Cash to Driver','Bank Transfer','Online Payment','Card'].map(m => (
                                    <button key={m} onClick={() => { setMeta(prev => ({...prev, paymentMethod: m})); if (m === 'Bank Transfer') setBank(b => ({...b, show: true})); }} className={cn('text-[10px] px-2.5 py-1 rounded font-bold whitespace-nowrap', meta.paymentMethod === m ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>{m}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Footer Notes</Label>
                            <Textarea value={meta.notes} onChange={e => setMeta(m => ({...m, notes: e.target.value}))} className="text-xs min-h-[70px]" />
                        </div>
                    </Section>

                    {/* Bank Details */}
                    <Section id="bank" title="Bank Details">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                            <input type="checkbox" checked={bank.show} onChange={e => setBank(b => ({...b, show: e.target.checked}))} className="rounded" />
                            Show bank info on document
                        </label>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Bank Name</Label>
                            <Input value={bank.bankName} onChange={e => setBank(b => ({...b, bankName: e.target.value}))} className="h-9 text-xs" />
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Account Holder</Label>
                            <Input value={bank.accountName} onChange={e => setBank(b => ({...b, accountName: e.target.value}))} className="h-9 text-xs" />
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Account Number</Label>
                            <Input value={bank.accountNumber} onChange={e => setBank(b => ({...b, accountNumber: e.target.value}))} className="h-9 text-xs font-mono" />
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">IBAN</Label>
                            <Input value={bank.iban} onChange={e => setBank(b => ({...b, iban: e.target.value}))} className="h-9 text-xs font-mono tracking-wider" />
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">SWIFT / BIC</Label>
                            <Input value={bank.swift} onChange={e => setBank(b => ({...b, swift: e.target.value}))} className="h-9 text-xs font-mono" />
                        </div>
                        <div>
                            <Label className="text-[10px] text-gray-400 uppercase">Transfer Instructions</Label>
                            <Input value={bank.transferNote} onChange={e => setBank(b => ({...b, transferNote: e.target.value}))} className="h-9 text-xs italic" />
                        </div>
                    </Section>

                    <Button variant="ghost" size="sm" onClick={clearAll} className="w-full h-8 text-xs text-gray-400 hover:text-red-500 gap-1.5">
                        <RotateCcw className="w-3 h-3" /> Clear / Reset
                    </Button>
                </div>

                {/* ─── DOCUMENT PREVIEW ─── */}
                <div className="flex-1 flex justify-center items-start">
                    <div
                        id="print-doc"
                        className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-2xl border border-gray-100 print:shadow-none print:border-none relative overflow-hidden"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                        {/* PAID / RECEIPT stamp */}
                        {docType === 'receipt' && meta.paymentStatus === 'Paid' && (
                            <div className="absolute top-16 right-12 rotate-[-18deg] border-4 border-green-500 text-green-500 px-6 py-2 text-4xl font-black uppercase tracking-widest opacity-20 pointer-events-none select-none z-10">
                                PAID
                            </div>
                        )}

                        <div className="p-12 md:p-16 flex flex-col min-h-[1123px]">

                            {/* Header */}
                            <div className="flex justify-between items-start pb-8 mb-8 border-b-2 border-gray-100">
                                <div className="space-y-3">
                                    {profile.logoUrl && (
                                        <img src={profile.logoUrl} alt="Logo" className="h-12 object-contain" />
                                    )}
                                    <div>
                                        <h2 className="text-base font-black text-gray-900 uppercase tracking-tight">{profile.name}</h2>
                                        <div className="text-[11px] text-gray-500 space-y-0.5 mt-1">
                                            <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5 shrink-0" />{profile.address}</p>
                                            <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5 shrink-0" />{profile.phone}</p>
                                            <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5 shrink-0" />{profile.email}</p>
                                            <p className="flex items-center gap-1.5"><Globe className="w-2.5 h-2.5 shrink-0" />{profile.website}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h1 className="text-4xl font-black uppercase tracking-[0.15em] mb-3" style={{ color: DOC_META[docType].color, opacity: 0.12 }}>
                                        {DOC_META[docType].label}
                                    </h1>
                                    <h1 className="text-2xl font-black uppercase tracking-[0.1em] -mt-9 mb-3" style={{ color: DOC_META[docType].color }}>
                                        {DOC_META[docType].label}
                                    </h1>
                                    {/* Status badges */}
                                    <div className="flex gap-1.5 justify-end mb-4 flex-wrap">
                                        <span className={cn('px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest', meta.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : meta.paymentStatus === 'Pending' || meta.paymentStatus === 'Partial' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>
                                            {meta.paymentStatus}
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[9px] font-black uppercase tracking-widest">
                                            {meta.paymentMethod}
                                        </span>
                                    </div>
                                    <div className="text-xs space-y-1">
                                        <div>
                                            <p className="text-[9px] text-gray-400 uppercase font-bold">Reference</p>
                                            <p className="font-black text-gray-900">#{meta.ref}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-gray-400 uppercase font-bold mt-2">Date</p>
                                            <p className="font-bold text-gray-800">{meta.date ? new Date(meta.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}</p>
                                        </div>
                                        {docType === 'invoice' && meta.dueDate && (
                                            <div>
                                                <p className="text-[9px] text-red-400 uppercase font-bold mt-1">Due Date</p>
                                                <p className="font-bold text-red-600">{new Date(meta.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        )}
                                        {docType === 'quotation' && meta.validUntil && (
                                            <div>
                                                <p className="text-[9px] text-amber-500 uppercase font-bold mt-1">Valid Until</p>
                                                <p className="font-bold text-amber-700">{new Date(meta.validUntil).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Recipient */}
                            <div className="mb-8">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                                    {docType === 'letterhead' ? 'To' : 'Bill To'}
                                </p>
                                <div className="bg-gray-50 border-l-4 rounded-r-lg p-5" style={{ borderColor: DOC_META[docType].color }}>
                                    <p className="font-black text-lg text-gray-900">{recipient.name || 'CLIENT NAME'}</p>
                                    {recipient.phone && <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><Phone className="w-3 h-3" />{recipient.phone}</p>}
                                    {recipient.email && <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><Mail className="w-3 h-3" />{recipient.email}</p>}
                                    {recipient.details && <pre className="text-xs text-gray-500 mt-1 font-sans whitespace-pre-wrap">{recipient.details}</pre>}
                                </div>
                            </div>

                            {/* Trip Details */}
                            {trip.showOnDoc && (trip.pickup || trip.destination || trip.date || trip.vehicle) && (
                                <div className="mb-8 border border-gray-100 rounded-xl overflow-hidden">
                                    <div className="px-5 py-2.5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50 border-b border-gray-100">
                                        Trip Details
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-5">
                                        {trip.pickup && (
                                            <div>
                                                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Pickup</p>
                                                <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 inline-block" />{trip.pickup}
                                                </p>
                                            </div>
                                        )}
                                        {trip.destination && (
                                            <div>
                                                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Destination</p>
                                                <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 inline-block" />{trip.destination}
                                                </p>
                                            </div>
                                        )}
                                        {trip.date && (
                                            <div>
                                                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Date & Time</p>
                                                <p className="text-xs font-bold text-gray-800">
                                                    {new Date(trip.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                    {trip.time && ` @ ${trip.time}`}
                                                </p>
                                            </div>
                                        )}
                                        {(trip.vehicle || trip.passengers) && (
                                            <div>
                                                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Vehicle / Pax</p>
                                                <p className="text-xs font-bold text-gray-800 flex items-center gap-2">
                                                    {trip.vehicle && <span className="flex items-center gap-1"><Car className="w-3 h-3 text-gray-400" />{trip.vehicle}</span>}
                                                    {trip.passengers && <span className="flex items-center gap-1"><Users className="w-3 h-3 text-gray-400" />{trip.passengers} pax</span>}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Main content */}
                            {docType === 'letterhead' ? (
                                <div className="flex-1 space-y-5">
                                    <div>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Subject</p>
                                        <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">{meta.subject}</h3>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{meta.letterBody}</p>
                                </div>
                            ) : (
                                <div className="flex-1">
                                    {/* Items Table */}
                                    <div className="border border-gray-100 rounded-xl overflow-hidden mb-6 shadow-sm">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-100">
                                                    <th className="px-5 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                                                    <th className="px-4 py-3 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest w-16">Qty</th>
                                                    <th className="px-4 py-3 text-right text-[9px] font-black text-gray-400 uppercase tracking-widest w-32">Rate</th>
                                                    <th className="px-5 py-3 text-right text-[9px] font-black text-gray-400 uppercase tracking-widest w-36">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {items.map(item => (
                                                    <tr key={item.id}>
                                                        <td className="px-5 py-4 text-sm font-bold text-gray-900">{item.description || 'Service Description'}</td>
                                                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.quantity}</td>
                                                        <td className="px-4 py-4 text-right text-sm text-gray-600">{fmt(item.price)}</td>
                                                        <td className="px-5 py-4 text-right text-sm font-black text-gray-900">{fmt(item.quantity * item.price)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* Totals */}
                                        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="flex justify-between w-56 text-xs">
                                                    <span className="text-gray-500">Subtotal</span>
                                                    <span className="font-bold text-gray-900">{fmt(subtotal)}</span>
                                                </div>
                                                {discountAmt > 0 && (
                                                    <div className="flex justify-between w-56 text-xs">
                                                        <span className="text-red-500">Discount {meta.discountType === 'percent' ? `(${meta.discountValue}%)` : ''}</span>
                                                        <span className="font-bold text-red-600">-{fmt(discountAmt)}</span>
                                                    </div>
                                                )}
                                                {meta.taxShow && (
                                                    <div className="flex justify-between w-56 text-xs">
                                                        <span className="text-blue-500">{meta.taxLabel} ({meta.taxRate}%)</span>
                                                        <span className="font-bold text-blue-700">+{fmt(taxAmt)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between w-56 pt-2 border-t border-gray-200">
                                                    <span className="text-sm font-black text-gray-900 uppercase">Total</span>
                                                    <span className="text-xl font-black text-gray-900">{fmt(total)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bank Details */}
                                    {bank.show && (
                                        <div className="border border-blue-100 bg-blue-50/30 p-5 rounded-xl mb-6">
                                            <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.25em] mb-3">Bank Transfer Details</p>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                                                {[
                                                    { label: 'Bank Name', val: bank.bankName },
                                                    { label: 'Account Name', val: bank.accountName },
                                                    { label: 'Account Number', val: bank.accountNumber },
                                                    { label: 'SWIFT / BIC', val: bank.swift },
                                                ].map(r => r.val ? (
                                                    <div key={r.label} className="flex justify-between border-b border-blue-100 pb-1.5">
                                                        <span className="text-gray-400 text-[10px]">{r.label}</span>
                                                        <span className="font-bold text-gray-900">{r.val}</span>
                                                    </div>
                                                ) : null)}
                                                {bank.iban && (
                                                    <div className="col-span-2 flex justify-between border-b border-blue-100 pb-1.5">
                                                        <span className="text-gray-400 text-[10px]">IBAN</span>
                                                        <span className="font-black text-blue-700 tracking-wider">{bank.iban}</span>
                                                    </div>
                                                )}
                                                {bank.transferNote && (
                                                    <p className="col-span-2 text-[9px] text-gray-500 italic mt-1">* {bank.transferNote}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Footer */}
                            <div className="mt-auto pt-8 border-t-2 border-gray-100">
                                <div className="flex justify-between items-end gap-8">
                                    <div className="flex-1">
                                        {meta.notes && (
                                            <>
                                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Notes</p>
                                                <p className="text-[10px] text-gray-500 italic leading-relaxed whitespace-pre-wrap">{meta.notes}</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Authorized By</p>
                                        <div className="flex items-end justify-end gap-6 h-12">
                                            <div className="text-center">
                                                <img src="/ismail-signature.png" alt="Ismail" className="h-full w-auto object-contain select-none" />
                                                <p className="text-[7px] font-bold text-gray-300 mt-1 uppercase tracking-widest">Ismail</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[9px] text-gray-300 text-center mt-6 tracking-wider">{profile.name} · {profile.email} · {profile.website}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    html, body { background: white !important; margin: 0 !important; padding: 0 !important; }
                    #print-doc { width: 210mm !important; min-height: 297mm !important; box-shadow: none !important; border: none !important; margin: 0 !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            `}</style>
        </div>
    );
}
