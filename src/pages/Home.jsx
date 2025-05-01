import React, { useState } from 'react';
import { useAllArticles } from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';
import TravelGuide from '../components/TravelGuide';
import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import Sidebar from "../components/Sidebar";

// Define categories data
const categories = [
  { id: 1, name: 'Guides', icon: '📍' },
  { id: 2, name: 'Travels', icon: '✈️' },
  { id: 3, name: 'Cities', icon: '🌆' },
  { id: 4, name: 'Foods', icon: '🍜' },
  { id: 5, name: 'Stories', icon: '📖' }
];

export default function Home() {
  const { data: articles = [], isLoading } = useAllArticles();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="bg-off-white dark:bg-black min-h-screen">
      <HeroCarousel />
      <CategoryGrid />
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif mb-8 text-black dark:text-white">Latest Articles</h2>
        <div className="mb-16">
          {filteredArticles.slice(0, 4).map((article) => (
            <div key={article.id} className="px-2">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        <TravelGuide />

        <div className="mt-16">
          <h2 className="text-3xl font-serif mb-8 text-black dark:text-white">More Articles</h2>
          <Carousel>
            {filteredArticles.slice(4).map((article) => (
              <div key={article.id} className="px-2">
                <ArticleCard article={article} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder-medium-gray dark:placeholder-medium-gray focus:outline-none"
          />
        </div>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl mb-8 text-black dark:text-white">Explore by Category</h2>
          <Carousel>
            {categories.map(category => (
              <div key={category.id} className="px-2">
                <CategoryCard
                  category={category}
                  onClick={setSelectedCategory}
                  isActive={selectedCategory === category.name}
                />
              </div>
            ))}
          </Carousel>
        </section>
      </div>
    </div>
  );
}