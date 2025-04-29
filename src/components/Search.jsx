import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function Search({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Debounce search to avoid excessive filtering
    const timer = setTimeout(() => {
      const results = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, articles]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
        <svg 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black dark:text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {searchTerm && (
        <motion.div 
          className="absolute z-10 w-full mt-2 bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-lg max-h-96 overflow-y-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isSearching ? (
            <div className="p-4 text-center text-black dark:text-white">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map(article => (
                <li key={article.id}>
                  <Link href={`/article/${article.id}`}>
                    <div className="p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer border-b border-black dark:border-white last:border-b-0">
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm mt-1 line-clamp-1">{article.excerpt}</p>
                      <div className="flex items-center mt-2 text-xs">
                        <span className="mr-2">{article.category}</span>
                        <span>•</span>
                        <span className="ml-2">{article.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-black dark:text-white">
              No results found
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
} 