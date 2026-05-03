export const getLoanDetail = async (loanId: string, page: number) => {
  const res = await fetch(
    `http://localhost:5000/loans/${loanId}?page=${page}`,
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
