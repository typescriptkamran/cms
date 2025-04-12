// src/lib/db/faq.ts
import { createClient } from "@supabase/supabase-js";
import { FAQ, FAQResponse } from "@/types"; // Import your types (make sure FAQ and FAQResponse are defined in your types)

interface DBErrorResponse {
  data: FAQ[] | null;
  count: number | null;
  error: string | null; // Return error as a string message
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or Anon key is missing in environment variables.");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Fetch all FAQ from the database
export async function getFAQFromDB(): Promise<DBErrorResponse> {
  try {
    const { data, error, count } = await supabase
      .from("faq")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return {
      data: data as FAQ[],
      count: count ?? 0,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return {
      data: null,
      count: null,
      error: error instanceof Error ? error.message : "Unknown error", // Return error message
    };
  }
}

// Create FAQ in the database
export async function createFAQInDB(
  faq: Omit<FAQ, "id" | "updated_at">
): Promise<{ data: FAQ | null; error: Error | null }> {
  try {
    if (!faq.question?.trim() || !faq.answer?.trim()) {
      throw new Error("FAQ question and answer cannot be empty or just whitespace.");
    }

    const { data, error } = await supabase
      .from("faq")
      .insert({ ...faq, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;

    return {
      data: data as FAQ,
      error: null,
    };
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
}
