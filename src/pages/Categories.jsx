import React, { useRef, useState } from 'react';
import { Link } from 'wouter';
import { useAllArticles } from '@/hooks/useArticles';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const SECTIONS = [
  { id: 'travel', title: 'Travel' },
  { id: 'cities', title: 'Cities' },
  { id: 'guides', title: 'Guides' }
];

export default function Categories() {
  const { data: articles = [], isLoading } = useAllArticles();
  const [selectedDate, setSelectedDate] = useState('');
  const categoryRefs = useRef({});
  
  // Group articles by category
  const categories = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});

  const scrollLeft = (category) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (category) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explore</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="pl-10 pr-4 py-2 rounded-md border bg-background text-foreground"
            />
          </div>
        </div>
      </div>

      {SECTIONS.map(({ id, title }) => {
        const sectionArticles = categories[id] || [];
        
        return (
          <section key={id} className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollLeft(id)}
                  className="bg-background/50 hover:bg-background/80"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous articles</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollRight(id)}
                  className="bg-background/50 hover:bg-background/80"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next articles</span>
                </Button>
              </div>
            </div>
            
            <div 
              ref={el => categoryRefs.current[id] = el}
              className="flex overflow-x-auto gap-6 pb-4 scroll-smooth"
            >
              {sectionArticles.map(article => (
                <article 
                  key={article.id} 
                  className="min-w-[280px] max-w-[280px] bg-card rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/articles/${article.id}`}>
                    <div className="relative aspect-video">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                        <span>{article.category}</span>
                        <span>{article.readingTime} min read</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {article.submissionDate}
                        </span>
                        <Button variant="default">
                          Read Article
                        </Button>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
              {sectionArticles.length === 0 && (
                <div className="min-w-[280px] max-w-[280px] bg-card rounded-lg p-4 text-center text-muted-foreground">
                  No articles in this category yet.
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
