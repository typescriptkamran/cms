// Import your server-side fetching function
import { getFAQFromDB } from "@/lib/db/faq";
import FAQPage from "./page";

export default async function FAQPageServer() {
  const { data: faq, error } = await getFAQFromDB();

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">FAQ</h1>
        <p className="text-red-500">Error loading FAQ: {error}</p>
      </div>
    );
  }

  // Pass FAQ as props to the client-side component
  return <FAQPage faq={faq || []} />;
}