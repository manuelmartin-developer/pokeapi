import { motion, useInView } from "framer-motion";
import { Pokemon } from "../../../helpers/pokemon.dto";
import styles from "./PokemonItem.module.scss";
import { Link } from "react-router-dom";
import { usePokemonStore } from "../../../store/pokemon";
import { useRef } from "react";

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
      transition={{ duration: 0.3 }}
      style={{
        opacity: isCardInView ? 1 : 0,
        transform: isCardInView ? "translateY(0)" : "translateY(20px)"
      }}
      onClick={() => setPokemonSelected(pokemon)}
    >
      <Link to={`/${id}`} className={styles.item}>
        <motion.div layoutId={`pokemon-${id}`}>
          <div className={styles.item__image}>
            <motion.img
              layoutId={`pokemon-${id}-image`}
              src={pokemon.image}
              alt={pokemon.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className={styles.item__content}>
            <h3 className={styles.item__content__name}>{pokemon.name}</h3>
          </div>
        </motion.div>
      </Link>
    </motion.li>
  );
};

export default PokemonItem;
