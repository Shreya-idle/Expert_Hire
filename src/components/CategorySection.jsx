import { Link } from "wouter";
import { useAllCategories } from "@/hooks/useArticles";

export default function CategorySection() {
  const { data: categories = [] } = useAllCategories();
  
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'heart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'zap':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'book-open':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        );
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Explore Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of articles across different categories celebrating motherhood
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/?category=${category.name.toLowerCase()}`}>
              <div className="bg-white rounded-lg border border-gray-100 p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 mb-4">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="text-xs text-gray-500">{category.articlesCount} Articles</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}