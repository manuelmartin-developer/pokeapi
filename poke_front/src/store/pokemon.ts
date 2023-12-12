import { create } from "zustand";
import { Pokemon } from "../helpers/pokemon.dto";

interface PokemonStore {
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;
  pokemonSelected: Pokemon | null;
  setPokemonSelected: (pokemon: Pokemon | null) => void;
  page: number;
  setPage: (page: number) => void;
  hasMorePages: boolean;
  setHasMorePages: (hasMorePages: boolean) => void;
  search: string | null;
  setSearch: (search: string | null) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  setPokemons: (pokemons) => set({ pokemons }),
  pokemonSelected: null,
  setPokemonSelected: (pokemon) => set({ pokemonSelected: pokemon }),
  page: 1,
  setPage: (page) => set({ page }),
  hasMorePages: true,
  setHasMorePages: (hasMorePages) => set({ hasMorePages }),
  search: "",
  setSearch: (search) => set({ search })
}));
