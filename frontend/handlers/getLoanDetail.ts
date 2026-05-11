export const getLoanDetail = async (loanId: string, page: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/loans/${loanId}?page=${page}`,
    {
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
