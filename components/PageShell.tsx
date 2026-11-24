import Link from "next/link";
import { Nav } from "@/components/Nav";

// Layout for pages other than the homepage: nav, a readable column and a footer.
export function PageShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <>
      <Nav />
      <main className="bg-grid pt-28 pb-20">
        <div className={`mx-auto px-6 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>{children}</div>
      </main>
      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-[var(--muted)]">
          <p>Ivan Flores Hurtado · Hamburg, Germany</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
              Home
            </Link>
            <Link href="/blog" className="transition-colors hover:text-[var(--foreground)]">
              Blog
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-[var(--foreground)]">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      {children}
    </p>
  );
}
