"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NFTCard } from "./NFTCard";
import type { NFT } from "@/types/nft";

const PAGE_SIZE = 4;

interface NFTCarouselProps {
  nfts: NFT[];
  onSelectNFT: (nft: NFT) => void;
  isLoading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]">
      <div className="aspect-square animate-pulse bg-[var(--border)]" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--border)]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--border)]" />
      </div>
    </div>
  );
}

export function NFTCarousel({
  nfts,
  onSelectNFT,
  isLoading,
}: NFTCarouselProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(nfts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const pageNfts = nfts.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!nfts.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--muted-bg)]/50 py-16 px-8 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--border)]/50">
          <svg
            className="h-12 w-12 text-[var(--muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          No NFTs found yet
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
          This collection doesn&apos;t have any NFTs on Base yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AnimatePresence mode="wait">
          {pageNfts.map((nft, index) => (
            <motion.div
              key={`${nft.token_address}-${nft.token_id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NFTCard
                nft={nft}
                onClick={() => onSelectNFT(nft)}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
            aria-label="Previous"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <span className="text-sm text-[var(--muted)]">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
            aria-label="Next"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
