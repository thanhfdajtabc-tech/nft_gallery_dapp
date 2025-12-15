"use client";

import { useState } from "react";
import { Trash2, Send } from "lucide-react";

interface NFTCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  creator: string;
  onTransfer: (nftId: string, recipient: string) => void;
  onBurn: (nftId: string) => void;
}

export default function NFTCard({
  id,
  name,
  description,
  imageUrl,
  creator,
  onTransfer,
  onBurn,
}: NFTCardProps) {
  const [showTransfer, setShowTransfer] = useState(false);
  const [recipient, setRecipient] = useState("");

  const handleTransfer = () => {
    if (recipient.trim()) {
      onTransfer(id, recipient);
      setRecipient("");
      setShowTransfer(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-purple-400 to-pink-400">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x400?text=NFT";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Creator */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-500">Creator</p>
          <p className="text-xs font-mono text-gray-700 truncate">{creator}</p>
        </div>

        {/* Actions */}
        {!showTransfer ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShowTransfer(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Send size={16} />
              Transfer
            </button>
            <button
              onClick={() => onBurn(id)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient address (0x...)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={handleTransfer}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowTransfer(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg text-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
