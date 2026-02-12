"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaRenderer } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import type { NFT } from "@/types/nft";
import { CHAIN_INFO } from "@/types/nft";

interface NFTModalProps {
  nft: NFT | null;
  onClose: () => void;
}

const OPENSEA_CHAIN_SLUGS: Record<number, string> = {
  1: "ethereum",
  137: "matic",
  8453: "base",
  10: "optimism",
  42161: "arbitrum-one",
};

export function NFTModal({ nft, onClose }: NFTModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (nft) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [nft]);

  const mediaSrc = nft?.animation_url || nft?.image_url;
  const chainInfo = nft ? CHAIN_INFO[nft.chain_id] ?? { name: "Unknown", explorer: "" } : { name: "", explorer: "" };
  const openseaChain = nft ? OPENSEA_CHAIN_SLUGS[nft.chain_id] ?? "base" : "base";
  const openseaUrl = nft ? `https://opensea.io/assets/${openseaChain}/${nft.token_address}/${nft.token_id}` : "";
  const basescanUrl = nft
    ? nft.chain_id === 8453
      ? `https://basescan.org/token/${nft.token_address}?a=${nft.token_id}`
      : chainInfo.explorer
        ? `${chainInfo.explorer}/token/${nft.token_address}?a=${nft.token_id}`
        : null
    : null;

  return (
    <AnimatePresence mode="wait">
      {nft && (
      <motion.div
        key={`${nft.token_address}-${nft.token_id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nft-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Close modal"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="overflow-y-auto max-h-[90vh]">
            {/* NFT media */}
            <div className="relative aspect-square w-full bg-[var(--muted-bg)]">
              {mediaSrc ? (
                <MediaRenderer
                  client={client}
                  src={mediaSrc}
                  poster={nft.image_url}
                  alt={nft.name}
                  className="h-full w-full object-contain"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    className="h-24 w-24 text-[var(--muted)]"
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
              )}
            </div>

            {/* Details */}
            <div className="space-y-6 p-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-[var(--accent-muted)] px-2 py-1 text-xs font-medium text-[var(--accent)]">
                    {chainInfo.name}
                  </span>
                </div>
                <h2
                  id="nft-modal-title"
                  className="text-2xl font-bold text-[var(--foreground)]"
                >
                  {nft.name || "Unnamed"}
                </h2>
                {nft.collection?.name && (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {nft.collection.name}
                  </p>
                )}
              </div>

              {nft.description && (
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {nft.description}
                </p>
              )}

              {/* Attributes */}
              {nft.attributes && nft.attributes.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Properties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {nft.attributes.map((attr) => (
                      <div
                        key={attr.trait_type}
                        className="rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-2"
                      >
                        <p className="text-xs text-[var(--muted)]">
                          {attr.trait_type}
                        </p>
                        <p className="text-sm font-medium text-[var(--foreground)]">
                          {String(attr.value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* External links */}
              <div className="flex flex-wrap gap-3 border-t border-[var(--border)] pt-4">
                <a
                  href={openseaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--foreground)]"
                >
                  View on OpenSea
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                {basescanUrl && (
                  <a
                    href={basescanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--foreground)]"
                  >
                    View on Basescan
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
