"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Filters } from "@/components/filters";
import { OrdersTable } from "@/components/orders-table";
import { OrderFilters } from "@/types/Order";
import { getOrders } from "@/services/orders";
import DashboardNavbar from "@/components/dashboard-navbar";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    pageSize: 10,
    timeRange: "7days",
    sortBy: "order_date",
    sortDirection: "desc",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await getOrders(filters);
        if (response.data) {
          setOrders(response.data);
          setTotalCount(response.count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<OrderFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Orders</h1>
            </div>

            <div className="bg-card rounded-lg border p-4 shadow-sm">
              <Filters onFilterChange={handleFilterChange} className="mb-4" />

              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <OrdersTable
                  orders={orders}
                  totalCount={totalCount}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
