import { Order, OrderFilters, OrdersResponse } from "@/types/Order";
import mockOrders from "@/data/mockOrders.json";

// This function will be replaced with actual Supabase queries later
export async function getOrders(
  filters: OrderFilters,
): Promise<OrdersResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Clone the mock data to avoid modifying the original
    let filteredOrders = [...(mockOrders as Order[])];

    // Apply filters
    if (filters.shop) {
      filteredOrders = filteredOrders.filter(
        (order) => order.shop === filters.shop,
      );
    }

    if (filters.status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === filters.status,
      );
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

      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.order_date) >= cutoffDate,
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredOrders.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof Order];
        const bValue = b[filters.sortBy as keyof Order];

        if (aValue === null) return 1;
        if (bValue === null) return -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return filters.sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return filters.sortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }

    // Get total count before pagination
    const totalCount = filteredOrders.length;

    // Apply pagination
    const startIndex = (filters.page - 1) * filters.pageSize;
    const endIndex = startIndex + filters.pageSize;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      data: paginatedOrders,
      count: totalCount,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      data: null,
      count: null,
      error: error as Error,
    };
  }
}

// This will be implemented later with Supabase
export async function createOrder(
  order: Omit<Order, "id">,
): Promise<{ data: Order | null; error: Error | null }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Create a new order with a random ID
    const newOrder: Order = {
      id: crypto.randomUUID(),
      ...order,
    };

    return {
      data: newOrder,
      error: null,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// This will be implemented later with Supabase
export async function updateOrder(
  id: string,
  updates: Partial<Order>,
): Promise<{ data: Order | null; error: Error | null }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Find the order in the mock data
    const orderIndex = (mockOrders as Order[]).findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }

    // Update the order
    const updatedOrder: Order = {
      ...(mockOrders as Order[])[orderIndex],
      ...updates,
    };

    return {
      data: updatedOrder,
      error: null,
    };
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

// This will be implemented later with Supabase
export async function deleteOrder(
  id: string,
): Promise<{ success: boolean; error: Error | null }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Find the order in the mock data
    const orderIndex = (mockOrders as Order[]).findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    return {
      success: false,
      error: error as Error,
    };
  }
}
