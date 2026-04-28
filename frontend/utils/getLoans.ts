export const getLoans = async (page: number, limit: number) => {
  const res = await fetch(
    `http://localhost:5000/loans?page=${page}&limit=${limit}`,
    { credentials: "include" },
  );
  return res.json();
};
