const cancelSubscription = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subscription/cancel`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to cancel subscription");
  }

  return res.json();
};

export default cancelSubscription;
