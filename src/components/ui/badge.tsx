'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'secondary' | 'destructive' | 'outline';

const variantClasses: Record<Variant, string> = {
    default: 'border-transparent bg-primary text-primary-foreground',
    secondary: 'border-transparent bg-gray-100 text-gray-900',
    destructive: 'border-transparent bg-red-600 text-white',
    outline: 'text-inherit',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Variant;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
                variantClasses[variant],
                className
            )}
            {...props}
        />
    );
}
