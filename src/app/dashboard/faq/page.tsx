// Import required client-side dependencies
"use client";
import { useState } from "react";
import { FAQ } from "@/types"; // Import the FAQ type
import { createFAQInDB } from "@/lib/db/faq"; // Import function to create new FAQ

// This is the Client-Side component that will handle the state and UI rendering
export default function FAQPage({ faq }: { faq: FAQ[] }) {
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question || !answer) {
      setErrorMessage("Both question and answer are required.");
      return;
    }

    const faq = {
      question,
      answer,
    };

    const { data, error } = await createFAQInDB(faq);

    if (error) {
      setErrorMessage("There was an error creating the FAQ.");
      return;
    }

    // Reset form and close modal
    setQuestion("");
    setAnswer("");
    setIsModalOpen(false);
    setErrorMessage(null);
    setSuccessMessage("FAQ added successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">FAQ</h1>

      {/* Display success or error messages */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      {/* Button to trigger modal */}
      <div className="text-right mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faq?.map((faq: FAQ) => (
          <div key={faq.id} className="border p-4 rounded">
            <h2 className="font-semibold">{faq.question}</h2>
            <p>{faq.answer}</p>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(faq.updated_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Adding New FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter the FAQ question"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Answer</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter the FAQ answer"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save FAQ
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

