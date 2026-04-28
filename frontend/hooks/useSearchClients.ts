import { useQuery } from "@tanstack/react-query";

export function useSearchClients(search: string) {
  return useQuery({
    queryKey: ["clients", search],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/clients?search=${search}`,
        { credentials: "include" },
      );
      if (!res.ok) throw new Error("Failed to fetch clients");
      return res.json();
    },
    enabled: search.length > 1,
    staleTime: 1000 * 60 * 5,
  });
}
