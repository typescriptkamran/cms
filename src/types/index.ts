// Common types for the CMS dashboard

// Order types

// src/types/index.ts

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"| "paid"| "failed";

export type Order = {
  id: string;
  customer: string;
  delivery: string;
  product: string;
  currency: string;
  price: number;
  method: string;
  shop: string;
  device: string;
  order_date: string;
  delivery_date: string; // not nullable
  status: OrderStatus;
};

const orderStatuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "paid", "failed"];




export interface OrderFilters {
  page: number;
  pageSize: number;
  timeRange?: string;
  shop?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface OrdersResponse {
  data: Order[] | null;
  count: number | null;
  error: Error | null;
}

// Shop types
export interface Shop {
  id: string;          // UUID for the shop
  name: string;        // Shop name
  country: string;     // Shop country
  timezone: string;    // Shop timezone
  created_at: string;  // Timestamp of when the shop was created
}

export interface ShopsResponse {
  data: Shop[] | null;
  count: number | null;
  error: Error | null;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  updated_at: string;
}




// Define the response type for fetching FAQ
export interface FAQResponse {
  data: FAQ[] | null; // List of FAQ or null in case of an error
  count: number | null; // The count of FAQ in the database or null if an error occurs
  error: string | null; // The error message, or null if no error
}



// SEO types
export interface SEO {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  updated_at: string;
}

export interface SEOsResponse {
  data: SEO[] | null;
  count: number | null;
  error: Error | null;
}



// src/types/index.ts
export * from "./Order";

