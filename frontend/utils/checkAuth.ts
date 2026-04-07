export const checkAuth = async () => {
  const res = await fetch(`http://localhost:5000/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
