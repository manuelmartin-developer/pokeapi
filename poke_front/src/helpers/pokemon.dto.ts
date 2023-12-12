export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  height: string;
  weight: number;
  image: string;
  evolution: any;
}

export interface PokemonsResponse {
  pokemons: Pokemon[];
  hasMorePages: boolean;
  total: number;
}
