export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: IPokemonAbility[];
  forms: Array<INamedApiResource<IPokemonForm>>;
  game_indices: IVersionGameIndex[];
  held_items: IPokemonHeldItem[];
  location_area_encounters: string;
  moves: IPokemonMove[];
  sprites: IPokemonSprites;
  species: INamedApiResource<IPokemonSpecies>;
  stats: IPokemonStat[];
  types: IPokemonType[];
  weaknesses: PokemonType[];
}

enum PokemonType {
  Normal = 'normal',
  Fire = 'fire',
  Water = 'water',
  Electric = 'electric',
  Grass = 'grass',
  Ice = 'ice',
  Fighting = 'fighting',
  Poison = 'poison',
  Ground = 'ground',
  Flying = 'flying',
  Psychic = 'psychic',
  Bug = 'bug',
  Rock = 'rock',
  Ghost = 'ghost',
  Dragon = 'dragon',
  Dark = 'dark',
  Steel = 'steel',
  Fairy = 'fairy'
}

export interface IPokemonAbility {
  is_hidden: true;
  slot: number;
  ability: INamedApiResource<IAbility>;
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonHeldItem {
  item: INamedApiResource<IItem>;
  version_details: IPokemonHeldItemVersion[];
}

export interface IPokemonHeldItemVersion {
  version: INamedApiResource<IVersion>;
  rarity: number;
}

export interface IPokemonMove {
  move: INamedApiResource<IMove>;
  version_group_details: IPokemonMoveVersion[];
}

export interface IPokemonMoveVersion {
  move_learn_method: INamedApiResource<IMoveLearnMethod>;
  version_group: INamedApiResource<IVersionGroup>;
  level_learned_at: number;
}

export interface IPokemonStat {
  stat: INamedApiResource<IStat>;
  effort: number;
  base_stat: number;
}

export interface IPokemonSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: IPokemonSpriteOther;
  versions: IPokemonSpriteVersion;
}
