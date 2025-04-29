import React from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../utils/animations';

export default function CategoryCard({ category, onClick, isActive }) {
  return (
    <motion.div
      variants={cardHover}
      whileHover="hover"
      className={`
        relative overflow-hidden cursor-pointer border
        ${isActive 
          ? 'border-black dark:border-white' 
          : 'border-zinc-200 dark:border-zinc-800'}
      `}
      onClick={() => onClick(category.name)}
    >
      <div className="aspect-square">
        <img
          src={category.image}
          alt={category.name}
          className={`
            w-full h-full object-cover transition-all duration-500
            ${isActive ? '' : 'grayscale hover:grayscale-0'}
          `}
        />
        <div className={`
          absolute inset-0 flex items-center justify-center transition-colors
          ${isActive 
            ? 'bg-black/80 dark:bg-black/90' 
            : 'bg-black/40 dark:bg-black/50 hover:bg-black/60 dark:hover:bg-black/70'}
        `}>
          <div className="text-center">
            <span className="text-2xl mb-3 block">{category.icon}</span>
            <h3 className="text-sm uppercase tracking-wider font-medium text-white">{category.name}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 