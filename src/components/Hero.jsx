import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3")',
            filter: 'brightness(0.6)'
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Explore the World
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Discover amazing places, share experiences, and create unforgettable memories
          </p>
          
          <div className="flex justify-center gap-4">
            <button
              className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Exploring
            </button>
            <button
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 