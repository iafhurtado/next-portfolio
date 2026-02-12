"use client";

import { useState } from "react";
import { Section, SectionItem } from "@/components/Section";
import { useWalletNFTs } from "@/hooks/useWalletNFTs";
import { NFTGrid } from "./NFTGrid";
import { NFTModal } from "./NFTModal";
import type { NFT } from "@/types/nft";

export function NFTGallery() {
  const {
    nfts,
    isLoading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refetch,
    isFetching: isFetchingMore,
  } = useWalletNFTs();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  // Error state
  if (error) {
    return (
      <Section id="gallery" title="My NFT Collection" wide>
        <SectionItem>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/5 py-16 px-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <svg
                className="h-8 w-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Failed to load NFTs
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{error.message}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-[var(--background)] transition-transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </SectionItem>
      </Section>
    );
  }

  // Show gallery
  return (
    <Section id="gallery" title="My NFT Collection" wide>
      <SectionItem>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              My Digital Gallery
            </h3>
            <p className="mt-2 text-[var(--muted)]">
              {isLoading
                ? "Loading collection..."
                : `Exploring ${totalCount} NFT${totalCount !== 1 ? "s" : ""} across Base`}
            </p>
          </div>

          {/* Grid */}
          <NFTGrid
            nfts={nfts}
            onSelectNFT={setSelectedNFT}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isFetchingMore={isFetchingMore}
          />
        </div>
      </SectionItem>

      {/* Modal */}
      <NFTModal
        nft={selectedNFT}
        onClose={() => setSelectedNFT(null)}
      />
    </Section>
  );
}
