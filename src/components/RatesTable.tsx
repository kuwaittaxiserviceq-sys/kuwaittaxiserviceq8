"use client";

import { useMemo, useState } from "react";
import { ratesData } from "./ratesData";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const pageSizes = [10, 25, 50, "All"] as const;

export default function RatesTable() {
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState<(typeof pageSizes)[number]>(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ratesData;
    return ratesData.filter(
      (row) =>
        row.area.toLowerCase().includes(q) ||
        row.governorate.toLowerCase().includes(q)
    );
  }, [query]);

  const effectivePageSize = pageSize === "All" ? filtered.length || 1 : pageSize;
  const totalPages = Math.max(1, Math.ceil(filtered.length / effectivePageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * effectivePageSize;
  const rows = filtered.slice(start, start + effectivePageSize);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updatePageSize(value: (typeof pageSizes)[number]) {
    setPageSize(value);
    setPage(1);
  }

  return (
    <section id="rate-table" className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Check Fares"
          title="Check Fares To & From Kuwait International Airport"
          description="The following rates apply to a one-way trip for each vehicle, to or from Kuwait International Airport. Rates are not calculated per passenger."
        />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-zinc-600">
            <select
              value={pageSize}
              onChange={(e) =>
                updatePageSize(
                  e.target.value === "All" ? "All" : (Number(e.target.value) as 10 | 25 | 50)
                )
              }
              className="rounded-lg border border-zinc-300 px-2 py-1.5 text-sm outline-none focus:border-brand-green"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            entries per page
          </label>

          <label className="flex items-center gap-2 text-sm text-zinc-600">
            Search:
            <input
              type="text"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="e.g. Salmiya"
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-brand-green"
            />
          </label>
        </div>

        <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-brand-green-light text-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold">City / Area</th>
                <th className="px-4 py-3 font-semibold">Sedan (Max. 3)</th>
                <th className="px-4 py-3 font-semibold">SUV (Max. 6)</th>
                <th className="px-4 py-3 font-semibold">Van (Max. 8)</th>
                <th className="px-4 py-3 font-semibold">Van (Max. 14)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {rows.map((row) => (
                <tr key={row.area} className="even:bg-zinc-50/60">
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-900">{row.area}</div>
                    <div className="text-xs text-zinc-500">{row.governorate}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {row.sedan}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {row.suv}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {row.van8}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green">KD {row.van14}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                    No matching cities or areas found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-600 sm:flex-row">
          <span>
            Showing {filtered.length === 0 ? 0 : start + 1} to{" "}
            {Math.min(start + effectivePageSize, filtered.length)} of {filtered.length}{" "}
            entries
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <span className="px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        <p className="text-sm text-zinc-600">
          If you don&apos;t see your city or area in this price list, please
          call us at{" "}
          <a href="tel:+96518008080" className="font-semibold text-brand-green">
            +965 1800 8080
          </a>{" "}
          or send a message — we&apos;ll reply with your fare instantly.
        </p>
      </Container>
    </section>
  );
}
