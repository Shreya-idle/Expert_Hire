import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="relative mb-8 py-4 overflow-x-auto">
      <div className="flex gap-2 justify-start min-w-full px-4">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'secondary'}
          onClick={() => setSelectedCategory('All')}
          className="shrink-0"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'secondary'}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "shrink-0",
              selectedCategory === category && "shadow-lg"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default CategoryFilter; 