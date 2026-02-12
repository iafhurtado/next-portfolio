/**
 * NFT types for the gallery - compatible with thirdweb Insight API and REST API
 */

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface NFTCollection {
  name: string;
  description?: string;
  image?: string;
  external_url?: string;
}

/**
 * Normalized NFT type for gallery display
 * Supports both thirdweb SDK and REST API response formats
 */
export interface NFT {
  token_id: string;
  token_address: string;
  chain_id: number;
  name: string;
  description?: string;
  image_url: string;
  animation_url?: string;
  external_url?: string;
  attributes?: NFTAttribute[];
  collection?: NFTCollection;
  metadata?: Record<string, unknown>;
  quantity_owned?: number;
}

export interface WalletNFTsResponse {
  result: {
    nfts: NFT[];
    pagination: {
      hasMore: boolean;
      limit: number;
      page: number;
      totalCount: number | null;
    };
  };
}

/**
 * Chain display info for badges
 */
export const CHAIN_INFO: Record<number, { name: string; explorer: string }> = {
  1: { name: "Ethereum", explorer: "https://etherscan.io" },
  137: { name: "Polygon", explorer: "https://polygonscan.com" },
  8453: { name: "Base", explorer: "https://basescan.org" },
  10: { name: "Optimism", explorer: "https://optimistic.etherscan.io" },
  42161: { name: "Arbitrum", explorer: "https://arbiscan.io" },
};
