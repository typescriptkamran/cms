// app/dashboard/shops/page.tsx
"use client";
import { useState } from "react";
import { Shop } from "@/types"; // Import Shop type
import { createShopInDB } from "@/lib/db/shops"; // Import function to create new Shop

// This is the Client-Side component that will handle the state and UI rendering
export default function ShopsPage({ shops }: { shops: Shop[] }) {
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shopName, setShopName] = useState("");
  const [shopCountry, setShopCountry] = useState("");
  const [shopTimezone, setShopTimezone] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopName || !shopCountry || !shopTimezone) {
      setErrorMessage("All fields are required.");
      return;
    }

    const shop = {
      name: shopName,
      country: shopCountry,
      timezone: shopTimezone,
    };

    const { data, error } = await createShopInDB(shop);

    if (error) {
      setErrorMessage("There was an error creating the shop.");
      return;
    }

    // Reset form and close modal
    setShopName("");
    setShopCountry("");
    setShopTimezone("");
    setIsModalOpen(false);
    setErrorMessage(null);
    setSuccessMessage("Shop added successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shops</h1>

      {/* Display success or error messages */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      {/* Button to trigger modal */}
      <div className="text-right mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New Shop
        </button>
      </div>

      {/* Shop List */}
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

      {/* Modal for Adding New Shop */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Shop</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Shop Name</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter the shop name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Country</label>
                <input
                  type="text"
                  value={shopCountry}
                  onChange={(e) => setShopCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter the shop country"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Timezone</label>
                <input
                  type="text"
                  value={shopTimezone}
                  onChange={(e) => setShopTimezone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter the shop timezone"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save Shop
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
