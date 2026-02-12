"use client";

import { useState, useEffect } from "react";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { ConnectButton, TransactionButton } from "thirdweb/react";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { prepareContractCall } from "thirdweb";
import { client } from "@/lib/thirdweb";

interface MintButtonProps {
  contractAddress: string;
  onMintSuccess?: (txHash: string) => void;
  onMintError?: (error: string) => void;
}

export function MintButton({
  contractAddress,
  onMintSuccess,
  onMintError,
}: MintButtonProps) {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const [isCorrectChain, setIsCorrectChain] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Check if connected chain is Base
    setIsCorrectChain(chain?.id === base.id);
  }, [chain]);

  // Validate contract address - trim whitespace and validate
  const trimmedAddress = (contractAddress && typeof contractAddress === 'string') 
    ? String(contractAddress).trim() 
    : "";
  const isValidContract = trimmedAddress.length > 0 && trimmedAddress.startsWith("0x") && trimmedAddress.length === 42;

  // Only create contract if address is valid
  const contract = isValidContract
    ? getContract({
        client,
        chain: base,
        address: trimmedAddress as `0x${string}`,
      })
    : null;

  const handleMintSuccess = (receipt: any) => {
    const txHash = receipt.transactionHash;
    if (onMintSuccess) {
      onMintSuccess(txHash);
    }
  };

  // If wallet is not connected, show connect button styled as mint button
  if (!account) {
    return (
      <ConnectButton
        client={client}
        chain={base}
        connectButton={{
          label: "Connect Wallet to Mint",
          style: {
            backgroundColor: "var(--accent)",
            color: "var(--background)",
            borderRadius: "9999px",
            padding: "0.75rem 2rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            border: "none",
          },
        }}
        connectModal={{
          size: "wide",
        }}
      />
    );
  }

  // If connected to wrong chain, show switch button styled as mint button
  if (!isCorrectChain) {
    return (
      <ConnectButton
        client={client}
        chain={base}
        connectButton={{
          label: "Switch to Base to Mint",
          style: {
            backgroundColor: "var(--accent)",
            color: "var(--background)",
            borderRadius: "9999px",
            padding: "0.75rem 2rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            border: "none",
          },
        }}
      />
    );
  }

  // Always show mint button - disable if contract is invalid
  if (!isValidContract || !contract) {
    console.warn("Invalid contract address:", contractAddress);
    return (
      <button
        disabled
        className="rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-medium text-[var(--background)] opacity-50 cursor-not-allowed"
      >
        Mint NFT (Invalid Contract)
      </button>
    );
  }

  // Show mint button
  return (
    <TransactionButton
      transaction={() => {
        if (!account?.address || typeof account.address !== 'string') {
          throw new Error("Wallet not connected");
        }
        
        if (!contract) {
          throw new Error("Contract not initialized");
        }
        
        setIsPending(true);
        // Call the claim function with the correct parameters
        // Based on: claim(address _receiver, uint256 _tokenId, uint256 _quantity, address _currency, uint256 _pricePerToken, tuple _allowlistProof, bytes _data)
        try {
          const receiver = String(account.address).trim();
          if (!receiver || receiver.length !== 42 || !receiver.startsWith("0x")) {
            throw new Error("Invalid receiver address");
          }
          
          // Use the full ABI function definition with proper tuple structure
          return prepareContractCall({
            contract,
            method: {
              name: "claim",
              type: "function",
              inputs: [
                { name: "_receiver", type: "address" },
                { name: "_tokenId", type: "uint256" },
                { name: "_quantity", type: "uint256" },
                { name: "_currency", type: "address" },
                { name: "_pricePerToken", type: "uint256" },
                {
                  name: "_allowlistProof",
                  type: "tuple",
                  components: [
                    { name: "proof", type: "bytes32[]" },
                    { name: "quantityLimitPerWallet", type: "uint256" },
                    { name: "pricePerToken", type: "uint256" },
                    { name: "currency", type: "address" },
                  ],
                },
                { name: "_data", type: "bytes" },
              ],
              outputs: [],
              stateMutability: "payable",
            },
            params: [
              receiver as `0x${string}`, // _receiver
              BigInt(0), // _tokenId (0 for new mints)
              BigInt(1), // _quantity
              "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // _currency (ETH)
              BigInt("100000000000000"), // _pricePerToken (0.0001 ETH in wei)
              {
                proof: [],
                quantityLimitPerWallet: BigInt(0),
                pricePerToken: BigInt("100000000000000"), // Must match _pricePerToken
                currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // Must match _currency
              }, // _allowlistProof (tuple with proper structure)
              "0x", // _data (empty bytes)
            ],
            value: BigInt("100000000000000"), // Send native token value for payable function
          });
        } catch (error) {
          setIsPending(false);
          console.error("Error preparing contract call:", error);
          throw error;
        }
      }}
      onTransactionSent={() => {
        setIsPending(true);
      }}
      onTransactionConfirmed={(result) => {
        setIsPending(false);
        handleMintSuccess(result);
      }}
      onError={(error) => {
        setIsPending(false);
        
        // Check if user rejected the transaction
        const errorMessage = error instanceof Error ? error.message : String(error);
        const isUserRejection = 
          errorMessage.includes("User rejected") ||
          errorMessage.includes("rejected") ||
          errorMessage.includes("User denied") ||
          errorMessage.includes("closed modal") ||
          errorMessage.includes("user rejected transaction");
        
        if (isUserRejection) {
          // Silently handle user rejection - don't show error, just reset state
          console.log("Transaction cancelled by user");
          return;
        }
        
        // For other errors, show error message
        console.error("Minting error:", error);
        const finalErrorMessage = errorMessage || "Failed to mint NFT. Please try again.";
        if (onMintError) {
          onMintError(finalErrorMessage);
        }
      }}
      className="rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {isPending ? "Minting..." : "Mint NFT"}
    </TransactionButton>
  );
}
