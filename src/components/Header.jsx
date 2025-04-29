import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/theme.jsx';
import ThemeToggle from './ThemeToggle';
import { navItemHover, fadeIn, staggerContainer } from '../utils/animations';

export default function Header() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'About Me', 'Categories', 'Contact'];

  return (
    <motion.header 
      className="bg-white dark:bg-black shadow-md fixed w-full top-0 z-50 border-b-2 border-black dark:border-white"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/">
              <a className="text-2xl font-bold text-black dark:text-white">Travel Blog</a>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-black dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-6"
            variants={staggerContainer}
          >
            {navItems.map((item) => (
              <motion.div
                key={item}
                variants={navItemHover}
                whileHover="hover"
              >
                <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}>
                  <a className="text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-2 transition-colors">
                    {item}
                  </a>
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
          </motion.nav>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}
          initial="initial"
          animate={isMenuOpen ? "animate" : "initial"}
          variants={fadeIn}
        >
          <motion.div
            className="flex flex-col space-y-4"
            variants={staggerContainer}
          >
            {navItems.map((item) => (
              <motion.div
                key={item}
                variants={fadeIn}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}>
                  <a className="text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-2 block transition-colors">
                    {item}
                  </a>
                </Link>
              </motion.div>
            ))}
            <motion.div variants={fadeIn}>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
}