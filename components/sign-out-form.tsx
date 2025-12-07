
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export const SignOutForm = () => {
  const router = useRouter();

  return (
    <button
      className="w-full px-1 py-0.5 text-left text-red-500"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        });
      }}
      type="button"
    >
      Sign out
    </button>
  );
};
