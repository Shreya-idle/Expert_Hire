import React from 'react';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import ArticleCard from '../components/ArticleCard';

export default function Guides({ articles }) {
  const guides = articles.filter(article => article.category.toLowerCase() === 'guides');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Guides</h1>
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Carousel>
          {guides.map(article => (
            <div key={article.id} className="px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <ArticleCard article={article} />
            </div>
          ))}
        </Carousel>
      </motion.section>
    </div>
  );
}
