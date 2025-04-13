import { createFAQInDB } from "@/lib/db/faq";
import { createShopInDB } from "@/lib/db/shops";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.formData();

  const name = body.get("name");
  const country = body.get("country");
  const timezone = body.get("timezone");
  const url = new URL("/dashboard/shops", request.url);

  if (name && country && timezone) {
    const shop = {
        name: name.toString(),
        country: country.toString(),
        timezone: timezone.toString(),
    };

    const { data, error } = await createShopInDB(shop);

    // Optional: Log error or handle differently
    if (error) {
        url.searchParams.set("error", error.message);

      console.error("Error creating shop:", error);
    }
  }


  // Redirect in all cases (success or failure)
  return NextResponse.redirect(url);
}
