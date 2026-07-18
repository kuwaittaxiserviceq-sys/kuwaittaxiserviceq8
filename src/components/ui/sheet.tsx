'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SheetContextValue {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue>({
    open: false,
    onOpenChange: () => {},
});

export function Sheet({
    open = false,
    onOpenChange = () => {},
    children,
}: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}) {
    return (
        <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>
    );
}

export function SheetTrigger({
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { onOpenChange } = React.useContext(SheetContext);
    return (
        <button type="button" className={className} onClick={() => onOpenChange(true)} {...props}>
            {children}
        </button>
    );
}

const sideClasses: Record<string, string> = {
    right: 'inset-y-0 right-0 h-full border-l data-side-right',
    left: 'inset-y-0 left-0 h-full border-r',
    top: 'inset-x-0 top-0 border-b',
    bottom: 'inset-x-0 bottom-0 border-t',
};

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export function SheetContent({
    side = 'right',
    className,
    children,
    ...props
}: SheetContentProps) {
    const { open, onOpenChange } = React.useContext(SheetContext);

    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onOpenChange(false);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="fixed inset-0 bg-black/60"
                onClick={() => onOpenChange(false)}
                aria-hidden="true"
            />
            <div
                role="dialog"
                aria-modal="true"
                className={cn(
                    'fixed z-50 bg-white shadow-lg transition-transform',
                    sideClasses[side],
                    (side === 'left' || side === 'right') && 'w-3/4 sm:max-w-sm',
                    className
                )}
                {...props}
            >
                {children}
                <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                    aria-label="Close"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex flex-col space-y-2 p-4', className)} {...props} />
    );
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4', className)}
            {...props}
        />
    );
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h2 className={cn('text-lg font-semibold', className)} {...props} />;
}

export function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn('text-sm text-gray-500', className)} {...props} />;
}
