export const checkSubscriptionDetail = async () => {
  const res = await fetch(`http://localhost:5000/subscription`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
