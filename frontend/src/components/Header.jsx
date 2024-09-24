import { motion } from "framer-motion";

export const Header = () => {
  return (
    <div>
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-bold py-8 text-white text-center"
      >
        Expense GQL
      </motion.h1>
    </div>
  );
};
