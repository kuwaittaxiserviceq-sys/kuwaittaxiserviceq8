'use client';

import { useEffect, useRef } from 'react';
import {
    Bold, Italic, Underline, Heading2, Heading3, List, ListOrdered,
    Quote, Link2, ImageIcon, Undo2, Redo2, RemoveFormatting, Minus,
} from 'lucide-react';

// Lightweight contentEditable rich text editor (no external editor deps).
export default function RichTextEditor({
    content,
    onChange,
    placeholder,
}: {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}) {
    const editorRef = useRef<HTMLDivElement>(null);

    // Push external content into the editor only when it actually differs,
    // so typing doesn't reset the caret.
    useEffect(() => {
        const el = editorRef.current;
        if (el && el.innerHTML !== content) {
            el.innerHTML = content || '';
        }
    }, [content]);

    const emitChange = () => {
        const el = editorRef.current;
        if (el) onChange(el.innerHTML);
    };

    const exec = (command: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false, value);
        emitChange();
    };

    const insertLink = () => {
        const url = window.prompt('Link URL:');
        if (url) exec('createLink', url);
    };

    const insertImage = () => {
        const url = window.prompt('Image URL:');
        if (url) exec('insertImage', url);
    };

    const tools: { icon: React.ComponentType<{ className?: string }>; title: string; action: () => void }[] = [
        { icon: Bold, title: 'Bold', action: () => exec('bold') },
        { icon: Italic, title: 'Italic', action: () => exec('italic') },
        { icon: Underline, title: 'Underline', action: () => exec('underline') },
        { icon: Heading2, title: 'Heading 2', action: () => exec('formatBlock', '<h2>') },
        { icon: Heading3, title: 'Heading 3', action: () => exec('formatBlock', '<h3>') },
        { icon: List, title: 'Bullet list', action: () => exec('insertUnorderedList') },
        { icon: ListOrdered, title: 'Numbered list', action: () => exec('insertOrderedList') },
        { icon: Quote, title: 'Quote', action: () => exec('formatBlock', '<blockquote>') },
        { icon: Minus, title: 'Divider', action: () => exec('insertHorizontalRule') },
        { icon: Link2, title: 'Insert link', action: insertLink },
        { icon: ImageIcon, title: 'Insert image', action: insertImage },
        { icon: RemoveFormatting, title: 'Clear formatting', action: () => exec('removeFormat') },
        { icon: Undo2, title: 'Undo', action: () => exec('undo') },
        { icon: Redo2, title: 'Redo', action: () => exec('redo') },
    ];

    return (
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
                {tools.map(({ icon: Icon, title, action }) => (
                    <button
                        key={title}
                        type="button"
                        title={title}
                        onMouseDown={e => e.preventDefault()}
                        onClick={action}
                        className="p-2 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <Icon className="w-4 h-4" />
                    </button>
                ))}
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={emitChange}
                onBlur={emitChange}
                data-placeholder={placeholder || 'Start writing...'}
                className="min-h-[320px] max-h-[70vh] overflow-y-auto px-4 py-3 text-sm leading-relaxed focus:outline-none prose prose-sm max-w-none [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 [&_blockquote]:italic [&_a]:text-emerald-700 [&_a]:underline [&_img]:max-w-full [&_img]:rounded"
            />
        </div>
    );
}
