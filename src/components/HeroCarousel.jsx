import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useFeaturedArticles } from '@/hooks/useArticles';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCarousel() {
  const { data: articles = [], isLoading, error } = useFeaturedArticles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const [, setLocation] = useLocation();

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  
  useEffect(() => {
    if (articles.length <= 1 || !isAutoPlaying) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [articles.length, isAutoPlaying]);
  
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  if (isLoading) {
    return (
      <section className="relative h-[600px] bg-muted animate-pulse rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">Loading featured articles...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative h-[600px] bg-muted rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-destructive">Error loading featured articles</div>
        </div>
      </section>
    );
  }
  
  if (articles.length === 0) {
    return (
      <section className="relative h-[600px] bg-muted rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">No featured articles available</div>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      className="relative h-[600px] overflow-hidden rounded-lg bg-card"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="h-full">
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article) => (
            <div key={article.id} className="w-full h-full flex-none relative">
              <div className="relative w-full h-full">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                  <div className="max-w-4xl">
                    <Button
                      variant="outline"
                      className="mb-4 hover:bg-background/20"
                      onClick={() => setLocation(`/?category=${article.category.toLowerCase()}`)}
                    >
                      {article.category}
                    </Button>
                    
                    <Link href={`/articles/${article.id}`}>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white hover:underline">
                        {article.title}
                      </h2>
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-6 md:mb-8">
                      <span>By {article.authorName}</span>
                      <span>•</span>
                      <span>{article.submissionDate}</span>
                      <span>•</span>
                      <span>{article.readingTime} min read</span>
                    </div>
                    
                    <Button asChild variant="default" className="group">
                      <Link href={`/articles/${article.id}`}>
                        Read Article
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {articles.map((_, index) => (
            <button 
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-4" 
                  : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}