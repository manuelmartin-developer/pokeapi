import { useEffect, useState } from "react";
import { Pokemon } from "../../helpers/pokemon.dto";
import styles from "./DetailView.module.scss";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { usePokemonStore } from "../../store/pokemon";

const DetailView = () => {
  // Hooks
  const { id } = useParams<{ id: string }>();

  // Component states
  const [pokemon, setPokemon] = useState<Pokemon>();

  // Store
  const { pokemonSelected } = usePokemonStore();

  // Methods
  const onGetPokemonDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_PATH}/pokemon/${id}`
      );

      const data = await response.json();

      setPokemon(data.pokemon);
    } catch (error) {
      console.log(error);
    }
  };

  //   Component Lifecycle
  useEffect(() => {
    if (!id) return;
    onGetPokemonDetails();
  }, [id]);
  return (
    <motion.div
      layoutId={`pokemon-${pokemonSelected?.id}`}
      className={`${styles.card_content_container} ${styles.open}`}
    >
      <motion.div className={styles.card_content}>
        <motion.div className={`${styles.card_image_container} ${styles.open}`}>
          <motion.img
            layoutId={`pokemon-${pokemonSelected?.id}-image`}
            className={styles.card_image}
            src={pokemon?.image}
            alt={pokemon?.name}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DetailView;
