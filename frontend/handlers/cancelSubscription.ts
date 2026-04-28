const cancelSubscription = async () => {
  const res = await fetch("http://localhost:5000/subscription/cancel", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to cancel subscription");
  }

  return res.json();
};

export default cancelSubscription;
