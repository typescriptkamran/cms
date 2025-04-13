import { createFAQInDB } from "@/lib/db/faq";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.formData();

  const question = body.get("question");
  const answer = body.get("answer");
  const url = new URL("/dashboard/faq", request.url);

  if (question && answer) {
    const faq = {
      question: question.toString(),
      answer: answer.toString(),
    };

    const { data, error } = await createFAQInDB(faq);

    // Optional: Log error or handle differently
    if (error) {
        url.searchParams.set("error", error.message);

      console.error("Error creating FAQ:", error);
    }
  }


  // Redirect in all cases (success or failure)
  return NextResponse.redirect(url);
}
