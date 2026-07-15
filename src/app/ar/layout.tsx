import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export default function ArabicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="ar"
      dir="rtl"
      className={`${cairo.className} flex min-h-full flex-1 flex-col`}
    >
      {children}
    </div>
  );
}
