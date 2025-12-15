module nft_gallery::gallery {
    use iota::object::{Self, UID};
    use iota::tx_context::{Self, TxContext};
    use iota::transfer;
    use iota::url::{Self, Url};
    use std::string::String;

    /// NFT structure
    public struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        creator: address,
    }

    /// Gallery to hold user's NFTs
    public struct Gallery has key {
        id: UID,
        owner: address,
        nft_count: u64,
    }

    /// Event emitted when NFT is minted
    public struct NFTMinted has copy, drop {
        nft_id: address,
        creator: address,
        name: String,
    }

    /// Create a new gallery for user
    public entry fun create_gallery(ctx: &mut TxContext) {
        let gallery = Gallery {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            nft_count: 0,
        };
        transfer::transfer(gallery, tx_context::sender(ctx));
    }

    /// Mint a new NFT
    public entry fun mint_nft(
        gallery: &mut Gallery,
        name: String,
        description: String,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == gallery.owner, 0);

        let sender = tx_context::sender(ctx);
        let nft = NFT {
            id: object::new(ctx),
            name,
            description,
            url: url::new_unsafe_from_bytes(url),
            creator: sender,
        };

        gallery.nft_count = gallery.nft_count + 1;

        // Emit event
        // iota::event::emit(NFTMinted {
        //     nft_id: object::uid_to_address(&nft.id),
        //     creator: sender,
        //     name,
        // });

        transfer::public_transfer(nft, sender);
    }

    /// Transfer NFT to another address
    public entry fun transfer_nft(
        nft: NFT,
        recipient: address,
        _ctx: &mut TxContext
    ) {
        transfer::public_transfer(nft, recipient);
    }

    /// Burn/destroy an NFT
    public entry fun burn_nft(
        nft: NFT,
        _ctx: &mut TxContext
    ) {
        let NFT { id, name: _, description: _, url: _, creator: _ } = nft;
        object::delete(id);
    }

    /// Update NFT description
    public entry fun update_description(
        nft: &mut NFT,
        new_description: String,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == nft.creator, 0);
        nft.description = new_description;
    }

    /// Get NFT details (view function)
    public fun get_nft_info(nft: &NFT): (&String, &String, &Url, &address) {
        (&nft.name, &nft.description, &nft.url, &nft.creator)
    }

    /// Get gallery info (view function)
    public fun get_gallery_info(gallery: &Gallery): (address, u64) {
        (gallery.owner, gallery.nft_count)
    }
}
