'use client';

import { motion } from 'framer-motion';

interface FadeInParagraphProps {
  text: string;
  isRTL?: boolean;
}

export default function FadeInParagraph({ text, isRTL = false }: FadeInParagraphProps) {
  return (
    <motion.p
      className={`mb-4 text-paragraph ${isRTL ? 'text-right' : ''}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {text}
    </motion.p>
  );
}