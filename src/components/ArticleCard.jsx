import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

// Animation variants
const cardHover = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function ArticleCard({ article }) {
  const { author = {} } = article;
  const { avatar = 'default-avatar.png', name = 'Unknown Author' } = author;

  return (
    <motion.article
      className="bg-white dark:bg-black border-2 border-black dark:border-white overflow-hidden"
      variants={cardHover}
      whileHover="hover"
    >
      <Link href={`/article/${article.id}`}>
        <div className="cursor-pointer">
          <motion.div 
            className="relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-3 right-3">
              <span className="bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded">
                {article.category}
              </span>
            </div>
          </motion.div>
          
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-black dark:text-white">{article.title}</h3>
            <p className="text-sm text-black dark:text-white mb-4">{article.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={avatar} 
                  alt={name} 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm text-black dark:text-white">{name}</span>
              </div>
              <span className="text-xs text-black dark:text-white">{article.readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
