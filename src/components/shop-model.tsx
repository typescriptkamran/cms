"use client"
import { useState } from "react";

export default function() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shopName, setShopName] = useState("");
    const [shopCountry, setShopCountry] = useState("");
    const [shopTimezone, setShopTimezone] = useState("");
   return (<> 
    <div className="text-right mb-4">
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Add New Shop
    </button>
  </div>



  {/* Modal for Adding New Shop */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Shop</h2>
        <form action={'/api/shop/add'}  method="POST" className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Shop Name</label>
            <input
              type="text"
              name="name"
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
              name="country"
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
              name="timezone"
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
  </>
    )
}