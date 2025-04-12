import { Order, OrderFilters, OrdersResponse } from "@/types/Order";
import { supabase } from "@/supabase/client";

export async function getOrdersFromDB(
  filters: OrderFilters
): Promise<OrdersResponse> {
  try {
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
      const cutoffDate = new Date(now);

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

    // Sorting
    if (filters.sortBy) {
      query = query.order(filters.sortBy, {
        ascending: filters.sortDirection === "asc",
      });
    } else {
      query = query.order("order_date", { ascending: false });
    }

    // Pagination
    const from = (filters.page - 1) * filters.pageSize;
    const to = from + filters.pageSize - 1;
    query = query.range(from, to);

    // Execute query
    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as Order[],
      count: count ?? 0,
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

export async function createOrderInDB(
  order: Omit<Order, "id" | "order_date" | "delivery_date">
): Promise<{ data: Order | null; error: Error | null }> {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        ...order,
        order_date: now,
        delivery_date: now,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: data as Order, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
