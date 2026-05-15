import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Loqvio", url: "https://loqvio.com" }],
    alternates: {
      canonical: `https://loqvio.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://loqvio.com/blog/${post.slug}`,
      siteName: "Loqvio",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="center-section my-[3rem]">
      <p className="text-sm text-gray-500 mb-4">{post.date}</p>
      <h1 className="text-4xl font-[500] mb-6">{post.title}</h1>
      <p className="text-xl text-gray-500 mb-12">{post.description}</p>

      <section className="prose prose-gray max-w-none">
        <MDXRemote source={post.content} />
      </section>

      {/* CTA */}
      <section className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-[500] mb-3">
          Ready to ditch the spreadsheet?
        </h2>
        <p className="text-gray-500 mb-6">
          Start tracking loans with Loqvio — free, no credit card needed.
        </p>
        <a
          href="https://loqvio.com/signup"
          className="bg-black text-white px-6 py-3 rounded-lg text-sm font-[500] hover:opacity-80 transition"
        >
          Start Tracking Loans Free →
        </a>
      </section>
    </article>
  );
}
