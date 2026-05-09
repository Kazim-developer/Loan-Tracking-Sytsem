export const prepareUpgrade = async () => {
  const res = await fetch(
    "http://localhost:5000/subscription/prepare-upgrade",
    { method: "POST", credentials: "include" },
  );

  const data = res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
