"use client"

import { useState } from "react";

export default function () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // Handle form submission

    return (
        <>
            <div className="text-right mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add New FAQ
                </button>
            </div>
            {/* Modal for Adding New FAQ */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
                        <form action={'/api/faq/add'} method="POST" className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Question</label>
                                <input
                                    type="text"
                                    name="question"
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
                                    name="answer"
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
        </>
    )
}