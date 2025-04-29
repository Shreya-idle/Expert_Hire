import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function ArticleNav() {
  const navItems = ['Home', 'About Me', 'Categories', 'Contact'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black border-2 border-black dark:border-white p-4 w-48 shadow-lg"
    >
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item}
            href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
          >
            <a className="block text-sm text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-2 transition-colors">
              {item}
            </a>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
} 