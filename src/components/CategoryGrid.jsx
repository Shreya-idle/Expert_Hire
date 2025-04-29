import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { staggerContainer, scaleUp, cardHover } from '../utils/animations';

const categories = [
  { id: 1, name: 'Travels', icon: '✈️', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828' },
  { id: 2, name: 'Foods', icon: '🍜', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' },
  { id: 3, name: 'Guides', icon: '📍', image: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7' },
  { id: 4, name: 'Stories', icon: '📖', image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa' },
  { id: 5, name: 'Cities', icon: '🌆', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df' },
  { id: 6, name: 'Countries', icon: '🌎', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1' },
  { id: 7, name: 'Vlogs', icon: '🎥', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4' }
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
          variants={scaleUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore by category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover amazing travel experiences across different categories
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardHover}  
              whileHover="hover"
              className="group relative overflow-hidden rounded-xl aspect-square"
            >
              <Link href={`/category/${category.name.toLowerCase()}`}>
                <a className="block w-full h-full">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${category.image})` }}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <span className="text-4xl mb-2">{category.icon}</span>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
