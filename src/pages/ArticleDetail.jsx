import React from 'react';
import { useParams, useLocation } from 'wouter';
import { useArticleById } from '../hooks/useArticles';

export default function ArticleDetail() {
  const { id } = useParams();
  const { data: article, isLoading, error } = useArticleById(id);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (error || !article) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">{article.title}</h1>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <span>By {article.author}</span> | <span>{new Date(article.date).toLocaleDateString()}</span> | <span>{article.category}</span> | <span>{article.readingTime} min read</span>
      </div>
      <article className="prose dark:prose-dark max-w-none text-black dark:text-white">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  );
}
