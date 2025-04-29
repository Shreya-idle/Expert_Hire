import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useFeaturedArticles } from "@/hooks/useArticles";

export default function HeroCarousel() {
  const { data: articles = [] } = useFeaturedArticles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  
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
    // Reset timer when manually navigating
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  
  // Setup auto-playing carousel
  useEffect(() => {
    if (articles.length <= 1 || !isAutoPlaying) return;
    
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set up a new interval
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
    
    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [articles.length, isAutoPlaying]);
  
  // Pause auto-play on hover
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);
  
  // Show loading state while articles are being fetched
  if (articles.length === 0) {
    return (
      <section className="relative h-[600px] bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading featured articles...</div>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      className="relative h-[600px] bg-black overflow-hidden"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="h-full">
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article) => (
            <div key={article.id} className="carousel-item flex-none w-full h-full relative">
              {/* Main slide content */}
              <div className="relative w-full h-full">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover" 
                />
                {/* Black overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white">
                  <div className="max-w-4xl">
                    {/* Category tag */}
                    <div className="mb-4">
                      <Link href={`/?category=${article.category.toLowerCase()}`}>
                        <span className="inline-block text-xs uppercase tracking-wider text-white border border-white/30 px-3 py-1.5 hover:bg-white/10 transition-colors">
                          {article.category}
                        </span>
                      </Link>
                    </div>
                    
                    {/* Title */}
                    <Link href={`/articles/${article.id}`}>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight hover:underline">
                        {article.title}
                      </h2>
                    </Link>
                    
                    {/* Author and metadata */}
                    <div className="flex flex-wrap items-center text-sm text-white/80 mb-6 md:mb-8">
                      <span>By {article.authorName}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(article.submissionDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readingTime} min read</span>
                    </div>
                    
                    {/* Read more button */}
                    <Link href={`/articles/${article.id}`}>
                      <span className="inline-flex items-center text-sm font-medium group cursor-pointer">
                        READ ARTICLE
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-3 text-white z-10 transition-colors"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-3 text-white z-10 transition-colors"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {articles.map((_, index) => (
            <button 
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}