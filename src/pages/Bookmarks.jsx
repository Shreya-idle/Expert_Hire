import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get bookmarks from localStorage
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    // Sort by date (newest first)
    const sortedBookmarks = storedBookmarks.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    setBookmarks(sortedBookmarks);
    setLoading(false);
  }, []);
  
  // Remove bookmark
  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };
  
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
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">My Bookmarks</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <svg 
            className="mx-auto h-16 w-16 text-black dark:text-white opacity-50" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-black dark:text-white">No bookmarks yet</h2>
          <p className="mt-2 text-black dark:text-white opacity-70">
            Articles you bookmark will appear here for easy access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <ArticleCard article={bookmark} />
              <button
                onClick={() => removeBookmark(bookmark.id)}
                className="absolute top-2 right-2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-full"
                aria-label="Remove bookmark"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 