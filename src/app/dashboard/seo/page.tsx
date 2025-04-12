"use client";

import { getSEOsFromDB } from "@/lib/db/seo";
import { SEO } from "@/types";
import { revalidatePath } from "next/cache";
import { useState, useEffect } from "react";

// Import the server-side function to handle SEO creation
import { handleCreateSEO } from "@/lib/actions/seoActions";

export default function SEOPage() {
  const [seoList, setSeoList] = useState<SEO[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  // Fetch SEO data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await getSEOsFromDB();
        if (error) {
          throw error;
        }
        setSeoList(data || []);
      } catch (err) {
        setError(err as Error);
      }
    };
    fetchData();
  }, []);

  // Handle the form submission
  async function handleCreate(formData: FormData) {
    try {
      // Call the server-side action
      await handleCreateSEO(formData);
      revalidatePath("/dashboard/seo");
      setFormVisible(false);
    } catch (err) {
      setError(err as Error);
    }
  }

  // Display error message if there is an error fetching data
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">SEO Settings</h1>
        <p className="text-red-500">
          Error loading SEO settings: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SEO Settings</h1>
        <button
          onClick={() => setFormVisible(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add SEO
        </button>
      </div>

      {/* SEO Form */}
      {formVisible && (
        <div className="p-4 border rounded mb-4">
          <h2 className="font-semibold text-lg">Create New SEO</h2>
          <form action={handleCreate}>
            <div className="mb-4">
              <label htmlFor="page" className="block mb-2">Page</label>
              <input
                type="text"
                name="page"
                id="page"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="keywords" className="block mb-2">Keywords</label>
              <input
                type="text"
                name="keywords"
                id="keywords"
                className="w-full p-2 border rounded"
                placeholder="comma separated"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save SEO
            </button>
          </form>

          <button
            onClick={() => setFormVisible(false)}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Render the list of SEOs */}
      <div className="grid gap-4">
        {seoList?.map((seo: SEO) => (
          <div key={seo.id} className="border p-4 rounded">
            <h2 className="font-semibold">{seo.page}</h2>
            <p><strong>Title:</strong> {seo.title}</p>
            <p><strong>Description:</strong> {seo.description}</p>
            <p><strong>Keywords:</strong> {seo.keywords?.join(", ")}</p>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(seo.updated_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
