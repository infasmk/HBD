import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FinalMessage: React.FC = () => {
  return (
    <motion.footer
      className="text-center pb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center gap-2 text-rose-400 mb-4 opacity-70">
        <span className="h-px w-12 bg-rose-300" />
        <Heart size={16} fill="currentColor" />
        <span className="h-px w-12 bg-rose-300" />
      </div>
      
      <p className="font-handwriting text-3xl text-slate-700">
        Happy Birthday, my love 💖
Three years ago, you became my favorite chapter —
since then, every day feels warmer because of you.
Your smile is my peace, your presence my home.
I’m grateful for us, for what we were,
what we are, and all that’s still waiting.
Today I celebrate you —
and quietly promise to love you even more. ❤️
Happy Birthday, my forever.
      </p>
    </motion.footer>
  );
};

export default FinalMessage;
