'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  isRTL?: boolean;
}

export default function TypewriterText({ text, delay = 200, isRTL = false }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const words = text.split(' ');
    let currentIndex = 0;
    setDisplayText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayText((prev) => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span 
      className={`
        ${isComplete ? 'after:hidden' : 'after:inline-block'} 
        after:w-0.5 after:h-5 after:bg-primary after:ml-0.5 after:animate-blink
        ${isRTL ? 'block text-right' : ''}
      `}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {displayText}
    </span>
  );
}