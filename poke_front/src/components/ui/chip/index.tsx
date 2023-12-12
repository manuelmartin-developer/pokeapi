import styles from "./Chip.module.scss";

const Chip: React.FC<{ category: string; dark?: boolean }> = ({
  category,
  dark
}) => {
  return (
    <span className={`${styles.chip} ${dark ? styles.dark : ""}`}>
      {category}
    </span>
  );
};

export default Chip;
