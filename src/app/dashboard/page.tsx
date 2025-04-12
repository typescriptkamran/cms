"use client";
import { Order, OrderFilters } from "@/types/Order"; // directly
import { FAQ } from "@/types";



import { useEffect, useState } from "react";
import { Filters } from "@/components/filters";
import { OrdersTable } from "@/components/orders-table";
import { Shop, FAQ, SEO } from "@/types";
import { supabase } from "@/supabase/client";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [faq, setFAQ] = useState<FAQ[]>([]);
  const [seos, setSEOs] = useState<SEO[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: ordersData }, { data: shopsData }, { data: faqData }, { data: seoData }] = await Promise.all([
        supabase.from("orders").select("*"),
        supabase.from("shops").select("*"),
        supabase.from("faq").select("*"),
        supabase.from("seos").select("*"),
      ]);

      if (ordersData) setOrders(ordersData);
      if (shopsData) setShops(shopsData);
      if (faqData) setFAQ(faqData);
      if (seoData) setSEOs(seoData);
    };

    fetchData();
  }, []);

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

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold mb-4">FAQ</h2>
        <div className="bg-card rounded-lg border p-4 shadow-sm space-y-4">
          {faq.map((faq) => (
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
                    {seo.keywords?.join(", ")}
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
