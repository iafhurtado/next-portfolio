"use client";

import { useState, useEffect } from "react";
import { Section, SectionItem } from "@/components/Section";
import { MintButton } from "./MintButton";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "@/lib/thirdweb";
import { nextTokenIdToMint } from "thirdweb/extensions/erc721";

interface MintSectionProps {
  contractAddress: string;
}

export function MintSection({ contractAddress }: MintSectionProps) {
  const [totalMints, setTotalMints] = useState<number | null>(null);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validate contract address
  if (!contractAddress || !contractAddress.startsWith("0x")) {
    return (
      <Section id="mint" title="Collect Your Visit">
        <SectionItem>
          <div className="text-center text-[var(--muted)]">
            <p>NFT contract address not configured.</p>
            <p className="mt-2 text-sm">
              Please set NEXT_PUBLIC_NFT_CONTRACT_ADDRESS in your environment
              variables.
            </p>
          </div>
        </SectionItem>
      </Section>
    );
  }

  useEffect(() => {
    // Fetch total mints count
    const fetchTotalMints = async () => {
      try {
        const contract = getContract({
          client,
          chain: base,
          address: contractAddress as `0x${string}`,
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
  }, [contractAddress]);

  const handleMintSuccess = (hash: string) => {
    setMintSuccess(true);
    setTxHash(hash);
    setError(null);
    // Refresh total mints count
    setTimeout(() => {
      const fetchTotalMints = async () => {
        try {
          const contract = getContract({
            client,
            chain: base,
            address: contractAddress as `0x${string}`,
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
    <Section id="mint" title="Collect Your Visit">
      <SectionItem>
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Description */}
          <div className="max-w-2xl space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              Mint a commemorative NFT
            </h3>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              As a token of your visit, mint a free commemorative NFT on Base.
              This NFT serves as a digital keepsake of your time exploring my
              portfolio.
            </p>
          </div>

          {/* NFT Preview Placeholder */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-8 transition-colors hover:border-[var(--accent)]">
            <div className="aspect-square flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-[var(--muted)]">
                <svg
                  className="h-24 w-24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm">NFT Preview</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {mintSuccess && (
            <div className="w-full max-w-md rounded-xl border border-[var(--accent)] bg-[var(--accent-muted)] p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]">
                  <svg
                    className="h-6 w-6 text-[var(--background)]"
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
                  <h4 className="text-lg font-semibold text-[var(--foreground)]">
                    Mint Successful!
                  </h4>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Your NFT has been minted successfully.
                  </p>
                  {basescanUrl && (
                    <a
                      href={basescanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline transition-colors hover:text-[var(--foreground)]"
                    >
                      View on Basescan →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="w-full max-w-md rounded-xl border border-red-500/50 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Mint Button */}
          {!mintSuccess && (
            <div className="flex flex-col items-center gap-4">
              <MintButton
                contractAddress={contractAddress}
                onMintSuccess={handleMintSuccess}
                onMintError={handleMintError}
              />
            </div>
          )}

          {/* Total Mints Counter */}
          {totalMints !== null && (
            <div className="text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--accent)]">
                {totalMints}
              </span>{" "}
              {totalMints === 1 ? "NFT" : "NFTs"} minted so far
            </div>
          )}

          {/* Info Box */}
          <div className="mt-4 w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--muted-bg)] p-4">
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              <strong className="font-semibold text-[var(--foreground)]">
                Note:
              </strong>{" "}
              This NFT is minted on Base network. Make sure you have Base added
              to your wallet and sufficient ETH for gas fees.
            </p>
          </div>
        </div>
      </SectionItem>
    </Section>
  );
}
