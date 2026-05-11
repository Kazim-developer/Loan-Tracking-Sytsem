export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/dashboard", "/loans", "/upgrade"],
      },
    ],
    sitemap: "https://loqvio.com/sitemap.xml",
  };
}
