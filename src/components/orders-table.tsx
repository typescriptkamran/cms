"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Order, OrderFilters } from "@/types/Order";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
  totalCount: number;
  filters: OrderFilters;
  onFilterChange: (filters: Partial<OrderFilters>) => void;
  className?: string;
}

export function OrdersTable({
  orders,
  totalCount,
  filters,
  onFilterChange,
  className,
}: OrdersTableProps) {
  const handleSort = (column: string) => {
    const direction =
      filters.sortBy === column && filters.sortDirection === "asc"
        ? "desc"
        : "asc";
    onFilterChange({ sortBy: column, sortDirection: direction });
  };

  const handlePageChange = (page: number) => {
    onFilterChange({ page });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const totalPages = Math.ceil(totalCount / filters.pageSize);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("id")}
                  className="flex items-center gap-1 font-medium"
                >
                  Order #
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("customer")}
                  className="flex items-center gap-1 font-medium"
                >
                  Customer
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-1 font-medium"
                >
                  Price
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>Method</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("shop")}
                  className="flex items-center gap-1 font-medium"
                >
                  Shop
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>Device</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("order_date")}
                  className="flex items-center gap-1 font-medium"
                >
                  Order Date
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("delivery_date")}
                  className="flex items-center gap-1 font-medium"
                >
                  Delivery Date
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 font-medium"
                >
                  Status
                  <ArrowUpDown size={14} />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={12}
                  className="h-24 text-center text-muted-foreground"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    #{order.id.substring(0, 8)}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.delivery}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.currency}</TableCell>
                  <TableCell>
                    {formatCurrency(order.price, order.currency)}
                  </TableCell>
                  <TableCell>{order.method}</TableCell>
                  <TableCell>{order.shop}</TableCell>
                  <TableCell>{order.device}</TableCell>
                  <TableCell>{formatDate(order.order_date)}</TableCell>
                  <TableCell>{formatDate(order.delivery_date)}</TableCell>
                  <TableCell>
                    <Tag status={order.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {orders.length > 0
            ? filters.page * filters.pageSize - filters.pageSize + 1
            : 0}{" "}
          to {Math.min(filters.page * filters.pageSize, totalCount)} of{" "}
          {totalCount} orders
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
