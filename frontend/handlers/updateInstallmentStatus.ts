export const updateInstallmentStatus = async (installId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/installs/${installId}/payment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
