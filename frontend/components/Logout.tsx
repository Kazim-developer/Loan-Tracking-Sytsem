"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import handleLogout from "@/utils/logoutMethod";

import { useAuthStore } from "@/stores/auth.store";
import { useSubscriptionStore } from "@/stores/subscription.store";

export default function Logout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const resetAuthStore = useAuthStore((s) => s.resetAuthStore);
  const resetSubscriptionStore = useSubscriptionStore(
    (s) => s.resetSubscriptionStore,
  );

  const { mutate: logout, isPending } = useMutation({
    mutationFn: handleLogout,

    onSuccess: async () => {
      resetAuthStore();
      resetSubscriptionStore();

      queryClient.clear();

      router.replace("/");
      router.refresh();
    },
  });

  return (
    <button
      disabled={isPending}
      className="cursor-pointer px-4 py-1 bg-red-100 text-red-600 font-[500] rounded-[10px]"
      onClick={() => logout()}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
