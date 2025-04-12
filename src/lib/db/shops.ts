import { Shop, ShopsResponse } from "@/types/index";
import { createClient } from "@/supabase/client";

// Fetch all shops from the database
export async function getShopsFromDB(): Promise<ShopsResponse> {
  const supabase = createClient();

  try {
    const { data, error, count } = await supabase
      .from("shops")
      .select("*", { count: "exact" })
      .order("name");

    if (error) throw error;

    return {
      data: data as Shop[],
      count: count || 0,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching shops from database:", error);
    return {
      data: null,
      count: null,
      error: error as Error,
    };
  }
}

// Fetch a single shop by ID
export async function getShopByIdFromDB(
  id: string,
): Promise<{ data: Shop | null; error: Error | null }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("shops")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      data: data as Shop,
      error: null,
    };
  } catch (error) {
    console.error(`Error fetching shop ${id} from database:`, error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// Create a new shop in the database
export async function createShopInDB(
  shop: Omit<Shop, "id" | "created_at">,
): Promise<{ data: Shop | null; error: Error | null }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("shops")
      .insert({ ...shop, created_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;

    return {
      data: data as Shop,
      error: null,
    };
  } catch (error) {
    console.error("Error creating shop in database:", error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// Update an existing shop in the database
export async function updateShopInDB(
  id: string,
  updates: Partial<Omit<Shop, "id" | "created_at">>,
): Promise<{ data: Shop | null; error: Error | null }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("shops")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      data: data as Shop,
      error: null,
    };
  } catch (error) {
    console.error(`Error updating shop ${id} in database:`, error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// Delete a shop from the database
export async function deleteShopFromDB(
  id: string,
): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("shops").delete().eq("id", id);

    if (error) throw error;

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(`Error deleting shop ${id} from database:`, error);
    return {
      success: false,
      error: error as Error,
    };
  }
}
