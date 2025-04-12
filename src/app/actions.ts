"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

// Modified to remove authentication requirements
export const signUpAction = async (formData: FormData) => {
  // This action is no longer needed but kept as a stub for compatibility
  return redirect("/dashboard");
};

export const signInAction = async (formData: FormData) => {
  // This action is no longer needed but kept as a stub for compatibility
  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  // This action is no longer needed but kept as a stub for compatibility
  return redirect("/dashboard");
};

export const resetPasswordAction = async (formData: FormData) => {
  // This action is no longer needed but kept as a stub for compatibility
  return redirect("/dashboard");
};

export const signOutAction = async () => {
  // This action is no longer needed but kept as a stub for compatibility
  return redirect("/dashboard");
};
