import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, MoveRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { blogService, type Blog } from "@/lib/blogService";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Kuwait Taxi Blog | Airport, Fares & Saudi Border Travel Guides",
  description:
    "Guides on Kuwait airport taxi fares, the Kuwait–Saudi border crossing, area-by-area pricing, and getting around Kuwait — from Kuwait Taxi Service.",
};

async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const blogs = await blogService.getAllBlogs();
    return blogs.filter((b) => b.status === "published");
  } catch {
    return [];
  }
}

const blogBreadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <>
      <JsonLd data={blogBreadcrumbs} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-black to-brand-green-dark py-20 sm:py-24">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-red-400">
              <BookOpen className="h-4 w-4" />
              Travel &amp; Fare Guides
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Kuwait Taxi Blog
            </h1>
            <p className="text-zinc-300">
              Practical guides on airport pickups, taxi fares by area, and
              crossing the Kuwait–Saudi border — written by the team behind
              Kuwait Taxi Service.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <Container className="flex flex-col gap-10">
            {blogs.length === 0 ? (
              <p className="py-10 text-center text-zinc-500">
                New guides are on the way — check back shortly.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl bg-white p-6 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5"
                  >
                    <span className="w-fit rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold text-brand-green">
                      {blog.category}
                    </span>
                    <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-brand-green">
                      {blog.title}
                    </h2>
                    <p className="line-clamp-3 text-sm leading-6 text-zinc-600">
                      {blog.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-xs text-zinc-400">
                        {formatDate(blog.published_at) ?? formatDate(blog.created_at)}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-brand-green">
                        Read more
                        <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
