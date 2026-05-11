export const getStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
