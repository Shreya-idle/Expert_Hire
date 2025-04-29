import { useParams } from 'wouter';
import { articles } from '../data/articles';
import ArticleNav from '../components/ArticleNav';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-black dark:text-white">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-off-white dark:bg-black">
      <ArticleNav />
      <article className="max-w-3xl mx-auto bg-white dark:bg-black border-2 border-black dark:border-white p-8">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-96 object-cover mb-8"
        />
        
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-sm bg-black text-white dark:bg-white dark:text-black rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">{article.title}</h1>
          <div className="flex items-center text-medium-gray dark:text-medium-gray mb-6">
            <span>{article.authorName}</span>
            <span className="mx-2">•</span>
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>

        <div className="prose max-w-none text-charcoal dark:text-off-white">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}