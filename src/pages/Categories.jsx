import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Carousel from '../components/Carousel';
import ArticleCard from '../components/ArticleCard';

export default function Categories({ articles }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract unique categories from articles
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    setCategories(uniqueCategories);
    setLoading(false);
  }, [articles]);

  // Group articles by category
  const articlesByCategory = categories.reduce((acc, category) => {
    acc[category] = articles.filter(article => article.category === category);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Categories</h1>
      
      {categories.map((category, index) => (
        <motion.section 
          key={category}
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">{category}</h2>
            <Link href={`/category/${category.toLowerCase()}`}>
              <motion.span 
                className="text-sm font-medium text-black dark:text-white hover:underline cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View all
              </motion.span>
            </Link>
          </div>
          
          <Carousel>
            {articlesByCategory[category].map(article => (
              <div key={article.id} className="px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <ArticleCard article={article} />
              </div>
            ))}
          </Carousel>
        </motion.section>
      ))}
    </div>
  );
} 