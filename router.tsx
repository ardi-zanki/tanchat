import { createRouter } from "@tanstack/react-router";
import type { VisibilityType } from "@/components/visibility-selector";
import type { Attachment } from "@/lib/types";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface HistoryState {
    newChatMessage?: {
      input: string;
      attachments: Attachment[];
      modelId: string;
      visibilityType: VisibilityType;
    };
  }
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  });

  return router;
}
