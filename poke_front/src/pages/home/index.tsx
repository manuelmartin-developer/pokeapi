import { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import Spinner from "../../components/ui/spinner/Spinner";
import ToTopButton from "../../components/ui/button/ToTopButton";
import PokemonList from "../../components/pokemons/list";
import { usePokemonStore } from "../../store/pokemon";
import SearchInput from "../../components/ui/input/SearchInput";
import { PokemonsResponse } from "../../helpers/pokemon.dto";

const Home = () => {
  // Constants
  const PAGE_SIZE = 9;

  // Store
  const {
    pokemons,
    setPokemons,
    page,
    setPage,
    hasMorePages,
    setHasMorePages,
    search,
    setSearch
  } = usePokemonStore();

  // Component states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(false);

  // Methods
  const onGetInitialPokemons = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_PATH}/pokemon?size=${PAGE_SIZE}&page=1`
      );

      const data = await response.json();

      setPokemons(data.pokemons);
      setHasMorePages(data.hasMorePages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onGetMorePokemons = async () => {
    if (isLoading) return;

    const nextPage = page + 1;
    setIsLoaderActive(true);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_PATH
        }/pokemon?size=${PAGE_SIZE}&page=${nextPage}`
      );

      const data: PokemonsResponse = await response.json();

      setPokemons([...pokemons, ...data.pokemons]);
      setIsLoaderActive(false);
      setIsLoading(false);
      setHasMorePages(data.hasMorePages);
      setPage(nextPage);
    } catch (error) {
      setIsLoaderActive(false);
      setIsLoading(false);
      console.log(error);
    }
  };

  //   Component Lifecycle
  useEffect(() => {
    if (pokemons.length) return;
    onGetInitialPokemons();
  }, []);

  useEffect(() => {
    if (search !== null) return;
    setHasMorePages(true);
    setPage(1);
    setSearch("");
    onGetInitialPokemons();
  }, [search]);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isAtBottom && hasMorePages && !isLoading) {
        onGetMorePokemons();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMorePages, isLoading]);

  return (
    <div className={styles.home}>
      <section className={styles.home__search}>
        <SearchInput />
      </section>
      <section className={styles.home_list}>
        <PokemonList pokemons={pokemons} />
      </section>
      {isLoaderActive && <Spinner />}
      {!hasMorePages && (
        <div className={styles.home_list__end}>
          <p className={styles.home_list__end_text}>
            {search ? "No hay más resultados" : "No hay más pokemons"}
          </p>
        </div>
      )}
      <ToTopButton />
    </div>
  );
};

export default Home;
