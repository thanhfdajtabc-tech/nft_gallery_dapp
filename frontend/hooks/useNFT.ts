"use client";

import { useCurrentAccount, useSignAndExecuteTransaction } from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { PACKAGE_ID, MODULE_NAME } from "@/lib/config";
import { useState } from "react";

export function useNFT() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [isLoading, setIsLoading] = useState(false);

  const createGallery = async () => {
    if (!account) return;
    setIsLoading(true);

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::create_gallery`,
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("Gallery created!", result);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Error:", error);
          setIsLoading(false);
        },
      }
    );
  };

  const mintNFT = async (
    galleryId: string,
    name: string,
    description: string,
    imageUrl: string
  ) => {
    if (!account) return;
    setIsLoading(true);

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::mint_nft`,
      arguments: [
        tx.object(galleryId),
        tx.pure.string(name),
        tx.pure.string(description),
        tx.pure.string(imageUrl),
      ],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("NFT minted!", result);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Error:", error);
          setIsLoading(false);
        },
      }
    );
  };

  const transferNFT = async (nftId: string, recipient: string) => {
    if (!account) return;
    setIsLoading(true);

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::transfer_nft`,
      arguments: [tx.object(nftId), tx.pure.address(recipient)],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("NFT transferred!", result);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Error:", error);
          setIsLoading(false);
        },
      }
    );
  };

  const burnNFT = async (nftId: string) => {
    if (!account) return;
    setIsLoading(true);

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::burn_nft`,
      arguments: [tx.object(nftId)],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("NFT burned!", result);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Error:", error);
          setIsLoading(false);
        },
      }
    );
  };

  return { createGallery, mintNFT, transferNFT, burnNFT, isLoading };
}
