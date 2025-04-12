// Import your server-side fetching function
import { getFAQsFromDB } from "@/lib/db/faq";
import FAQsPage from "./page";

export default async function FAQsPageServer() {
  const { data: faqs, error } = await getFAQsFromDB();

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">FAQs</h1>
        <p className="text-red-500">Error loading FAQs: {error.message}</p>
      </div>
    );
  }

  // Pass FAQs as props to the client-side component
  return <FAQsPage faqs={faqs || []} />;
}
