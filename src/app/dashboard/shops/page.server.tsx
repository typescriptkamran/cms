import { getShopsFromDB } from "@/lib/db/shops";
import { Shop } from "@/types";

export default async function ShopsPage() {
  const { data: shops, error } = await getShopsFromDB();

  if (error) {
    const errorMessage = (error as Error).message;  // Type the error properly here

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Shops</h1>
        <p className="text-red-500">Error loading shops: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shops</h1>
      <div className="space-y-4">
        {shops?.map((shop: Shop) => (
          <div key={shop.id} className="border p-4 rounded">
            <h2 className="font-semibold">{shop.name}</h2>
            <p>Country: {shop.country}</p>
            <p>Timezone: {shop.timezone}</p>
            <p>Created at: {new Date(shop.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
