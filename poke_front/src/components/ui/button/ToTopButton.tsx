import { motion } from "framer-motion";
import styles from "./ToTopButton.module.scss";
import { useEffect, useRef, useState } from "react";

const ToTopButton = () => {
  // Ref
  const buttonRef = useRef<HTMLButtonElement>(null);

  //   Component states
  const [showButton, setShowButton] = useState(false);
  const [isDragginButton, setIsDragginButton] = useState(false);

  // Methods
  const showToTopButton = () => {
    window.scrollY >= 100 ? setShowButton(true) : setShowButton(false);
  };

  // Component Lifecycle
  useEffect(() => {
    window.addEventListener("scroll", showToTopButton);
    return () => window.removeEventListener("scroll", showToTopButton);
  }, []);

  return (
    <motion.button
      data-testid="to-top-button"
      ref={buttonRef}
      className={`${styles.btn} ${showButton ? styles.show : ""}`}
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.2 }}
      onDragStart={() => setIsDragginButton(true)}
      onDragEnd={() => setTimeout(() => setIsDragginButton(false), 300)}
      onClick={() => !isDragginButton && window.scrollTo(0, 0)}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 20 20"
        fill="none"
        className={styles.item_detail__back_arrow}
        style={{ transform: "rotate(90deg)" }}
      >
        <path
          d="M10 0L0 10L10 20L11.6667 18.3333L4.33333 11H20V9H4.33333L11.6667 1.66667L10 0Z"
          fill="#3E3E3E"
        />
      </svg>
    </motion.button>
  );
};

export default ToTopButton;
