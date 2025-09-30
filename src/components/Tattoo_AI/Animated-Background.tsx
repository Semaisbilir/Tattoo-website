"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = [
  { text: "Tattoo", font: "serif" },
  { text: "Art", font: "sans-serif" },
  { text: "Ink", font: "monospace" },
  { text: "Design", font: "cursive" },
  { text: "Style", font: "fantasy" },
  { text: "Culture", font: "serif" },
  { text: "Body", font: "sans-serif" },
];

type FloatingText = {
  id: number;
  text: string;
  font: string;
  x: number;
  y: number;
};

export const BackgroundTextAnimation = () => {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = texts[Math.floor(Math.random() * texts.length)];
      const x = Math.random() * 80; // random x %
      const y = Math.random() * 80; // random y %

      const newText: FloatingText = {
        id: idCounter,
        text: random.text,
        font: random.font,
        x,
        y,
      };

      setFloatingTexts((prev) => [...prev.slice(-6), newText]); // max 6 words
      setIdCounter((prev) => prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [idCounter]);

  return (
    <div className="absolute inset-0 h-350 overflow-hidden bg-black pointer-events-none -z-1">
      <AnimatePresence>
        {floatingTexts.map((word) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 0.3,
              scale: 0.5,
              x: ["0%", "10%", "-10%", "0%"], // drifting horizontally
              y: ["0%", "-5%", "5%", "0%"],   // drifting vertically
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="absolute text-4xl font-bold  text-white dark:text-white select-none"
            style={{
              top: `${word.y}%`,
              left: `${word.x}%`,
              fontFamily: word.font,
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
