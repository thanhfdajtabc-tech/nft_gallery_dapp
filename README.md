# 🎨 NFT Gallery dApp - Full Stack IOTA Project

A complete decentralized NFT marketplace built on IOTA blockchain. Users can create galleries, mint NFTs, transfer ownership, and manage their digital art collection.

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Technologies Used](#️-technologies-used)
- [Getting Started](#-getting-started)
- [Smart Contract API](#-smart-contract-api)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Contract Address](#-contract-address)

---

## 🌐 Live Demo

**Frontend:** `http://localhost:3000` (local development)

**Testnet Explorer:** [View on IOTA Explorer](https://explorer.iota.cafe?network=testnet)

**Package ID:** `[TO BE FILLED AFTER DEPLOYMENT]`

**Network:** IOTA Testnet

---

## ✨ Features

### Smart Contract Features
- ✅ **Create Personal Gallery** - Each user has their own NFT gallery
- ✅ **Mint NFTs** - Create unique digital assets with metadata
- ✅ **Transfer Ownership** - Send NFTs to other addresses
- ✅ **Burn NFTs** - Permanently destroy unwanted NFTs
- ✅ **Update Metadata** - Modify NFT descriptions
- ✅ **View Functions** - Query NFT and gallery information
- ✅ **Event Emission** - Track minting activities
- ✅ **Owner Protection** - Only owners can modify their assets

### Frontend Features
- ✅ **Wallet Integration** - Seamless IOTA wallet connection
- ✅ **Beautiful UI** - Modern, gradient-based design
- ✅ **NFT Grid Display** - Responsive gallery view
- ✅ **Mint Form** - Easy-to-use

NFT creation interface

✅ Transfer Modal - Simple NFT transfer workflow
✅ Burn Confirmation - Safe deletion with warnings
✅ Real-time Stats - View collection statistics
✅ Loading States - Clear transaction feedback
✅ Error Handling - Graceful error messages
✅ Mobile Responsive - Works perfectly on all devices
✅ IPFS Support - Compatible with IPFS image URLs

## 🏗️ Architecture
System Overview
┌────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│               Next.js 14 + TypeScript                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages & Components:                                  │  │
│  │  • app/page.tsx (Entry point)                        │  │
│  │  • NFTGallery.tsx (Main interface)                   │  │
│  │  • NFTCard.tsx (NFT display)                         │  │
│  │  • Provider.tsx (Blockchain provider)                │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Hooks & State Management:                            │  │
│  │  • useNFT.ts (Contract interactions)                 │  │
│  │  • React Query (Caching & sync)                      │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬───────────────────────────────────────────┘
                 │
                 │ @iota/dapp-kit + Transaction Builder
                 │
┌────────────────▼───────────────────────────────────────────┐
│                IOTA Blockchain Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         NFT Gallery Smart Contract                    │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Gallery Object (Per User)                     │  │  │
│  │  │  - id: UID                                     │  │  │
│  │  │  - owner: address                              │  │  │
│  │  │  - nft_count: u64                              │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  NFT Object (Individual Asset)                 │  │  │
│  │  │  - id: UID                                     │  │  │
│  │  │  - name: String                                │  │  │
│  │  │  - description: String                         │  │  │
│  │  │  - url: Url                                    │  │  │
│  │  │  - creator: address                            │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  Functions:                                           │  │
│  │  • create_gallery()                                   │  │
│  │  • mint_nft()                                         │  │
│  │  • transfer_nft()                                     │  │
│  │  • burn_nft()                                         │  │
│  │  • update_description()                               │  │
│  │  • get_nft_info() [View]                             │  │
│  │  • get_gallery_info() [View]                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

Data Flow

Initialization:

User connects wallet → Frontend detects account
User creates gallery → Gallery object stored on-chain


Minting:

User fills mint form → Frontend validates input
Transaction sent → Smart contract creates NFT object
NFT transferred to user's wallet


Transfers:

User enters recipient → Frontend builds transaction
Ownership transferred → NFT moves to new wallet


Viewing:

Query blockchain → Fetch user's NFT objects
Display in grid → Real-time updates

## 📁 Project Structure
nft_gallery_dapp/
├── backend/                         # Smart Contract
│   ├── Move.toml                    # Package config
│   ├── README.md                    # Backend docs
│   └── sources/
│       └── nft_gallery.move         # Main contract
│
└── frontend/                        # Next.js App
    ├── app/
    │   ├── layout.tsx               # Root layout
    │   ├── page.tsx                 # Home page
    │   ├── globals.css              # Global styles
    │   └── favicon.ico
    ├── components/
    │   ├── Provider.tsx             # Blockchain provider
    │   ├── NFTGallery.tsx           # Main gallery UI
    │   └── NFTCard.tsx              # NFT display card
    ├── hooks/
    │   └── useNFT.ts                # Contract hooks
    ├── lib/
    │   └── config.ts                # Configuration
    ├── types/
    │   └── index.ts                 # TypeScript types
    ├── package.json                 # Dependencies
    ├── tsconfig.json                # TS config
    ├── tailwind.config.ts           # Tailwind config
    ├── next.config.js               # Next.js config
    └── postcss.config.js            # PostCSS config

Module Structure


nft_gallery::gallery
├── Structs
│   ├── NFT
│   │   ├── id: UID
│   │   ├── name: String
│   │   ├── description: String
│   │   ├── url: Url
│   │   └── creator: address
│   ├── Gallery
│   │   ├── id: UID
│   │   ├── owner: address
│   │   └── nft_count: u64
│   └── NFTMinted (Event)
│       ├── nft_id: address
│       ├── creator: address
│       └── name: String
└── Functions
    ├── create_gallery()
    ├── mint_nft()
    ├── transfer_nft()
    ├── burn_nft()
    ├── update_description()
    ├── get_nft_info()
    └── get_gallery_info()

## 🛠️ Technologies Used
## 🚀 Getting Started

Prerequisites
Required:

Node.js 18+ and npm
IOTA CLI 1.12.0+
IOTA Wallet (browser extension)
Git

Optional:

VS Code with Move extension
Cursor AI editor

Installation Steps
1. Clone/Navigate to Project
bashcd /mnt/e/fpt_university/Semester6/contract/nft_gallery_dapp
2. Deploy Smart Contract
bash# Navigate to backend
cd backend

# Build contract
iota move build

# Deploy to testnet
iota client publish --gas-budget 100000000

# 📝 IMPORTANT: Save the Package ID from output!
3. Setup Frontend
bash# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Update configuration with your Package ID
nano lib/config.ts
# Change: PACKAGE_ID = "YOUR_PACKAGE_ID_HERE"

# Start development server
npm run dev
```

#### 4. Open Application
```
Open: http://localhost:3000
Quick Start Workflow
bash# Terminal 1: Backend
cd backend
iota move build
iota client publish --gas-budget 100000000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev

# Browser
# Open http://localhost:3000
# Connect wallet
# Create gallery
# Start minting NFTs!

## 📜 Contract Address

https://explorer.iota.org/object/0xd7ac830368a546c3214a4bb3c3951378e84322f883ef897bb03e7ca59167ab2e?network=testnet

![alt text](image.png)


