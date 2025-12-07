import { LoaderIcon } from "@/components/icons";

import { Button } from "./ui/button";

export const SubmitButton = ({
  children,
  isSubmitting,
  canSubmit,
  isSuccessful = false,
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
  canSubmit: boolean;
  isSuccessful?: boolean;
}) => {
  return (
    <Button
      aria-disabled={!canSubmit || isSubmitting || isSuccessful}
      className="relative"
      disabled={!canSubmit || isSubmitting || isSuccessful}
      type="submit"
    >
      {children}

      {(isSubmitting || isSuccessful) && (
        <span className="absolute right-4 animate-spin">
          <LoaderIcon />
        </span>
      )}

      <output aria-live="polite" className="sr-only">
        {isSubmitting || isSuccessful ? "Loading" : "Submit form"}
      </output>
    </Button>
  );
};
