"use client";

import { useState } from "react";
import { useCurrentAccount, ConnectButton } from "@iota/dapp-kit";
import { useNFT } from "@/hooks/useNFT";
import NFTCard from "./NFTCard";
import { Plus, Image, Wallet } from "lucide-react";

export default function NFTGallery() {
  const account = useCurrentAccount();
  const { createGallery, mintNFT, transferNFT, burnNFT, isLoading } = useNFT();

  const [galleryId, setGalleryId] = useState("");
  const [showMintForm, setShowMintForm] = useState(false);

  // Mint form state
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImageUrl, setNftImageUrl] = useState("");

  // Mock NFTs for display (in production, fetch from blockchain)
  const [mockNFTs, setMockNFTs] = useState([
    {
      id: "0x123",
      name: "Cool NFT #1",
      description: "This is a sample NFT",
      imageUrl: "https://picsum.photos/400/400?random=1",
      creator: account?.address || "0x...",
    },
  ]);

  const handleMintNFT = () => {
    if (nftName && nftDescription && nftImageUrl && galleryId) {
      mintNFT(galleryId, nftName, nftDescription, nftImageUrl);
      
      // Add to mock list for display
      setMockNFTs([
        ...mockNFTs,
        {
          id: `0x${Date.now()}`,
          name: nftName,
          description: nftDescription,
          imageUrl: nftImageUrl,
          creator: account?.address || "0x...",
        },
      ]);

      // Reset form
      setNftName("");
      setNftDescription("");
      setNftImageUrl("");
      setShowMintForm(false);
    }
  };

  const handleBurnNFT = (nftId: string) => {
    if (confirm("Are you sure you want to burn this NFT? This action is irreversible!")) {
      burnNFT(nftId);
      setMockNFTs(mockNFTs.filter((nft) => nft.id !== nftId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                🎨 NFT Gallery
              </h1>
              <p className="text-gray-600">
                Create, collect, and trade unique digital assets on IOTA
              </p>
            </div>
            <ConnectButton />
          </div>

          {/* Stats */}
          {account && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Wallet className="text-purple-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Connected</p>
                    <p className="font-mono text-sm text-gray-800 truncate">
                      {account.address.slice(0, 6)}...{account.address.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Image className="text-pink-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">NFTs Owned</p>
                    <p className="text-2xl font-bold text-gray-800">{mockNFTs.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Plus className="text-blue-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Gallery Status</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {galleryId ? "Active ✓" : "Not Created"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {!account ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="text-7xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-8">
              Connect your IOTA wallet to start creating and managing NFTs
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Gallery Setup */}
            {!galleryId && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  1️⃣ Create Your Gallery
                </h2>
                <p className="text-gray-600 mb-6">
                  First, create your personal NFT gallery on the blockchain
                </p>
                <button
                  onClick={createGallery}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Gallery..." : "Create Gallery"}
                </button>
              </div>
            )}

            {/* Set Gallery ID */}
            {!galleryId && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  2️⃣ Set Gallery Object ID
                </h2>
                <p className="text-gray-600 mb-4">
                  After creating your gallery, paste the Gallery object ID here
                </p>
                <input
                  type="text"
                  value={galleryId}
                  onChange={(e) => setGalleryId(e.target.value)}
                  placeholder="Enter Gallery Object ID (0x...)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Mint NFT */}
            {galleryId && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    3️⃣ Mint New NFT
                  </h2>
                  <button
                    onClick={() => setShowMintForm(!showMintForm)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-xl transition flex items-center gap-2"
                  >
                    <Plus size={20} />
                    {showMintForm ? "Cancel" : "Mint NFT"}
                  </button>
                </div>

                {showMintForm && (
                  <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NFT Name
                      </label>
                      <input
                        type="text"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                        placeholder="My Awesome NFT"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={nftDescription}
                        onChange={(e) => setNftDescription(e.target.value)}
                        placeholder="Describe your NFT..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={nftImageUrl}
                        onChange={(e) => setNftImageUrl(e.target.value)}
                        placeholder="https://example.com/image.png or ipfs://..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Use IPFS, Arweave, or any public image URL
                      </p>
                    </div>

                    <button
                      onClick={handleMintNFT}
                      disabled={
                        isLoading || !nftName || !nftDescription || !nftImageUrl
                      }
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Minting..." : "Mint NFT"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* NFT Grid */}
            {galleryId && mockNFTs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Your NFT Collection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockNFTs.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      {...nft}
                      onTransfer={transferNFT}
                      onBurn={handleBurnNFT}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {galleryId && mockNFTs.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
                <div className="text-7xl mb-6">🎨</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  No NFTs Yet
                </h3>
                <p className="text-gray-600">
                  Mint your first NFT to start your collection!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
