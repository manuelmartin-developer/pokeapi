import { AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <AnimatePresence mode="popLayout">
      <main className="main">{children}</main>
    </AnimatePresence>
  );
};

export default Layout;
