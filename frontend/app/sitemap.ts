export default function sitemap() {
  const baseUrl = "https://loqvio.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-05-07"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
