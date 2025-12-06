"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "./auth";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginActionState = {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
};

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    try {
      await auth.api.signInEmail({
        body: {
          email: validatedData.email,
          password: validatedData.password,
        },
        headers: await headers(),
      });
    } catch (error) {
      if (error instanceof APIError) {
        return { status: "failed" };
      }

      return { status: "failed" };
    }

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export type RegisterActionState = {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
};

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    try {
      await auth.api.signUpEmail({
        body: {
          email: validatedData.email,
          password: validatedData.password,
          name: validatedData.email.split("@")[0],
        },
        headers: await headers(),
      });
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === 409) {
          return { status: "user_exists" };
        }

        return { status: "failed" };
      }

      return { status: "failed" };
    }

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
