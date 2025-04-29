import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';

export default function Carousel({ children }) {
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredArticles = articles.filter(article => article.featured);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={carouselRef}
        className="flex overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={carouselRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {React.Children.map(children, (child) => (
          <div className={`flex-shrink-0 ${isDragging ? 'pointer-events-none' : ''}`}>
            {child}
          </div>
        ))}
      </motion.div>
      
      {/* Navigation buttons */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity"
        onClick={() => {
          if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity"
        onClick={() => {
          if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 