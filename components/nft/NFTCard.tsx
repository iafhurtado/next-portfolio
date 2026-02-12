"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { MediaRenderer } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import type { NFT } from "@/types/nft";
import { CHAIN_INFO } from "@/types/nft";

interface NFTCardProps {
  nft: NFT;
  onClick: () => void;
  index?: number;
}

function NFTCardComponent({ nft, onClick, index = 0 }: NFTCardProps) {
  const mediaSrc = nft.animation_url || nft.image_url;
  const chainInfo = CHAIN_INFO[nft.chain_id] ?? { name: "Unknown", explorer: "" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${nft.name} details`}
    >
      {/* Chain badge */}
      <div className="absolute top-2 right-2 z-10">
        <span className="rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {chainInfo.name}
        </span>
      </div>

      {/* Media container with aspect ratio */}
      <div className="relative aspect-square overflow-hidden">
        {mediaSrc ? (
          <MediaRenderer
            client={client}
            src={mediaSrc}
            poster={nft.image_url}
            alt={nft.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--border)]">
            <svg
              className="h-16 w-16 text-[var(--muted)]"
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
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-[var(--foreground)]">
          {nft.name || "Unnamed"}
        </h3>
        {nft.collection?.name && (
          <p className="mt-1 truncate text-xs text-[var(--muted)]">
            {nft.collection.name}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export const NFTCard = memo(NFTCardComponent);
