import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import styles from "./Layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  // router path
  const location = useLocation();
  const path = location.pathname;

  return (
    <AnimatePresence mode="popLayout">
      <span
        key="top_left_triangle"
        className={`${styles.top_left_triangle} ${
          path !== "/" ? styles.hide : ""
        }`}
      ></span>
      <span
        key="top_right_triangle"
        className={`${styles.top_right_triangle} ${
          path !== "/" ? styles.hide : ""
        }`}
      ></span>
      <span
        key="bottom_left_triangle"
        className={`${styles.bottom_left_semicircle} ${
          path !== "/" ? styles.hide : ""
        }`}
      ></span>
      <span
        key="bottom_right_triangle"
        className={`${styles.bottom_right_semicircle} ${
          path !== "/" ? styles.hide : ""
        }`}
      ></span>
      <main
        className={`${styles.main}
      ${path === "/" ? styles.home : styles.detail}
      `}
      >
        {children}
      </main>
    </AnimatePresence>
  );
};

export default Layout;
