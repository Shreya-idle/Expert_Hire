import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Article from './pages/Article';
import Bookmarks from './pages/Bookmarks';
import BackToTop from './components/BackToTop';
import ThemeProvider from './context/ThemeContext';

// Sample data for articles
const sampleArticles = [
  {
    id: 1,
    title: "Ultimate Guide to Backpacking Europe",
    excerpt: "Everything you need to know about planning your European adventure...",
    content: "Full article content here...",
    category: "Guides",
    readingTime: "15 min",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    author: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  },
  {
    id: 2,
    title: "How to Travel on a Budget",
    excerpt: "Learn the secrets of budget travel without compromising on experiences...",
    content: "Full article content here...",
    category: "Guides",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
    author: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  },
  {
    id: 3,
    title: "Adventures in Southeast Asia",
    excerpt: "Exploring the hidden gems of Thailand, Vietnam, and Cambodia...",
    content: "Full article content here...",
    category: "Travels",
    readingTime: "12 min",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    author: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  },
  {
    id: 4,
    title: "Road Trip Through America",
    excerpt: "From coast to coast: A journey through the United States...",
    content: "Full article content here...",
    category: "Travels",
    readingTime: "20 min",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    author: {
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  },
  {
    id: 5,
    title: "Tokyo: A City of Contrasts",
    excerpt: "Exploring the blend of tradition and modernity in Japan's capital...",
    content: "Full article content here...",
    category: "Cities",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    author: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  },
  {
    id: 6,
    title: "The Magic of Paris",
    excerpt: "Discovering the city of love, lights, and endless inspiration...",
    content: "Full article content here...",
    category: "Cities",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    author: {
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=6"
    }
  },
  {
    id: 7,
    title: "Best Street Food in Bangkok",
    excerpt: "A culinary journey through Bangkok's vibrant street food scene...",
    content: "Full article content here...",
    category: "Food",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
    author: {
      name: "Lisa Wong",
      avatar: "https://i.pravatar.cc/150?img=7"
    }
  },
  {
    id: 8,
    title: "Italian Cuisine: From Rome to Naples",
    excerpt: "Exploring the rich flavors and traditions of Italian cooking...",
    content: "Full article content here...",
    category: "Food",
    readingTime: "12 min",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    author: {
      name: "Marco Rossi",
      avatar: "https://i.pravatar.cc/150?img=8"
    }
  },
  {
    id: 9,
    title: "Hidden Beaches of Thailand",
    excerpt: "Discovering Thailand's most secluded and beautiful beaches...",
    content: "Full article content here...",
    category: "Beaches",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    author: {
      name: "Tom Brown",
      avatar: "https://i.pravatar.cc/150?img=9"
    }
  },
  {
    id: 10,
    title: "Caribbean Paradise: A Beach Guide",
    excerpt: "Your ultimate guide to the Caribbean's most stunning beaches...",
    content: "Full article content here...",
    category: "Beaches",
    readingTime: "15 min",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62",
    author: {
      name: "Maria Garcia",
      avatar: "https://i.pravatar.cc/150?img=10"
    }
  },
  {
    id: 11,
    title: "Mountain Adventures in Nepal",
    excerpt: "Trekking through the world's most majestic mountains...",
    content: "Full article content here...",
    category: "Mountains",
    readingTime: "18 min",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    author: {
      name: "David Lee",
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  },
  {
    id: 12,
    title: "Swiss Alps: A Winter Wonderland",
    excerpt: "Exploring the breathtaking beauty of the Swiss Alps...",
    content: "Full article content here...",
    category: "Mountains",
    readingTime: "14 min",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
    author: {
      name: "Anna Schmidt",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  }
];

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <Header articles={sampleArticles} />
        <main className="pt-16">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/categories">
              <Categories articles={sampleArticles} />
            </Route>
            <Route path="/article/:id">
              {(params) => <Article id={params.id} articles={sampleArticles} />}
            </Route>
            <Route path="/bookmarks" component={Bookmarks} />
          </Switch>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App; 