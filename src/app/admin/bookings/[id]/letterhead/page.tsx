'use client';
// @ts-ignore
import html2canvas from 'html2canvas';
// @ts-ignore
import { jsPDF } from 'jspdf';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import { 
    Printer, 
    ArrowLeft, 
    Globe, 
    MapPin, 
    Phone,
    Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Booking {
    id: string;
    created_at: string;
    pickup_location: string;
    destination: string;
    pickup_date: string;
    pickup_time: string;
    vehicle_type: string;
    passengers: number;
    luggage: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    status: string;
    special_requests?: string;
    total_price?: number;
    currency?: string;
    payment_method?: string;
}

export default function LetterheadPage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [quickNote, setQuickNote] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isEmailingOnly, setIsEmailingOnly] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setBooking(data);
            } catch (error) {
                console.error('Error fetching booking:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBooking();
    }, [id]);

    // Renders the letterhead to a PDF and returns it, without sending or downloading anything.
    const generateQuotationPdf = async () => {
        if (!booking) return null;
        const element = document.getElementById('printable-area');
        if (!element) return null;

        const customerName = booking.customer_name ? booking.customer_name.replace(/\s+/g, '-') : 'Client';
        const refId = booking.id.slice(0, 8).toUpperCase();
        const dateStr = booking.pickup_date || new Date().toISOString().split('T')[0];
        const filename = `Quotation-${refId}-${customerName}-${dateStr}.pdf`;

        const a4W = 210;
        const a4H = 297;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, scrollY: 0 });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        pdf.addImage(imgData, 'JPEG', 0, 0, a4W, a4H);

        // Get base64 string (without the "data:application/pdf;base64," prefix)
        const pdfBase64 = pdf.output('datauristring').split(',')[1];

        return { pdf, pdfBase64, filename };
    };

    const emailQuotation = async (pdfBase64: string, filename: string) => {
        if (!booking) return;
        const emailRes = await adminFetch('/api/send-quote-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                booking: {
                    ...booking,
                    special_requests: quickNote.trim()
                        ? `${booking.special_requests || ''}\nNote: ${quickNote}`
                        : booking.special_requests
                },
                currency: booking.currency || 'KWD',
                pdfBase64,
                pdfFilename: filename,
            }),
        });

        if (!emailRes.ok) {
            throw new Error('Failed to send quote email');
        }
    };

    // Combined action: email the quotation AND download a local copy.
    const handlePrint = async () => {
        if (!booking) return;

        setSendingEmail(true);
        try {
            const result = await generateQuotationPdf();
            if (!result) return;

            await emailQuotation(result.pdfBase64, result.filename);
            result.pdf.save(result.filename);

            alert("✅ Quotation emailed with PDF attachment & downloaded successfully!");
        } catch (error) {
            console.error('Error in handlePrint:', error);
            alert("An error occurred. Please try again.");
        } finally {
            setSendingEmail(false);
        }
    };

    // Download-only action: no email is sent.
    const handleDownloadOnly = async () => {
        if (!booking) return;

        setIsDownloading(true);
        try {
            const result = await generateQuotationPdf();
            if (!result) return;
            result.pdf.save(result.filename);
        } catch (error) {
            console.error('Error downloading quotation PDF:', error);
            alert("An error occurred while generating the PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    // Email-only action: no local download is triggered.
    const handleSendEmailOnly = async () => {
        if (!booking) return;

        setIsEmailingOnly(true);
        try {
            const result = await generateQuotationPdf();
            if (!result) return;
            await emailQuotation(result.pdfBase64, result.filename);
            setEmailSent(true);
            setTimeout(() => setEmailSent(false), 4000);
        } catch (error) {
            console.error('Error emailing quotation:', error);
            alert("An error occurred while sending the email. Please try again.");
        } finally {
            setIsEmailingOnly(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    const documentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 print:bg-white print:py-0 print:px-0 print:min-h-0">
            {/* Header Controls */}
            <div className="max-w-[210mm] mx-auto mb-4 flex justify-between items-center print:hidden">
                <Button variant="outline" onClick={() => router.back()} className="bg-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={handleDownloadOnly}
                        disabled={isDownloading}
                        variant="outline"
                        className="bg-white font-bold"
                    >
                        {isDownloading ? (
                            <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900 mr-2"></div> Generating...</>
                        ) : (
                            <><Printer className="w-4 h-4 mr-2" /> Download PDF</>
                        )}
                    </Button>

                    <Button
                        onClick={handleSendEmailOnly}
                        disabled={isEmailingOnly}
                        className={`font-bold ${emailSent ? 'bg-green-500 text-white hover:bg-green-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        {isEmailingOnly ? (
                            <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div> Sending...</>
                        ) : (
                            <><Mail className="w-4 h-4 mr-2" /> {emailSent ? '✓ Email Sent!' : 'Send Email'}</>
                        )}
                    </Button>

                    <Button
                        onClick={handlePrint}
                        disabled={sendingEmail}
                        className="bg-primary text-black hover:bg-black hover:text-white font-bold"
                    >
                        {sendingEmail ? (
                            <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div> Sending & Generating...</>
                        ) : (
                            <><Printer className="w-4 h-4 mr-2" /> Send & Download Quotation</>
                        )}
                    </Button>
                </div>
            </div>

            {/* Quick Note Input — screen only */}
            <div className="max-w-[210mm] mx-auto mb-4 print:hidden">
                <textarea
                    value={quickNote}
                    onChange={e => setQuickNote(e.target.value)}
                    placeholder="Type a custom message here (e.g. I have 2 checked bags...)"
                    rows={2}
                    className="w-full border-2 border-dashed border-primary/20 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-primary focus:ring-0 resize-none bg-white/50 backdrop-blur-sm shadow-sm transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1 uppercase font-bold tracking-widest">Note: Text entered above will appear directly in the quotation below.</p>
            </div>

            {/* Letterhead Container */}
            <div
                id="printable-area"
                className="max-w-[210mm] mx-auto bg-white shadow-xl border border-gray-100 print:shadow-none print:border-none print:m-0"
            >
                <div className="h-full flex flex-col p-12 md:p-16 relative font-sans text-gray-900 justify-between">
                    <div>
                        {/* Company Header */}
                        <div className="flex justify-between items-start mb-12 border-b-2 border-gray-100 pb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2.5 mb-3">
                                    <div className="relative w-12 h-12 print:w-10 print:h-10">
                                        <Image 
                                            src="/logo.svg" 
                                            alt="Kuwait Taxi Service" 
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-xl font-black tracking-tighter text-gray-900 uppercase print:text-lg">
                                        Kuwait Taxi <span className="text-lime-600">Service</span>
                                    </span>
                                </div>
                                <div className="space-y-0.5 mt-2">
                                    <div className="text-[11px] text-gray-500 space-y-0.5 max-w-[250px] leading-tight font-medium">
                                        <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" /> Kuwait City, Kuwait</p>
                                        <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> kuwaittaxiserviceq@gmail.com</p>
                                        <p className="flex items-center gap-1.5"><Globe className="w-2.5 h-2.5" /> www.kuwaittaxiserviceq8.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right space-y-1">
                                <h1 className="text-3xl font-black text-gray-100 uppercase tracking-[0.2em] leading-none mb-4">QUOTATION</h1>
                                <div className="text-xs space-y-0.5 pt-2">
                                    <p className="font-bold text-gray-400 text-[10px] uppercase">Reference ID</p>
                                    <p className="font-bold text-gray-900 text-sm">#{booking.id.slice(0, 8).toUpperCase()}</p>
                                    <p className="font-bold text-gray-400 text-[10px] uppercase mt-4 block">Document Date</p>
                                    <p className="font-bold text-gray-900">{documentDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recipient */}
                        <div className="mb-10">
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Prepared For</p>
                            <div className="bg-gray-50 border-l-2 border-gray-200 p-6 rounded-r-lg">
                                <p className="font-bold text-lg text-gray-900">{booking.customer_name || 'CLIENT NAME'}</p>
                                <div className="text-xs font-semibold text-gray-500 leading-relaxed font-sans mt-2 space-y-1">
                                    {booking.customer_phone && <p>Phone: {booking.customer_phone}</p>}
                                    {booking.customer_email && <p>Email: {booking.customer_email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Letter Content */}
                        <div className="flex-1 space-y-6">
                            <h3 className="font-bold text-gray-900 uppercase text-sm border-b pb-2 inline-block">Sub: Official Quotation for Transport Services</h3>
                            
                            <p className="text-sm font-semibold text-gray-700 leading-relaxed whitespace-pre-wrap">
                                Dear {booking.customer_name},<br/><br/>
                                Thank you for choosing Kuwait Taxi Service. We are pleased to provide the following quotation for your requested transportation services. Please review the details of your upcoming journey below:
                            </p>

                            <div className="bg-gray-50 p-6 rounded-lg text-sm space-y-4 my-6">
                                <div className="grid grid-cols-2 gap-y-4">
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Pickup Date</p>
                                        <p className="font-bold text-gray-900">{booking.pickup_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Time</p>
                                        <p className="font-bold text-gray-900">{booking.pickup_time}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Route Details</p>
                                        <p className="font-bold text-gray-900">From: {booking.pickup_location}</p>
                                        <p className="font-bold text-gray-900 mt-1">To: {booking.destination}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Vehicle Requirements</p>
                                        <p className="font-bold text-gray-900">{booking.vehicle_type}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Occupancy</p>
                                        <p className="font-bold text-gray-900">{booking.passengers} Passengers, {booking.luggage} Bags</p>
                                    </div>
                                    {booking.special_requests && (
                                        <div className="col-span-2">
                                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Special Requests</p>
                                            <p className="font-bold text-gray-900">{booking.special_requests}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm font-semibold text-gray-700">
                                This quotation is based on the details provided. For any modifications, please contact our support team. We look forward to providing you with a comfortable and seamless experience.
                            </p>

                            {quickNote.trim() && (
                                <div className="mt-4 border-l-2 border-gray-300 px-4 py-2">
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{quickNote.trim()}</p>
                                </div>
                            )}
                            
                            {booking.total_price !== undefined && booking.total_price !== null && (
                                <div className="mt-8 flex items-center justify-between border-y border-gray-100 py-4 bg-gray-50/50 px-6 rounded-lg print:border-y-2 print:border-gray-900 print:bg-white">
                                    <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">Total Quoted Price</span>
                                    <span className="text-2xl font-black text-gray-900 underline decoration-blue-500 underline-offset-8">
                                        {booking.currency || 'KWD'} {booking.total_price.toFixed(2)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-end gap-12">
                        <div className="max-w-md">
                            <p className="text-[9px] font-bold text-gray-300 uppercase mb-2 tracking-widest">Important Notes</p>
                            <p className="text-[10px] font-semibold text-gray-500 italic leading-relaxed whitespace-pre-wrap opacity-80">
                                Terms & Conditions:
                                • Price includes fuel, toll fees, and basic wait times.
                                • Cancellation is free up to 24 hours before pickup.
                                • This quotation is valid for 7 days from the date of issue.
                            </p>
                        </div>
                        <div className="text-right min-w-[200px]">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Authorized Signature</p>
                            <div className="flex items-end justify-end gap-6 h-12">
                                <div className="text-center">
                                    <img src="/ismail-signature.png" alt="Authorized signature" className="h-full w-auto object-contain select-none" />
                                    <p className="text-[7px] font-bold text-gray-300 mt-1 uppercase italic tracking-widest">Kuwait Taxi Service</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { background: white !important; margin: 0 !important; }
                    main { margin: 0 !important; padding: 0 !important; }
                    .md\\:ml-64, header, nav, aside, .print\\:hidden { display: none !important; }
                    #printable-area {
                        width: 210mm !important;
                        height: 297mm !important;
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        position: static !important;
                    }
                }
            `}</style>
        </div>
    );
}
