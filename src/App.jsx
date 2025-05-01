import { useState } from 'react';
import { Router, Route } from 'wouter';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import CategoryFilter from './components/CategoryFilter';
import ArticleCard from './components/ArticleCard';
import Sidebar from './components/Sidebar';
import StoryDetail from './components/StoryDetail';
import Categories from './pages/Categories';
import { useArticlesByCategory, useArticleById, useAllCategories } from './hooks/useArticles';

function HomePage({ searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: categories = [] } = useAllCategories();
  const { data: articles = [], isLoading } = useArticlesByCategory(selectedCategory);

  const filteredArticles = Array.isArray(articles) ? articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) : [];

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-muted-foreground">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <HeroCarousel />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Recent Articles</h2>
          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No articles found for your search.
              </div>
            )}
          </div>
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pb-16">
          <Route path="/">
            <HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/articles/:id">
            {({ id }) => {
              const { data: article, isLoading } = useArticleById(id);
              if (isLoading) {
                return (
                  <div className="container mx-auto p-4 text-center py-12 text-muted-foreground">
                    Loading article...
                  </div>
                );
              }
              if (!article) {
                return (
                  <div className="container mx-auto p-4 text-center py-12 text-muted-foreground">
                    Article not found
                  </div>
                );
              }
              return (
                <div className="container mx-auto p-4">
                  <button
                    onClick={() => window.history.back()}
                    className="mb-8 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back
                  </button>
                  <StoryDetail article={article} />
                </div>
              );
            }}
          </Route>
          <Route path="/about">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">About Me</h1>
              <Sidebar />
            </div>
          </Route>
          <Route path="/contact">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Contact</h1>
              <p className="text-muted-foreground">Follow me on Instagram: @MothersDayTributes</p>
            </div>
          </Route>
        </main>
        <footer className="bg-muted py-6 mt-auto">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>Copyrights 2025. All Rights Reserved.</p>
            <p>Follow me on Instagram: @MothersDayTributes</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}