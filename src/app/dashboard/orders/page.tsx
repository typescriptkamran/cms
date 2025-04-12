import { mockOrders } from "@/data/mockData";

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left border px-2 py-1">Customer</th>
            <th className="text-left border px-2 py-1">Product</th>
            <th className="text-left border px-2 py-1">Price</th>
            <th className="text-left border px-2 py-1">Status</th>
            <th className="text-left border px-2 py-1">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map((order) => (
            <tr key={order.id}>
              <td className="border px-2 py-1">{order.customer}</td>
              <td className="border px-2 py-1">{order.product}</td>
              <td className="border px-2 py-1">
                {order.currency} {order.price}
              </td>
              <td className="border px-2 py-1 capitalize">{order.status}</td>
              <td className="border px-2 py-1">{new Date(order.order_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
