import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { getSuggestionsByDocumentId } from "@/lib/db/queries";

export const getSuggestions = createServerFn({ method: "GET" })
  .inputValidator(z.object({ documentId: z.string() }))
  .handler(async ({ data }) => {
    const suggestions = await getSuggestionsByDocumentId({
      documentId: data.documentId,
    });
    return suggestions ?? [];
  });
