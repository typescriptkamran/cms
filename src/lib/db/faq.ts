import { FAQ, FAQsResponse } from "@/types/index";
import { createClient } from "@/supabase/client";

// Fetch all FAQs from the database
export async function getFAQsFromDB(): Promise<FAQsResponse> {
  const supabase = createClient();

  try {
    const { data, error, count } = await supabase
      .from("faqs")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return {
      data: data as FAQ[],
      count: count || 0,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching FAQs from database:", error);
    return {
      data: null,
      count: null,
      error: error as Error,
    };
  }
}

// Fetch a single FAQ by ID
export async function getFAQByIdFromDB(
  id: string,
): Promise<{ data: FAQ | null; error: Error | null }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      data: data as FAQ,
      error: null,
    };
  } catch (error) {
    console.error(`Error fetching FAQ ${id} from database:`, error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// Create a new FAQ in the database
export async function createFAQInDB(
  faq: Omit<FAQ, "id" | "updated_at">,
): Promise<{ data: FAQ | null; error: Error | null }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("faqs")
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

// Update an existing FAQ in the database
export async function updateFAQInDB(
  id: string,
  updates: Partial<Omit<FAQ, "id">>,
): Promise<{ data: FAQ | null; error: Error | null }> {
  const supabase = createClient();

  try {
    // Always update the updated_at timestamp
    const updatesWithTimestamp = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("faqs")
      .update(updatesWithTimestamp)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      data: data as FAQ,
      error: null,
    };
  } catch (error) {
    console.error(`Error updating FAQ ${id} in database:`, error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// Delete a FAQ from the database
export async function deleteFAQFromDB(
  id: string,
): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) throw error;

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(`Error deleting FAQ ${id} from database:`, error);
    return {
      success: false,
      error: error as Error,
    };
  }
}
