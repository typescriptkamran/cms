import { createBrowserClient } from "@supabase/ssr";
import { Order, OrderFilters, OrdersResponse } from "@/types/Order";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

// This function will be used to fetch orders from Supabase
export async function fetchOrdersFromSupabase(
  filters: OrderFilters,
): Promise<OrdersResponse> {
  const supabase = createClient();

  try {
    // Start building the query
    let query = supabase.from("orders").select("*", { count: "exact" });

    // Apply filters
    if (filters.shop) {
      query = query.eq("shop", filters.shop);
    }

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.timeRange && filters.timeRange !== "all") {
      const now = new Date();
      let cutoffDate = new Date();

      switch (filters.timeRange) {
        case "7days":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "30days":
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case "90days":
          cutoffDate.setDate(now.getDate() - 90);
          break;
      }

      query = query.gte("order_date", cutoffDate.toISOString());
    }

    // Apply sorting
    if (filters.sortBy) {
      query = query.order(filters.sortBy, {
        ascending: filters.sortDirection === "asc",
      });
    } else {
      // Default sorting
      query = query.order("order_date", { ascending: false });
    }

    // Apply pagination
    const from = (filters.page - 1) * filters.pageSize;
    const to = from + filters.pageSize - 1;
    query = query.range(from, to);

    // Execute the query
    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as Order[],
      count: count || 0,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching orders from Supabase:", error);
    return {
      data: null,
      count: null,
      error: error as Error,
    };
  }
}

// This function will be used to create an order in Supabase
export async function createOrderInSupabase(
  order: Omit<Order, "id">,
): Promise<{ data: Order | null; error: Error | null }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("orders")
      .insert(order)
      .select()
      .single();

    if (error) throw error;

    return {
      data: data as Order,
      error: null,
    };
  } catch (error) {
    console.error("Error creating order in Supabase:", error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// This function will be used to update an order in Supabase
export async function updateOrderInSupabase(
  id: string,
  updates: Partial<Order>,
): Promise<{ data: Order | null; error: Error | null }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      data: data as Order,
      error: null,
    };
  } catch (error) {
    console.error(`Error updating order ${id} in Supabase:`, error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// This function will be used to delete an order in Supabase
export async function deleteOrderInSupabase(
  id: string,
): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) throw error;

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(`Error deleting order ${id} in Supabase:`, error);
    return {
      success: false,
      error: error as Error,
    };
  }
}
