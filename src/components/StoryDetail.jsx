import React from 'react';

const StoryDetail = ({ article }) => {
  return (
    <article className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-96 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">{article.submissionDate}</span>
            <span className="mr-4">·</span>
            <span>{article.category}</span>
          </div>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-6">{article.fullContent}</p>
          </div>
          {article.tags && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default StoryDetail; 