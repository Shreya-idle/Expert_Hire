import { useState, useEffect } from 'react';
import articlesData from '../data/articles.js'; // Import from .js file

// Hook to get all articles
export function useAllArticles() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      setData(Array.isArray(articlesData) ? articlesData : []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
}

// Hook to get articles by category
export function useArticlesByCategory(category) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      if (!Array.isArray(articlesData)) {
        throw new Error('Articles data is not an array');
      }
      if (!category || category === 'All') {
        setData(articlesData);
      } else {
        setData(articlesData.filter(article => article.category === category));
      }
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      setError(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  return { data, isLoading, error };
}

// Hook to get featured articles
export function useFeaturedArticles() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      if (!Array.isArray(articlesData)) {
        throw new Error('Articles data is not an array');
      }
      setData(articlesData.slice(0, 2));
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      setError(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
}

// Hook to get article by ID
export function useArticleById(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      if (!Array.isArray(articlesData)) {
        throw new Error('Articles data is not an array');
      }
      const article = articlesData.find(a => a.id === Number(id));
      setData(article || null);
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      setError(error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return { data, isLoading, error };
}

// Hook to get all categories
export function useAllCategories() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      if (!Array.isArray(articlesData)) {
        throw new Error('Articles data is not an array');
      }
      const categories = ['All', ...new Set(articlesData.map(article => article.category))];
      setData(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
}