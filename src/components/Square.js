import React from 'react';
import { motion } from 'framer-motion';

const Square = ({ value, onClick }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.button
      className="square"
      onClick={onClick}
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
    >
      {value}
    </motion.button>
  );
};

export default Square;
