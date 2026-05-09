export const checkSubscriptionDetail = async () => {
  const res = await fetch(`http://localhost:5000/subscription`, {
    credentials: "include",
  });

  console.log("request send for subsxription detail");
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
