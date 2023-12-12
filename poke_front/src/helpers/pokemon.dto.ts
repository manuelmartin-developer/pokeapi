export interface Pokemon {
  id: number;
  name: string;
  description?: string;
  type: string[];
  image: string;
  evolutedFrom: string | null;
  profile?: any;
  base?: any;
}

export interface PokemonsResponse {
  pokemons: Pokemon[];
  hasMorePages: boolean;
  total: number;
}
