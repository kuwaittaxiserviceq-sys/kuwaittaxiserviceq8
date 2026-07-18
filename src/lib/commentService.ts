import { supabase } from "./supabase";

export interface BlogComment {
  id: string;
  blog_slug: string;
  name: string;
  email?: string;
  comment: string;
  status: "pending" | "approved" | "rejected";
  admin_reply?: string | null;
  created_at: string;
}

const TABLE = "blog_comments";

export const commentService = {
  async getAllComments(): Promise<BlogComment[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as BlogComment[]) ?? [];
  },

  async approveComment(id: string, reply?: string): Promise<void> {
    const updates: Record<string, unknown> = { status: "approved" };
    if (reply && reply.trim()) updates.admin_reply = reply.trim();
    const { error } = await supabase.from(TABLE).update(updates).eq("id", id);
    if (error) throw error;
  },

  async rejectComment(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).update({ status: "rejected" }).eq("id", id);
    if (error) throw error;
  },

  async addReply(id: string, reply: string): Promise<void> {
    const { error } = await supabase.from(TABLE).update({ admin_reply: reply }).eq("id", id);
    if (error) throw error;
  },
};
