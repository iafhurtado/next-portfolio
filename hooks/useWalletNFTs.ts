"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { base } from "thirdweb/chains";
import { client } from "@/lib/thirdweb";
import { getOwnedNFTs } from "thirdweb/insight";
import type { NFT } from "@/types/nft";

const LIMIT = 50;

/** NFT name substrings to filter out (case-insensitive) */
const BLOCKED_NAME_SUBSTRINGS = [
  "claim",
  "rewards",
  "airdrop",
  "exclusive",
  "unnamed",
  "gift",
  "project",
];

function isBlocked(nft: NFT): boolean {
  const name = (nft.name ?? "").toLowerCase();
  return BLOCKED_NAME_SUBSTRINGS.some((s) => name.includes(s));
}

/** Personal wallet addresses to display in the gallery */
const ENV_WALLETS = process.env.NEXT_PUBLIC_GALLERY_WALLETS;
export const GALLERY_WALLET_ADDRESSES: string[] =
  ENV_WALLETS && ENV_WALLETS.trim()
    ? ENV_WALLETS.split(",")
        .map((a) => a.trim())
        .filter((a) => a.startsWith("0x"))
    : [
        "0x58E6d11a458dB5Bb49903f63D841bED8c5E90Fa9",
      ];

/**
 * Fetch NFTs using thirdweb Insight SDK
 */
async function fetchWalletNFTs(address: string): Promise<NFT[]> {
  const owned = await getOwnedNFTs({
    client,
    chains: [base],
    ownerAddress: address,
    queryOptions: { limit: LIMIT },
  });

  return owned.map((nft) => ({
    token_id: nft.id.toString(),
    token_address: nft.tokenAddress,
    chain_id: nft.chainId,
    name:
      (nft.metadata?.name as string) ??
      (nft.metadata?.image ? "Unnamed" : "Unnamed"),
    description:
      typeof nft.metadata?.description === "string"
        ? nft.metadata.description
        : undefined,
    image_url:
      (nft.metadata?.image as string) ??
      (nft.metadata?.image_url as string) ??
      "",
    animation_url:
      typeof nft.metadata?.animation_url === "string"
        ? nft.metadata.animation_url
        : undefined,
    external_url:
      typeof nft.metadata?.external_url === "string"
        ? nft.metadata.external_url
        : undefined,
    attributes: (() => {
      const attrs = nft.metadata?.attributes;
      if (Array.isArray(attrs)) {
        return (attrs as Array<{ trait_type?: string; value?: string | number }>)
          .filter((a) => a.trait_type != null)
          .map((a) => ({
            trait_type: String(a.trait_type),
            value: a.value ?? "",
          }));
      }
      if (attrs && typeof attrs === "object" && !Array.isArray(attrs)) {
        return Object.entries(attrs as Record<string, unknown>).map(
          ([k, v]) => ({ trait_type: k, value: String(v ?? "") })
        );
      }
      return undefined;
    })(),
    quantity_owned: Number(nft.quantityOwned ?? 1),
  }));
}

/**
 * Hook to fetch and manage NFTs from the configured gallery wallet addresses
 */
export function useWalletNFTs(walletAddresses: string[] = GALLERY_WALLET_ADDRESSES) {
  const [displayCount, setDisplayCount] = useState(20);
  const INITIAL_DISPLAY = 20;
  const LOAD_MORE_COUNT = 20;

  const query = useQuery({
    queryKey: ["gallery-nfts", walletAddresses],
    queryFn: async () => {
      const results = await Promise.all(
        walletAddresses.map((addr) => fetchWalletNFTs(addr))
      );
      const seen = new Set<string>();
      const merged: NFT[] = [];
      for (const nftList of results) {
        for (const nft of nftList) {
          const key = `${nft.token_address}-${nft.token_id}`;
          if (!seen.has(key) && !isBlocked(nft)) {
            seen.add(key);
            merged.push(nft);
          }
        }
      }
      return merged;
    },
    enabled: walletAddresses.length > 0,
    staleTime: 60_000,
  });

  const { data: allNfts = [], isLoading, error, refetch } = query;
  const nfts = allNfts.slice(0, displayCount);
  const hasMore = allNfts.length > displayCount;
  const totalCount = allNfts.length;

  const loadMore = useCallback(() => {
    setDisplayCount((c) => Math.min(c + LOAD_MORE_COUNT, allNfts.length));
  }, [allNfts.length]);

  useEffect(() => {
    setDisplayCount(INITIAL_DISPLAY);
  }, [walletAddresses.join(",")]);

  return {
    nfts,
    isLoading,
    error: error instanceof Error ? error : null,
    hasMore,
    totalCount,
    loadMore,
    refetch,
    isFetching: query.isFetching,
  };
}
