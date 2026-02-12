"use client";

import { motion } from "framer-motion";
import { NFTCard } from "./NFTCard";
import type { NFT } from "@/types/nft";

interface NFTGridProps {
  nfts: NFT[];
  onSelectNFT: (nft: NFT) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isFetchingMore?: boolean;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted-bg)]">
      <div className="aspect-square animate-pulse bg-[var(--border)]" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--border)]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--border)]" />
      </div>
    </div>
  );
}

export function NFTGrid({
  nfts,
  onSelectNFT,
  isLoading,
  hasMore,
  onLoadMore,
  isFetchingMore,
}: NFTGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!nfts.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--muted-bg)]/50 py-16 px-8 text-center"
      >
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--border)]/50">
          <svg
            className="h-12 w-12 text-[var(--muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
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
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.05 },
          },
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {nfts.map((nft, index) => (
          <NFTCard
            key={`${nft.token_address}-${nft.token_id}`}
            nft={nft}
            onClick={() => onSelectNFT(nft)}
            index={index}
          />
        ))}
      </motion.div>

      {hasMore && (
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLoadMore}
            disabled={isFetchingMore}
            className="rounded-full border border-[var(--accent)] bg-transparent px-8 py-3 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent-muted)] disabled:opacity-50"
          >
            {isFetchingMore ? "Loading..." : "Load More"}
          </motion.button>
        </div>
      )}
    </div>
  );
}
