export const getStats = async () => {
  const res = await fetch("http://localhost:5000/stats", {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
