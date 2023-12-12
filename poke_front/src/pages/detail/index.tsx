import { useEffect, useState } from "react";
import { Pokemon } from "../../helpers/pokemon.dto";
import styles from "./DetailView.module.scss";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { usePokemonStore } from "../../store/pokemon";
import Chip from "../../components/ui/chip";
import { useNavigate } from "react-router-dom";

const DetailView = () => {
  // Hooks
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
    window.scrollTo(0, 0);
    onGetPokemonDetails();
  }, [id]);

  return (
    <motion.div
      layoutId={`pokemon-${pokemonSelected?.id}`}
      className={styles.item_detail}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.item_detail__back}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => navigate(-1)}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          className={styles.item_detail__back_arrow}
        >
          <path
            d="M10 0L0 10L10 20L11.6667 18.3333L4.33333 11H20V9H4.33333L11.6667 1.66667L10 0Z"
            fill="#3E3E3E"
          />
        </svg>
        Volver al listado
      </motion.div>
      <motion.div className={styles.item_detail_container}>
        <motion.div className={styles.item_detail_container_hero}>
          <motion.img
            layoutId={`pokemon-${pokemonSelected?.id}-image`}
            className={styles.item_detail_container_hero__image}
            src={pokemon?.image}
            alt={pokemon?.name}
            transition={{ duration: 0.5 }}
          />
          <div className={styles.item_detail_container_hero_title}>
            <motion.h2
              className={styles.item_detail_container_hero_title__name}
              transition={{ duration: 0.5 }}
            >
              {pokemon?.name}
            </motion.h2>
            <motion.div
              className={styles.item_detail_container_hero_title__types}
              transition={{ duration: 0.5 }}
            >
              {pokemon?.type &&
                pokemon?.type.map((type, i) => (
                  <Chip key={i} category={type} dark />
                ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          style={{
            height: "1px",
            marginBottom: "1rem",
            backgroundColor: "#3e3e3e"
          }}
        ></motion.div>
        <motion.div
          className={styles.item_detail_container_content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>{pokemon?.description}</p>
          <motion.table
            className={styles.item_detail_container_content_info}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <tbody>
              <tr>
                <td>Altura</td>
                <td>{pokemon?.profile?.height}</td>
              </tr>
              <tr>
                <td>Peso</td>
                <td>{pokemon?.profile?.weight}</td>
              </tr>
              <tr>
                <td>Salud</td>
                <td>{pokemon?.base?.HP}</td>
              </tr>
              <tr>
                <td>Ataque</td>
                <td>{pokemon?.base?.Attack}</td>
              </tr>
              <tr>
                <td>Defensa</td>
                <td>{pokemon?.base?.Defense}</td>
              </tr>
            </tbody>
          </motion.table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DetailView;
