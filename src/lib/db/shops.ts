// lib/db/shops.ts
import { createClient } from "@supabase/supabase-js";
import { Shop } from "@/types"; // Import Shop type

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fetch all shops from the database
export async function getShopsFromDB() {
  try {
    const { data, error, count } = await supabase
      .from("shops")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching shops from database:", error);
    return { data: null, error };
  }
}

// Create a new shop
export async function createShopInDB(shop: Omit<Shop, "id" | "created_at">) {
  try {
    const { data, error } = await supabase
      .from("shops")
      .insert({ ...shop, created_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error creating shop in database:", error);
    return { data: null, error };
  }
}
