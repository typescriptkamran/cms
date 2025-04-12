import { Order, OrderFilters, OrdersResponse } from "@/types/Order";
import { createClient } from "@/supabase/client";

// Fetch orders from Supabase with filtering, sorting, and pagination
export async function getOrdersFromDB(
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
    console.error("Error fetching orders from database:", error);
    return {
      data: null,
      count: null,
      error: error as Error,
    };
  }
}

// Create a new order in the database
export async function createOrderInDB(
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
    console.error("Error creating order in database:", error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// Update an existing order in the database
export async function updateOrderInDB(
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
    console.error(`Error updating order ${id} in database:`, error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// Delete an order from the database
export async function deleteOrderFromDB(
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
    console.error(`Error deleting order ${id} from database:`, error);
    return {
      success: false,
      error: error as Error,
    };
  }
}

// Get order statistics
export async function getOrderStats(): Promise<{
  total: number;
  processing: number;
  delivered: number;
  cancelled: number;
  error: Error | null;
}> {
  const supabase = createClient();

  try {
    // Get total count
    const { count: total, error: totalError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    if (totalError) throw totalError;

    // Get processing count
    const { count: processing, error: processingError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "processing");

    if (processingError) throw processingError;

    // Get delivered count
    const { count: delivered, error: deliveredError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "delivered");

    if (deliveredError) throw deliveredError;

    // Get cancelled count
    const { count: cancelled, error: cancelledError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "cancelled");

    if (cancelledError) throw cancelledError;

    return {
      total: total || 0,
      processing: processing || 0,
      delivered: delivered || 0,
      cancelled: cancelled || 0,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching order statistics:", error);
    return {
      total: 0,
      processing: 0,
      delivered: 0,
      cancelled: 0,
      error: error as Error,
    };
  }
}
