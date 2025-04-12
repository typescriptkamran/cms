import { SEO } from "@/types";
import { supabase } from "@/supabase/client";

export async function getSEOsFromDB() {
  try {
    const { data, error } = await supabase
      .from("seo")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return { data: data as SEO[], error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createSEOInDB(seo: Omit<SEO, "id" | "updated_at">) {
  const { data, error } = await supabase
    .from("seo")
    .insert([{ ...seo, updated_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw error;
  return data as SEO;
}
