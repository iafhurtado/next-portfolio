import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, PageShell } from "@/components/PageShell";
import { formatDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Ivan Flores Hurtado",
  description: "Short notes on product management, automation and running AI agents in production.",
};

export default function BlogIndex() {
  return (
    <PageShell>
      <Eyebrow>Blog</Eyebrow>
      <h1
        className="mt-4 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Notes from building
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        Short posts on product management, automation and running AI agents in production.
      </p>
      <ul className="mt-12 space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
            >
              <p className="text-xs text-[var(--muted)]">
                {formatDate(post.date)} · {post.readingTime}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{post.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[var(--background)] px-3 py-1 text-xs text-[var(--foreground)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
