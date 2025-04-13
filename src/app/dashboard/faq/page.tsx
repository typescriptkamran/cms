// Import your server-side fetching function
import FaqModel from "@/components/faq-model";
import { getFAQFromDB } from "@/lib/db/faq";
import { FAQ } from "@/types";


export default async function Page({ searchParams }: {searchParams: {error: string | undefined| null}}) {
  const { data: faq, error } = await getFAQFromDB();

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">FAQ</h1>
        {(error || searchParams.error) && <p className="text-red-500">Error loading FAQ: {error || searchParams.error}</p> }
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
      <FaqModel/>
      </div>
    );
  
}
// Import required client-side dependencies
