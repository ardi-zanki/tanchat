import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo } from "react";
import type { ChatMessage } from "@/lib/types";
import { Suggestion } from "./elements/suggestion";
import type { CustomSubmitData } from "./multimodal-input";
import type { VisibilityType } from "./visibility-selector";

type SuggestedActionsProps = {
  sendMessage?: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
  onCustomSubmit?: (data: CustomSubmitData) => void;
};

function PureSuggestedActions({
  sendMessage,
  onCustomSubmit,
}: SuggestedActionsProps) {
  const suggestedActions = [
    "What are the advantages of using TanStack Start?",
    "Write code to demonstrate Dijkstra's algorithm",
    "Help me write an essay about Silicon Valley",
    "What is the weather in San Francisco?",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    if (onCustomSubmit) {
      onCustomSubmit({ input: suggestion, attachments: [] });
    } else if (sendMessage) {
      sendMessage({
        role: "user",
        parts: [{ type: "text", text: suggestion }],
      });
    }
  };

  return (
    <div
      className="grid w-full gap-2 sm:grid-cols-2"
      data-testid="suggested-actions"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          key={suggestedAction}
          transition={{ delay: 0.05 * index }}
        >
          <Suggestion
            className="h-auto w-full whitespace-normal p-3 text-left"
            onClick={handleSuggestionClick}
            suggestion={suggestedAction}
          >
            {suggestedAction}
          </Suggestion>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }
    if (prevProps.onCustomSubmit !== nextProps.onCustomSubmit) {
      return false;
    }

    return true;
  }
);
