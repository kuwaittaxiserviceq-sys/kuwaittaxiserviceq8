'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectContextValue {
    value?: string;
    onValueChange: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    labels: React.MutableRefObject<Map<string, React.ReactNode>>;
    version: number;
    bumpVersion: () => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
    const ctx = React.useContext(SelectContext);
    if (!ctx) throw new Error('Select components must be used within <Select>');
    return ctx;
}

export function Select({
    value,
    defaultValue,
    onValueChange = () => {},
    disabled = false,
    children,
}: {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    const [open, setOpenState] = React.useState(false);
    // Uncontrolled mode: track the selection internally when only defaultValue is given.
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const labels = React.useRef(new Map<string, React.ReactNode>());
    const [version, setVersion] = React.useState(0);
    const bumpVersion = React.useCallback(() => setVersion(v => v + 1), []);

    const setOpen = React.useCallback(
        (next: boolean) => {
            if (!disabled) setOpenState(next);
        },
        [disabled]
    );

    const handleValueChange = React.useCallback(
        (next: string) => {
            setInternalValue(next);
            onValueChange(next);
        },
        [onValueChange]
    );

    return (
        <SelectContext.Provider
            value={{
                value: value !== undefined ? value : internalValue,
                onValueChange: handleValueChange,
                open,
                setOpen,
                labels,
                version,
                bumpVersion,
            }}
        >
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    );
}

export const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    return (
        <button
            ref={ref}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={cn(
                'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-1" />
        </button>
    );
});
SelectTrigger.displayName = 'SelectTrigger';

export function SelectValue({ placeholder }: { placeholder?: React.ReactNode }) {
    const { value, labels } = useSelectContext();
    const label = value !== undefined && value !== '' ? labels.current.get(value) ?? value : undefined;
    return (
        <span className={cn('truncate text-left', label === undefined && 'text-gray-400')}>
            {label ?? placeholder ?? ''}
        </span>
    );
}

export function SelectContent({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const { open, setOpen } = useSelectContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!open) return;
        const onClickAway = (e: MouseEvent) => {
            if (contentRef.current && !contentRef.current.parentElement?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', onClickAway);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClickAway);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, setOpen]);

    return (
        <div
            ref={contentRef}
            role="listbox"
            className={cn(
                'absolute left-0 top-full z-50 mt-1 max-h-64 w-full min-w-[8rem] overflow-y-auto rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-md',
                !open && 'hidden',
                className
            )}
        >
            {children}
        </div>
    );
}

export function SelectItem({
    value,
    className,
    children,
}: {
    value: string;
    className?: string;
    children: React.ReactNode;
}) {
    const ctx = useSelectContext();
    const selected = ctx.value === value;

    // Register this item's label so SelectValue can render it in the trigger.
    React.useEffect(() => {
        ctx.labels.current.set(value, children);
        ctx.bumpVersion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, children]);

    return (
        <div
            role="option"
            aria-selected={selected}
            onClick={() => {
                ctx.onValueChange(value);
                ctx.setOpen(false);
            }}
            className={cn(
                'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm hover:bg-gray-100',
                selected && 'font-medium',
                className
            )}
        >
            <span className="truncate">{children}</span>
            {selected && <Check className="absolute right-2 h-4 w-4" />}
        </div>
    );
}
