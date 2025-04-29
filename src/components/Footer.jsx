import React from 'react';
import { Link } from "wouter";
import { useAllCategories } from "../hooks/useArticles";
import Newsletter from './Newsletter';

export default function Footer() {
  const { data: categories = [] } = useAllCategories();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">About Us</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A platform dedicated to celebrating mothers and sharing inspiring stories of motherhood.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/articles/1">
                  <a className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">Stories</a>
                </Link>
              </li>
              <li>
                <Link href="/articles/2">
                  <a className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">Health</a>
                </Link>
              </li>
              <li>
                <Link href="/articles/3">
                  <a className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400">Inspiration</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">Email: info@mothersdayblog.com</li>
              <li className="text-gray-600 dark:text-gray-300">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Newsletter />
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Mother's Day Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}