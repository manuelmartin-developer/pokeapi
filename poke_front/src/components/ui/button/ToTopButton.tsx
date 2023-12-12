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
      up
    </motion.button>
  );
};

export default ToTopButton;
