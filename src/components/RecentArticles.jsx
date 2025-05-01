import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { useAllArticles, useArticlesByCategory } from "@/hooks/useArticles";

export default function RecentArticles({ categoryFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

  // Fetch articles
  const { data: allArticles = [], isLoading: isLoadingAll } = useAllArticles();
  const { data: categoryArticles = [], isLoading: isLoadingCategory } =
    useArticlesByCategory(categoryFilter || "none");

  const articles = categoryFilter ? categoryArticles : allArticles;
  const isLoading = categoryFilter ? isLoadingCategory : isLoadingAll;

  // Pagination logic
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: document.getElementById("recent-articles").offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <section id="recent-articles" className="mt-10">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-2xl font-display font-bold">
          {categoryFilter ? `${categoryFilter} Articles` : "Recent Articles"}
        </h2>

        {categoryFilter && (
          <button
            onClick={() => window.location.href = '/'}
            className="text-sm flex items-center hover:underline text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            All Categories
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse border-b border-gray-200 py-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="aspect-[4/3] bg-gray-200 rounded"></div>
                </div>
                <div className="md:w-2/3">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : currentArticles.length === 0 ? (
        <div className="text-center py-12 border-y border-gray-200">
          <p className="text-gray-500">No articles found.</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-100">
            {currentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                readingTime={article.readingTime}
                imageUrl={article.imageUrl}
                authorName={article.authorName}
                submissionDate={article.submissionDate}
              />
            ))}
          </div>

          {/* Numbered Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2 items-center flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              >
                ← Prev
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
