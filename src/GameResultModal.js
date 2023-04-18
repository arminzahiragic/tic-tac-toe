import { motion } from "framer-motion";

export default function GameResultModal({ winner, onClose }) {
  return (
    <div className="overlay">
      <motion.div
        className="modal"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2>{winner ? `Winner: ${winner}` : "Draw"}</h2>
        <button onClick={onClose}>Close</button>
      </motion.div>
    </div>
  );
}
