export const checkSubscriptionDetail = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
