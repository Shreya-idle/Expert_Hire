import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BookmarkButton({ article }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Check if article is bookmarked on component mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.some(bookmark => bookmark.id === article.id));
  }, [article.id]);
  
  // Toggle bookmark status
  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== article.id);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } else {
      // Add to bookmarks
      bookmarks.push({
        id: article.id,
        title: article.title,
        image: article.image,
        category: article.category,
        date: new Date().toISOString()
      });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };
  
  return (
    <div className="relative">
      <motion.button
        onClick={toggleBookmark}
        className="p-2 border-2 border-black dark:border-white rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        {isBookmarked ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        )}
      </motion.button>
      
      {showTooltip && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-md whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {isBookmarked ? "Added to bookmarks" : "Removed from bookmarks"}
        </motion.div>
      )}
    </div>
  );
} 