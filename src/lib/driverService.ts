import { supabase } from "./supabase";

export interface Driver {
  id: string;
  full_name: string;
  email?: string;
  phone_number: string;
  city?: string;
  vehicle_model?: string;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string | null;
  created_at: string;
}

const TABLE = "driver_applications";

export const driverService = {
  async getAllDrivers(): Promise<Driver[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Driver[]) ?? [];
  },

  async approveDriver(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).update({ status: "approved" }).eq("id", id);
    if (error) throw error;
  },

  async rejectDriver(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).update({ status: "rejected" }).eq("id", id);
    if (error) throw error;
  },

  async revertToPending(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).update({ status: "pending" }).eq("id", id);
    if (error) throw error;
  },

  async saveNotes(id: string, notes: string): Promise<void> {
    const { error } = await supabase.from(TABLE).update({ admin_notes: notes }).eq("id", id);
    if (error) throw error;
  },
};
