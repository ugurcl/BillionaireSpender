import { useEffect, useState } from "react";
import type { Celebrity } from "../../data/types";
import { motion } from "framer-motion";

type Props = {
  onSelect: (celeb: Celebrity) => void;
};

export const CelebrityMenu = ({ onSelect }: Props) => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);

  useEffect(() => {
    fetch("/data/celebrities.json")
      .then((res) => res.json())
      .then(setCelebrities);
  }, []);

 return (
  <div className="flex flex-col flex-wrap justify-center items-center min-h-screen bg-background p-6">
    <motion.h1
      className="font-semibold text-2xl md:text-5xl text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Billionaire Spender 💵
    </motion.h1>

    <div className="flex flex-wrap items-center justify-center gap-6 mt-3 lg:mt-10">
      {celebrities.map((celeb, index) => (
        <motion.div
          key={celeb.id}
          onClick={() => onSelect(celeb)}
          className="cursor-pointer bg-background/10 border border-gray-700 rounded-xl p-4 w-48 shadow-lg text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 10px rgba(255,255,255,0.2)", transition: { duration: 0.2 } }}
        >
          <img
            src={celeb.image}
            className="w-full h-44 object-cover rounded"
            alt={celeb.name}
          />
          <h2 className="text-center mt-2 font-bold">{celeb.name}</h2>
          <p className="text-center text-green-400 text-sm">
            ${celeb.wealth.toLocaleString()}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);
};
