import React from 'react';
import { motion } from 'framer-motion';

const text = "You make the world a little brighter just by being in it.";

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const RevealSection: React.FC = () => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <motion.div
        className="font-handwriting text-5xl md:text-7xl text-rose-800 leading-tight"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
      
      <motion.div
        className="mt-8 text-2xl text-rose-400"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, type: "spring" }}
      >
        ✨
      </motion.div>
    </section>
  );
};

export default RevealSection;