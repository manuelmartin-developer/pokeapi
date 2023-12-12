import { useEffect, useRef } from "react";
import styles from "./SearchInput.module.scss";
import { useDebounce } from "../../../helpers/useDebounce";
import { usePokemonStore } from "../../../store/pokemon";
import { PokemonsResponse } from "../../../helpers/pokemon.dto";

const SearchInput = () => {
  // Constants
  const PAGE_SIZE = 200;

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // store
  const { setPokemons, search, setSearch, setHasMorePages, setPage } =
    usePokemonStore();

  // Debounce
  const debouncedSearchInput = useDebounce(search || "", 400);

  // Methods
  const onGetPokemonsBySearch = async (search: string) => {
    if (!search) return;

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_PATH
        }/pokemon?size=${PAGE_SIZE}&page=1&search=${search}`
      );

      const data: PokemonsResponse = await response.json();
      setPokemons(data.pokemons);
      setHasMorePages(data.hasMorePages);
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  // Component Lifecycle
  useEffect(() => {
    onGetPokemonsBySearch(debouncedSearchInput);
  }, [debouncedSearchInput]);

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        name="text"
        className={styles.container_input}
        id="input"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search || ""}
      />
      {search && (
        <span className={styles.container_icon} onClick={() => setSearch(null)}>
          x
        </span>
      )}
    </div>
  );
};

export default SearchInput;
