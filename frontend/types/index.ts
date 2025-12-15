export interface NFT {
  id: string;
  name: string;
  description: string;
  url: string;
  creator: string;
}

export interface Gallery {
  id: string;
  owner: string;
  nft_count: number;
}
