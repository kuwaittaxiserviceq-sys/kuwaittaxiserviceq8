import { supabase } from "./supabase";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  author: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  featured_image?: string;
  views: number;
  published_at?: string | null;
  created_at: string;
  updated_at?: string;
}

const TABLE = "blogs";
const IMAGE_BUCKET = "blog-images";

export const blogService = {
  async getAllBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Blog[]) ?? [];
  },

  async getBlogById(id: string): Promise<Blog> {
    const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
    if (error) throw error;
    return data as Blog;
  },

  async getBlogBySlugAnyStatus(slug: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return (data as Blog) ?? null;
  },

  async createBlog(blog: Partial<Blog>): Promise<Blog> {
    const record = {
      ...blog,
      published_at:
        blog.status === "published" ? blog.published_at || new Date().toISOString() : blog.published_at || null,
    };
    const { data, error } = await supabase.from(TABLE).insert(record).select().single();
    if (error) throw error;
    return data as Blog;
  },

  async updateBlog(id: string, updates: Partial<Blog>): Promise<Blog> {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Blog;
  },

  async deleteBlog(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw error;
  },

  async publishBlog(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  },

  async unpublishBlog(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).update({ status: "draft" }).eq("id", id);
    if (error) throw error;
  },

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  },

  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  },
};
