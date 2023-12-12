import { motion, useInView } from "framer-motion";
import { Pokemon } from "../../../helpers/pokemon.dto";
import styles from "./PokemonItem.module.scss";
import { Link } from "react-router-dom";
import { usePokemonStore } from "../../../store/pokemon";
import { useRef } from "react";
import Chip from "../../ui/chip";

const PokemonItem: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  // Constants
  const { id } = pokemon;

  // Refs
  const cardRef = useRef<HTMLLIElement>(null);

  // Hooks
  const isCardInView = useInView(cardRef, { once: true });

  // Store
  const { setPokemonSelected } = usePokemonStore();
  return (
    <motion.li
      className={styles.item}
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      style={{
        opacity: isCardInView ? 1 : 0,
        transform: isCardInView ? "translateY(0)" : "translateY(20px)"
      }}
      onClick={() => setPokemonSelected(pokemon)}
    >
      <Link to={`/${id}`} className={styles.item__link}>
        <motion.div
          layoutId={`pokemon-${id}`}
          className={styles.item_container}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.item_container_image}>
            <motion.img
              layoutId={`pokemon-${id}-image`}
              src={pokemon.image}
              alt={pokemon.name}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className={styles.item_container_image__id}
              layoutId={`pokemon-${id}-id`}
            >
              ID/{id}
            </motion.div>
          </div>
          <div className={styles.item_container_content}>
            <motion.h3
              className={styles.item_container_content__name}
              layoutId={`pokemon-${id}-name`}
              transition={{ duration: 0.5 }}
            >
              {pokemon.name}
            </motion.h3>
            <div className={styles.item_container_content__types}>
              {pokemon.type &&
                pokemon.type.map((type, i) => <Chip key={i} category={type} />)}
            </div>
            {pokemon.evolutedFrom && (
              <div className={styles.item_container_content__evoluted}>
                <p className={styles.item_container_content__evoluted__text}>
                  Evoluciona de:
                </p>
                <p className={styles.item_container_content__evoluted__name}>
                  {pokemon.evolutedFrom}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.li>
  );
};

export default PokemonItem;
