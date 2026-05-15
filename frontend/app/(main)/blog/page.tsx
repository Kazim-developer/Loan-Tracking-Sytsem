import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog — Loqvio",
  description:
    "Insights and guides for lending businesses — loan tracking, repayment management, and replacing Excel.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="center-section my-[3rem]">
      <h1 className="text-4xl font-[500] mb-4">Blogs</h1>
      <p className="text-xl text-gray-500">
        Guides and insights for lending businesses.
      </p>

      <section className="grid grid-cols-2 gap-5 mt-8 max-[600px]:grid-cols-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition"
          >
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <h2 className="text-2xl font-[500] mb-2 group-hover:underline">
              {post.title}
            </h2>
            <p className="text-gray-500">{post.description}</p>
          </Link>
        ))}
      </section>
    </section>
  );
}
