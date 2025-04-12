// src/lib/db/faq.ts
import { createClient } from "@supabase/supabase-js";
import { FAQ, FAQsResponse } from "@/types"; // Import your types (make sure FAQ and FAQsResponse are defined in your types)

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Use your Supabase URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use your Supabase Anon key
);

// Fetch all FAQs from the database
export async function getFAQsFromDB(): Promise<FAQsResponse> {
  try {
    const { data, error, count } = await supabase
      .from("faq") // Assuming the table is called "faqs"
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false }); // Order FAQs by the updated_at field, most recent first

    if (error) throw error; // If there's an error, throw it

    // Return data, count of records, and error (if any)
    return {
      data: data as FAQ[],  // Cast the data to the FAQ type
      count: count || 0, // If count is null, return 0
      error: null, // No error here
    };
  } catch (error) {
    console.error("Error fetching FAQs from the database:", error);
    return {
      data: null, // If there was an error, return null for data
      count: null, // No count available in case of an error
      error: error as Error, // Return the error
    };
  }
}


// src/lib/db/faq.ts
export async function createFAQInDB(
  faq: Omit<FAQ, "id" | "updated_at">
): Promise<{ data: FAQ | null; error: Error | null }> {
  try {
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
    console.error("Error creating FAQ in database:", error);
    return {
      data: null,
      error: error as Error,
    };
  }
}
