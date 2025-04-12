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
  delivery_date: string | null;
  status: OrderStatus;
}

export interface OrdersResponse {
  data: Order[] | null;
  count: number | null;
  error: Error | null;
}

export interface OrderFilters {
  timeRange?: string;
  shop?: string;
  country?: string;
  status?: OrderStatus;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
