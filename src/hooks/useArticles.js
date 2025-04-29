import { articles, categories } from "../data/articles";

export function useAllArticles() {
  return { data: articles, isLoading: false, error: null };
}

export function useArticleById(id) {
  const numericId = typeof id === 'string' ? parseInt(id) : id;
  
  if (isNaN(numericId)) {
    return { data: null, isLoading: false, error: new Error('Invalid article ID') };
  }
  
  const article = articles.find(article => article.id === numericId);
  
  if (!article) {
    return { data: null, isLoading: false, error: new Error('Article not found') };
  }
  
  return { data: article, isLoading: false, error: null };
}

export function useFeaturedArticles() {
  const featuredArticles = articles.filter(article => article.featured === true);
  return { data: featuredArticles, isLoading: false, error: null };
}

export function useArticlesByCategory(category) {
  const categoryArticles = articles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
  return { data: categoryArticles, isLoading: false, error: null };
}

export function useAllCategories() {
  return { data: categories, isLoading: false, error: null };
}