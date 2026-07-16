import type { Metadata } from "next";
import DocumentBuilder from "@/components/DocumentBuilder";

export const metadata: Metadata = {
  title: "Documents | Kuwait Taxi Admin",
  robots: { index: false, follow: false },
};

export default function DocumentsPage() {
  return <DocumentBuilder />;
}
