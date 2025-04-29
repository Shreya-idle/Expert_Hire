import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import ArticleCard from './ArticleCard';

export default function RelatedArticles({ currentArticle, allArticles }) {
  // Find related articles based on category
  const relatedArticles = allArticles
    .filter(article => 
      article.id !== currentArticle.id && 
      article.category === currentArticle.category
    )
    .slice(0, 3); // Limit to 3 related articles
  
  // If not enough related articles by category, add some from other categories
  if (relatedArticles.length < 3) {
    const remainingCount = 3 - relatedArticles.length;
    const otherArticles = allArticles
      .filter(article => 
        article.id !== currentArticle.id && 
        article.category !== currentArticle.category &&
        !relatedArticles.some(related => related.id === article.id)
      )
      .slice(0, remainingCount);
    
    relatedArticles.push(...otherArticles);
  }
  
  if (relatedArticles.length === 0) {
    return null;
  }
  
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Related Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 