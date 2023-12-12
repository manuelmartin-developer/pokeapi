import { AnimatePresence } from "framer-motion";
import styles from "./PokemonList.module.scss";
import { Pokemon } from "../../../helpers/pokemon.dto";
import PokemonItem from "../item";

const PokemonList: React.FC<{ pokemons: Pokemon[] }> = ({ pokemons }) => {
  return (
    <>
      <ul className={styles.list}>
        <AnimatePresence mode="sync">
          {pokemons &&
            pokemons.map((pokemon: Pokemon) => (
              <PokemonItem key={pokemon.id} pokemon={pokemon} />
            ))}
        </AnimatePresence>
      </ul>
      {/* {searchInput && data.length === 0 && (
        <div className={styles.list__no_results}>
          <p className={styles.list__no_results__text}>No results found</p>
        </div>
      )} */}
    </>
  );
};

export default PokemonList;
