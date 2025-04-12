// Common types for the CMS dashboard

// Order types
export type OrderStatus =
  | "paid"
  | "processing"
  | "failed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
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
  delivery_date: string;
  status: OrderStatus;
}

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

export interface FAQsResponse {
  data: FAQ[] | null;
  count: number | null;
  error: Error | null;
}

// SEO types
export interface SEO {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface SEOsResponse {
  data: SEO[] | null;
  count: number | null;
  error: Error | null;
}
