import { supabase } from "./supabase";

export interface Review {
  id: string;
  name: string;
  email?: string;
  location?: string;
  rating: number;
  title?: string;
  review: string;
  service?: string;
  route?: string;
  travel_date?: string;
  status: "pending" | "approved" | "rejected";
  admin_response?: string | null;
  created_at: string;
}

export interface Question {
  id: string;
  name: string;
  email?: string;
  location?: string;
  category: string;
  service?: string;
  question: string;
  answer?: string | null;
  answered_by?: string | null;
  answered_at?: string | null;
  status: "pending" | "answered" | "rejected";
  created_at: string;
}

const REVIEWS_TABLE = "reviews";
const QUESTIONS_TABLE = "customer_questions";

export const reviewService = {
  async getAllReviews(): Promise<Review[]> {
    const { data, error } = await supabase
      .from(REVIEWS_TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Review[]) ?? [];
  },

  async approveReview(id: string, response?: string): Promise<void> {
    const updates: Record<string, unknown> = { status: "approved" };
    if (response && response.trim()) updates.admin_response = response.trim();
    const { error } = await supabase.from(REVIEWS_TABLE).update(updates).eq("id", id);
    if (error) throw error;
  },

  async rejectReview(id: string): Promise<void> {
    const { error } = await supabase
      .from(REVIEWS_TABLE)
      .update({ status: "rejected" })
      .eq("id", id);
    if (error) throw error;
  },

  async addResponse(id: string, response: string): Promise<void> {
    const { error } = await supabase
      .from(REVIEWS_TABLE)
      .update({ admin_response: response })
      .eq("id", id);
    if (error) throw error;
  },
};

export const questionService = {
  async getAllQuestions(): Promise<Question[]> {
    const { data, error } = await supabase
      .from(QUESTIONS_TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Question[]) ?? [];
  },

  async answerQuestion(id: string, answer: string, answeredBy?: string): Promise<void> {
    const { error } = await supabase
      .from(QUESTIONS_TABLE)
      .update({
        answer,
        status: "answered",
        answered_by: answeredBy || "Kuwait Taxi Service",
        answered_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) throw error;
  },

  async rejectQuestion(id: string): Promise<void> {
    const { error } = await supabase
      .from(QUESTIONS_TABLE)
      .update({ status: "rejected" })
      .eq("id", id);
    if (error) throw error;
  },
};
