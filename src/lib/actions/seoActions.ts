// src/lib/actions/seoActions.ts
"use server";

import { createSEOInDB } from "@/lib/db/seo";  // Adjust the import path if necessary

export async function handleCreateSEO(formData: FormData) {
  const newSEO = {
    page: formData.get("page") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    keywords: (formData.get("keywords") as string).split(",").map(k => k.trim()),
  };

  await createSEOInDB(newSEO);
}
