import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MoveRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { blogService, type Blog } from "@/lib/blogService";
import { breadcrumbSchema, JsonLd, SITE_URL } from "@/lib/schema";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

async function getPublishedBySlug(slug: string): Promise<Blog | null> {
  try {
    const blog = await blogService.getBlogBySlugAnyStatus(slug);
    if (!blog || blog.status !== "published") return null;
    return blog;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await blogService.getAllBlogs();
    return blogs.filter((b) => b.status === "published").map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBySlug(slug);
  if (!blog) return {};

  return {
    alternates: { canonical: `/blog/${slug}` },
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
    openGraph: {
      type: "article",
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt,
      ...(blog.featured_image && { images: [blog.featured_image] }),
    },
  };
}

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getPublishedBySlug(slug);
  if (!blog) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.published_at || blog.created_at,
    dateModified: blog.updated_at || blog.published_at || blog.created_at,
    author: { "@type": "Organization", name: blog.author || "Kuwait Taxi Service" },
    publisher: { "@id": `${SITE_URL}/#business` },
    ...(blog.featured_image && { image: blog.featured_image }),
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: blog.title, path: `/blog/${slug}` },
  ]);

  const publishedLabel = formatDate(blog.published_at) ?? formatDate(blog.created_at);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <article className="bg-white py-16 sm:py-20">
          <Container className="mx-auto flex max-w-3xl flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="w-fit rounded-full bg-brand-green-light px-3 py-1 text-xs font-semibold text-brand-green">
                {blog.category}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {blog.title}
              </h1>
              {publishedLabel && (
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <CalendarDays className="h-4 w-4" />
                  {publishedLabel}
                </div>
              )}
            </div>

            {blog.featured_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="h-auto w-full rounded-2xl object-cover"
              />
            )}

            <div
              className="flex flex-col gap-4 text-zinc-700 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-zinc-900 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-900 [&_li]:mb-1.5 [&_p]:leading-7 [&_strong]:text-zinc-900 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-brand-green-light/60 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-zinc-700">
                Ready to book your ride? Get a fixed fare in minutes.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/reservation"
                  className="flex h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  Book a Ride
                  <MoveRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
