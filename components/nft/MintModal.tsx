"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MintButton } from "./MintButton";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "@/lib/thirdweb";
import { nextTokenIdToMint } from "thirdweb/extensions/erc721";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress: string;
}

export function MintModal({
  isOpen,
  onClose,
  contractAddress,
}: MintModalProps) {
  const [totalMints, setTotalMints] = useState<number | null>(null);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setMintSuccess(false);
      setTxHash(null);
      setError(null);
      return;
    }

    // Fetch total mints count when modal opens
    const fetchTotalMints = async () => {
      const addr = contractAddress && typeof contractAddress === 'string' ? String(contractAddress).trim() : "";
      if (!addr || !addr.startsWith("0x") || addr.length !== 42) {
        return;
      }
      try {
        const contract = getContract({
          client,
          chain: base,
          address: addr as `0x${string}`,
        });
        const nextId = await nextTokenIdToMint({ contract });
        setTotalMints(Number(nextId));
      } catch (error) {
        console.error("Error fetching total mints:", error);
      }
    };

    if (contractAddress) {
      fetchTotalMints();
    }
  }, [isOpen, contractAddress]);

  const handleMintSuccess = (hash: string) => {
    setMintSuccess(true);
    setTxHash(hash);
    setError(null);
    // Refresh total mints count
    setTimeout(() => {
      const fetchTotalMints = async () => {
        const addr = contractAddress && typeof contractAddress === 'string' ? String(contractAddress).trim() : "";
        if (!addr || !addr.startsWith("0x") || addr.length !== 42) {
          return;
        }
        try {
          const contract = getContract({
            client,
            chain: base,
            address: addr as `0x${string}`,
          });
          const nextId = await nextTokenIdToMint({ contract });
          setTotalMints(Number(nextId));
        } catch (error) {
          console.error("Error fetching total mints:", error);
        }
      };
      fetchTotalMints();
    }, 2000);
  };

  const handleMintError = (errorMessage: string) => {
    setError(errorMessage);
    setMintSuccess(false);
  };

  const basescanUrl = txHash
    ? `https://basescan.org/tx/${txHash}`
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--background)] p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
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

              {/* Content */}
              <div className="space-y-6 pb-2">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                    Collect Your Visit
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    Mint a free commemorative NFT as a token of your visit to my
                    portfolio. This NFT serves as a digital keepsake on the Base
                    network.
                  </p>
                </div>

                {/* NFT Preview */}
                <div className="relative w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--muted-bg)]">
                  <div className="aspect-square relative">
                    <img
                      src="/nft-preview.png"
                      alt="Portfolio Visitor NFT"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex flex-col items-center justify-center h-full gap-3 text-[var(--muted)]">
                              <svg class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <p class="text-xs">NFT Preview</p>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-red-500/50 bg-red-500/10 p-4"
                  >
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {mintSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-[var(--accent)] bg-[var(--accent-muted)] p-4"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]">
                        <svg
                          className="h-5 w-5 text-[var(--background)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-[var(--foreground)]">
                          Mint Successful!
                        </h4>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          Your NFT has been minted successfully.
                        </p>
                        {basescanUrl && (
                          <a
                            href={basescanUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs font-medium text-[var(--accent)] underline transition-colors hover:text-[var(--foreground)]"
                          >
                            View on Basescan →
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Mint Button - Always visible unless mint was successful */}
                {!mintSuccess && (
                  <div className="flex justify-center py-2">
                    <MintButton
                      contractAddress={contractAddress}
                      onMintSuccess={handleMintSuccess}
                      onMintError={handleMintError}
                    />
                  </div>
                )}

                {/* Total Mints Counter */}
                {totalMints !== null && (
                  <div className="text-center text-xs text-[var(--muted)]">
                    <span className="font-medium text-[var(--accent)]">
                      {totalMints}
                    </span>{" "}
                    {totalMints === 1 ? "NFT" : "NFTs"} minted so far
                  </div>
                )}

                {/* Info Box */}
                <div className="rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] p-3">
                  <p className="text-xs leading-relaxed text-[var(--muted)]">
                    <strong className="font-semibold text-[var(--foreground)]">
                      Note:
                    </strong>{" "}
                    This NFT is minted on Base network. Make sure you have Base
                    added to your wallet and sufficient ETH for gas fees.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
