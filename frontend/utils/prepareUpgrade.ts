export const prepareUpgrade = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subscription/prepare-upgrade`,
    { method: "POST", credentials: "include" },
  );

  const data = res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
