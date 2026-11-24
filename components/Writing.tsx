"use client";

import Link from "next/link";
import { Section, SectionItem } from "./Section";
import { formatDate, posts } from "@/lib/posts";

export function Writing() {
  const latest = posts.slice(0, 2);
  return (
    <Section id="blog" title="Writing">
      <div className="grid gap-6">
        {latest.map((post) => (
          <SectionItem key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
            >
              <p className="text-xs text-[var(--muted)]">
                {formatDate(post.date)} · {post.readingTime}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{post.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{post.summary}</p>
              <p className="mt-4 text-sm font-medium text-[var(--accent)]">Read the post</p>
            </Link>
          </SectionItem>
        ))}
      </div>
      <SectionItem>
        <Link
          href="/blog"
          className="text-sm text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:underline"
        >
          All posts
        </Link>
      </SectionItem>
    </Section>
  );
}
