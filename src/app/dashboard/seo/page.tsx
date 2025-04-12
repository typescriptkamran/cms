import { mockSEOs } from "@/data/mockData";

export default function SEOPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SEO Metadata</h1>
      <div className="space-y-4">
        {mockSEOs.map((seo) => (
          <div key={seo.id} className="border p-4 rounded">
            <h2 className="font-semibold">{seo.page}</h2>
            <p><strong>Title:</strong> {seo.title}</p>
            <p><strong>Description:</strong> {seo.description}</p>
            <p><strong>Keywords:</strong> {seo.keywords.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
