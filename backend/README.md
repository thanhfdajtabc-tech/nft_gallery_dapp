# NFT Gallery - Smart Contract Backend

## Overview
Smart contract for minting, managing, and transferring NFTs on IOTA blockchain.

## Functions

### `create_gallery()`
Creates a personal gallery for the user to manage their NFTs.

### `mint_nft(gallery, name, description, url)`
Mints a new NFT with metadata and adds it to the user's collection.

### `transfer_nft(nft, recipient)`
Transfers NFT ownership to another address.

### `burn_nft(nft)`
Permanently destroys an NFT.

### `update_description(nft, new_description)`
Updates the description of an owned NFT.

## Deployment
```bash
iota move build
iota client publish --gas-budget 100000000
```

## Testing
```bash
iota move test
```
