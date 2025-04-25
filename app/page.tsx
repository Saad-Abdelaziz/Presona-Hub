'use client';

import React from 'react';
import Laptop from '../assets/laptop.svg';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex-1">
      <section className="h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                AI personas to run your business
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-primary/80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Try the AI writer or automated secretary without real employees
              </motion.p>
              <motion.a
                href="/article-writer"
                className="inline-block bg-primary text-white font-medium px-8 py-4 rounded-md hover:bg-primary/90 transition-all text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Try AI Article Writer
              </motion.a>
            </motion.div>
            <motion.div 
              className="relative h-[500px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Laptop className="w-full h-full" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
