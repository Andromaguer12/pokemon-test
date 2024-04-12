export interface PokemonMediaCard {
  _id: string;
  mediaType: 'image' | 'video',
  link: string,
  name: string
}

export interface PokemonCard {
  _id: string;
  address: string;
  name: string;
  description: string;
  price: number;
  squareMeters: number;
  media: PokemonMediaCard[];
  createdAt?: number;
}
