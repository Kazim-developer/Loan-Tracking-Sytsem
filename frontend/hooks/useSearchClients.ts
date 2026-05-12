import { useQuery } from "@tanstack/react-query";

export function useSearchClients(search: string) {
  return useQuery({
    queryKey: ["clients", search],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clients?search=${search}`,
        { credentials: "include" },
      );
      if (!res.ok) throw new Error("Failed to fetch clients");
      return res.json();
    },
    enabled: search.length > 1,
    staleTime: 1000 * 60 * 5,
  });
}
