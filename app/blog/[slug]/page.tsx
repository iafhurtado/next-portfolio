import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PageShell } from "@/components/PageShell";
import { caseStudyPath } from "@/lib/automation";
import { formatDate, getPost, posts } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Ivan Flores Hurtado`,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <article>
        <Link
          href="/blog"
          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← All posts
        </Link>
        <div className="mt-8">
          <Eyebrow>{post.tags.join(" · ")}</Eyebrow>
        </div>
        <h1
          className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {formatDate(post.date)} · {post.readingTime}
        </p>

        <div className="mt-10 space-y-5">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="pt-6 text-xl font-semibold text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="list-disc space-y-2 pl-5 text-[var(--foreground)]">
                  {block.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "callout") {
              return (
                <div
                  key={i}
                  className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6"
                >
                  <p className="leading-relaxed text-[var(--foreground)]">{block.text}</p>
                  <Link
                    href={caseStudyPath}
                    className="mt-4 inline-block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-transform hover:scale-105"
                  >
                    Open the case study
                  </Link>
                </div>
              );
            }
            return (
              <p key={i} className="text-[17px] leading-relaxed text-[var(--foreground)]">
                {block.text}
              </p>
            );
          })}
        </div>
      </article>
    </PageShell>
  );
}
