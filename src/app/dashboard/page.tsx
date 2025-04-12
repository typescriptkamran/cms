"use client";

import { useState } from "react";
import { Filters } from "@/components/filters";
import { OrdersTable } from "@/components/orders-table";
import { OrderFilters } from "@/types/Order";
import {
  mockOrders,
  mockShops,
  mockFAQs,
  mockSEOs,
} from "@/data/mockData";

export default function Dashboard() {
  const [orders] = useState(mockOrders);
  const [shops] = useState(mockShops);
  const [faqs] = useState(mockFAQs);
  const [seos] = useState(mockSEOs);
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    pageSize: 10,
    timeRange: "7days",
    sortBy: "order_date",
    sortDirection: "desc",
  });

  const handleFilterChange = (newFilters: Partial<OrderFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <>
      {/* Orders Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Orders</h2>
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <Filters onFilterChange={handleFilterChange} className="mb-4" />
          <OrdersTable
            orders={orders}
            totalCount={orders.length}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      {/* Shops Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Shops</h2>
        <div className="bg-card rounded-lg border p-4 shadow-sm overflow-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Country</th>
                <th className="px-4 py-2 border">Timezone</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop.id}>
                  <td className="px-4 py-2 border">{shop.name}</td>
                  <td className="px-4 py-2 border">{shop.country}</td>
                  <td className="px-4 py-2 border">{shop.timezone}</td>
                  <td className="px-4 py-2 border">
                    {new Date(shop.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">FAQs</h2>
        <div className="bg-card rounded-lg border p-4 shadow-sm space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
              <p className="text-xs text-gray-400">
                Updated: {new Date(faq.updated_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">SEO Data</h2>
        <div className="bg-card rounded-lg border p-4 shadow-sm overflow-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 border">Page</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Keywords</th>
              </tr>
            </thead>
            <tbody>
              {seos.map((seo) => (
                <tr key={seo.id}>
                  <td className="px-4 py-2 border">{seo.page}</td>
                  <td className="px-4 py-2 border">{seo.title}</td>
                  <td className="px-4 py-2 border">{seo.description}</td>
                  <td className="px-4 py-2 border">
                    {seo.keywords.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
