"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import { getOrdersFromDB, createOrderInDB } from "@/lib/db/orders";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [open, setOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({
    customer: "",
    delivery: "",
    product: "",
    currency: "",
    price: 0,
    method: "",
    shop: "",
    device: "",
    status: "",
  });

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await getOrdersFromDB({ page: 1, pageSize: 100 });
      if (error) setError(error);
      else setOrders(data || []);
    }
    fetchOrders();
  }, []);

  async function handleCreateOrder() {
    const { data, error } = await createOrderInDB(form);
    if (data) {
      setOrders([data, ...orders]);
      setOpen(false);
      setForm({
        customer: "",
        delivery: "",
        product: "",
        currency: "",
        price: 0,
        method: "",
        shop: "",
        device: "",
        status: "",
      });
    } else {
      setError(error);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New Order</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-4">
              {Object.entries(form).map(([key, value]) => (
                <div key={key}>
                  <Label className="capitalize">{key}</Label>
                  <Input
                    value={value}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    type={key === "price" ? "number" : "text"}
                  />
                </div>
              ))}
              <Button onClick={handleCreateOrder}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-red-500">Error loading orders: {error.message}</p>}

      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded">
            <h2 className="font-semibold">{order.customer} - {order.product}</h2>
            <p>Status: {order.status}</p>
            <p className="text-sm text-gray-500">
              Ordered: {new Date(order.order_date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
