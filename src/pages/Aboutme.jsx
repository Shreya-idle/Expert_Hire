import React, { useState, useEffect } from 'react';

const articlesData = {
  1: {
    title: "10 Hidden Gems in Southeast Asia",
    author: "Jaspreet Bhamrai",
    date: "April 15, 2025",
    category: "Destinations",
    readingTime: "7 min read",
    image: "/api/placeholder/800/400",
    content: (
      <>
        <p>Southeast Asia is known for its popular tourist destinations like Bangkok, Bali, and Phuket. However, beyond these well-trodden paths lie hidden gems waiting to be discovered by adventurous travelers.</p>
        <p>In this article, I'll share with you 10 lesser-known destinations in Southeast Asia that offer authentic experiences without the crowds.</p>
        <h3>1. Koh Rong Samloem, Cambodia</h3>
        <p>While most travelers head to Siem Reap or Phnom Penh, this secluded island offers pristine beaches and crystal-clear waters. With limited development, it's the perfect place to disconnect and enjoy nature at its best.</p>
        <h3>2. Hsipaw, Myanmar</h3>
        <p>This small town in the Shan State provides an authentic glimpse into rural Burmese life. The trek from Hsipaw to Kyaukme takes you through traditional villages and stunning landscapes.</p>
        <h3>3. Nong Khiaw, Laos</h3>
        <p>Nestled between dramatic limestone karsts along the Nam Ou River, this sleepy village offers spectacular hiking opportunities and a chance to experience traditional Lao lifestyle.</p>
        <p>The best part about these hidden gems is that they offer a glimpse into the authentic culture and lifestyle of Southeast Asia, away from the commercialization that often comes with mainstream tourism.</p>
        <p>Have you visited any of these places? Or do you have your own hidden gems to share? Let me know in the comments below!</p>
      </>
    )
  },
  2: {
    title: "How to Pack Light for Long Trips",
    author: "Jaspreet Bhamrai",
    date: "April 8, 2025",
    category: "Travel Tips",
    readingTime: "5 min read",
    image: "/api/placeholder/800/400",
    content: (
      <>
        <p>One of the biggest challenges travelers face is packing light while still having everything they need for a long trip. After years of traveling, I've mastered the art of minimalist packing, and I'm excited to share my tips with you.</p>
        <h3>The Capsule Wardrobe Approach</h3>
        <p>Start by selecting a color scheme where all items can be mixed and matched. I typically stick to neutral colors with one or two accent pieces. This allows me to create multiple outfits from just a few items.</p>
        <h3>Quality Over Quantity</h3>
        <p>Invest in high-quality, versatile pieces that can serve multiple purposes. A good merino wool t-shirt can be worn multiple times without washing and works in both casual and more formal settings.</p>
        <h3>Pack for One Week Maximum</h3>
        <p>No matter how long your trip is, pack for one week only. You can do laundry on the road, and most accommodations now offer laundry services or have facilities nearby.</p>
        <h3>Digital Minimalism</h3>
        <p>Consider which electronics are truly necessary. Do you need both a laptop and a tablet? Can your smartphone replace your camera? Limiting your electronics not only reduces weight but also stress.</p>
        <p>Remember, the less you pack, the more freedom you'll have during your travels. Plus, you'll always have room for souvenirs!</p>
      </>
    )
  },
  3: {
    title: "Food Tourism: Exploring Cultures Through Cuisine",
    author: "Jaspreet Bhamrai",
    date: "March 29, 2025",
    category: "Food & Culture",
    readingTime: "8 min read",
    image: "/api/placeholder/800/400",
    content: (
      <>
        <p>Food is a universal language that connects people across cultures. As a passionate food tourist, I've discovered that exploring local cuisines offers insights into traditions, history, and daily life that you can't get from guidebooks.</p>
        <h3>Beyond Restaurants: Finding Authentic Food Experiences</h3>
        <p>While restaurants are convenient, the most authentic food experiences often happen outside of them. Local markets, street food stalls, and home cooking classes provide deeper connections with local food culture.</p>
        <h3>The Story Behind the Dish</h3>
        <p>Every traditional dish has a story behind it. Learning about these stories—whether it's about historical influence, agricultural practices, or family traditions—enriches your appreciation of the food and the culture it represents.</p>
        <h3>Regional Variations</h3>
        <p>Even within a single country, cuisines can vary dramatically from region to region. These variations reflect differences in climate, available ingredients, historical influences, and cultural preferences.</p>
        <h3>Eating Like a Local</h3>
        <p>Observe local eating habits: When do people eat? How do they eat? With whom do they eat? These practices offer insights into social structures and values.</p>
        <p>Food tourism isn't just about tasting new flavors—it's about understanding the cultural context that created them. So on your next trip, skip the international chains and dive into local food culture. Your taste buds and cultural understanding will thank you!</p>
      </>
    )
  }
};

export default function Aboutme() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [galleryPulse, setGalleryPulse] = useState({});

  // Toggle side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Close side menu
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Toggle search modal
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Show article detail
  const showArticleDetail = (id) => {
    setActiveArticleId(id);
    window.scrollTo(0, 0);
  };

  // Back to home content
  const backToHome = () => {
    setActiveArticleId(null);
  };

  // Handle gallery image hover pulse animation
  const handleGalleryMouseEnter = (index) => {
    setGalleryPulse((prev) => ({ ...prev, [index]: true }));
  };

  const handleGalleryMouseLeave = (index) => {
    setGalleryPulse((prev) => ({ ...prev, [index]: false }));
  };

  // Animate article cards on scroll using Intersection Observer
  useEffect(() => {
    const articleCards = document.querySelectorAll('.article-card');
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    articleCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      card.style.transition = `all 0.5s ease ${index * 0.2}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeArticleId]);

  return (
    <div className="container mx-auto px-5 py-8">
      <header className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 py-5 fade-in">
        <div
          className="hamburger cursor-pointer text-3xl select-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </div>
        <div className="logo text-center flex-grow font-bold text-lg dark:text-white">
          Personal Travel Blog
        </div>
        <div
          className="search-icon cursor-pointer text-xl select-none"
          onClick={openSearchModal}
          aria-label="Open search"
        >
          🔍
        </div>
      </header>

      {/* Side Menu */}
      <nav
        className={`side-menu fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 z-50 p-6 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="close-menu absolute top-4 right-4 text-3xl cursor-pointer select-none"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ×
        </div>
        <ul className="menu-list mt-10 space-y-4 text-lg text-gray-900 dark:text-gray-100">
          <li>
            <a href="/" onClick={closeMenu} className="block hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="/aboutme" onClick={closeMenu} className="block hover:text-blue-600 dark:hover:text-blue-400">
              About Me
            </a>
          </li>
          <li>
            <a href="/articles" onClick={closeMenu} className="block hover:text-blue-600 dark:hover:text-blue-400">
              Articles
            </a>
          </li>
          <li>
            <a href="/destinations" onClick={closeMenu} className="block hover:text-blue-600 dark:hover:text-blue-400">
              Destinations
            </a>
          </li>
          <li>
            <a href="/travel-tips" onClick={closeMenu} className="block hover:text-blue-600 dark:hover:text-blue-400">
              Travel Tips
            </a>
          </li>
          <li>
            <a href="/contact" onClick={closeMenu} className="block hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="overlay fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div
          className="modal fixed inset-0 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) {
              closeSearchModal();
            }
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-content bg-white dark:bg-gray-800 rounded-lg p-8 relative max-w-lg w-full">
            <button
              className="close-modal absolute top-3 right-3 text-3xl font-bold text-gray-700 dark:text-gray-300"
              onClick={closeSearchModal}
              aria-label="Close search"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Search</h2>
            <form>
              <input
                type="text"
                placeholder="Search for articles..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="submit"
                className="read-more-btn mt-4 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!activeArticleId ? (
        <>
          <section className="about-me text-center py-10">
            <img
              src="/api/placeholder/400/320"
              alt="Profile"
              className="profile-image mx-auto rounded-lg max-w-md w-full fade-in hover:scale-105 transition-transform duration-300"
            />
            <h1 className="name text-4xl font-bold mt-6 mb-4 slide-in-left dark:text-white">
              My name is<br />
              Jaspreet Bhamrai
            </h1>
            <div className="social-links mb-6 fade-in flex justify-center space-x-4">
              <a href="#" aria-label="Facebook" className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center hover:translate-y-[-5px] transition-transform shadow-md">
                f
              </a>
              <a href="#" aria-label="Instagram" className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center hover:translate-y-[-5px] transition-transform shadow-md">
                📷
              </a>
              <a href="#" aria-label="YouTube" className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center hover:translate-y-[-5px] transition-transform shadow-md">
                ▶
              </a>
              <a href="#" aria-label="Blog" className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center hover:translate-y-[-5px] transition-transform shadow-md">
                📝
              </a>
            </div>
            <div className="divider border-t border-gray-300 dark:border-gray-700 mx-auto w-4/5 my-8 fade-in"></div>
            <p className="quote italic text-gray-600 dark:text-gray-400 fade-in mb-8">
              Some beautiful paths can't be discovered without getting lost.
            </p>
            <div className="divider border-t border-gray-300 dark:border-gray-700 mx-auto w-4/5 my-8 fade-in"></div>
            <div className="bio max-w-3xl mx-auto text-left px-4 slide-in-right dark:text-white">
              <p>
                For as long as I can remember I've been obsessed with travel. I was always that person who was forever daydreaming of foreign lands, wild unfamiliar cultures, creating path travel itineraries that would challenge my perceptions and help me gain a deeper understanding of the world.
              </p>
            </div>
            <div className="gallery flex flex-wrap justify-center gap-5 mt-10 fade-in">
              {[0, 1].map((index) => (
                <img
                  key={index}
                  src="/api/placeholder/400/320"
                  alt="Gallery"
                  className={`gallery-image max-w-[360px] w-[calc(50%-10px)] rounded-lg transition-transform duration-300 ${
                    galleryPulse[index] ? 'pulse' : ''
                  }`}
                  onMouseEnter={() => handleGalleryMouseEnter(index)}
                  onMouseLeave={() => handleGalleryMouseLeave(index)}
                />
              ))}
            </div>
            <div className="travel-tips max-w-3xl mx-auto text-left px-4 mt-10 slide-in-left dark:text-white">
              <h3 className="mb-4 text-xl font-semibold">
                To keep you on the road to safety, here are a few basic tips for motorists at rail crossings:
              </h3>
              <p>• Expect a train at any time. Trains can run anytime of day or night, on any track, in any direction.</p>
              <p>• Don't be fooled. The train is closer and faster than you think. It's easy to misjudge a train's speed and its distance, especially at night. If you see a train, just wait.</p>
              <p>• Trains can't stop quickly or swerve; be prepared to yield. After fully applying the brakes, a loaded freight train traveling at 55 miles per hour takes a mile or more to stop.</p>
              <p>• Stop and wait when gates are down or lights are flashing. Only continue across after the gates go up and red lights stop flashing. Remember: even when on foot, you should stay off railroad cars and tracks. It's illegal and very often it's deadly.</p>
              <p>
                These tips come from the safety experts at Voith Turbo, York, Pa., which manufactures a device that helps train collision braking, to make train travel even better.
              </p>
            </div>
          </section>

          {/* Articles Section */}
          <section className="articles-section py-10 fade-in">
            <h2 className="articles-heading text-3xl font-bold text-center mb-8 dark:text-white">Latest Articles</h2>
            <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              {Object.entries(articlesData).map(([id, article]) => (
                <div
                  key={id}
                  className="article-card border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => showArticleDetail(id)}
                >
                  <img src={article.image} alt={article.title} className="article-image w-full h-48 object-cover" />
                  <div className="article-content p-4">
                    <h3 className="article-title text-xl font-semibold mb-2 dark:text-white">{article.title}</h3>
                    <div className="article-meta text-sm text-gray-600 dark:text-gray-400 mb-3 flex justify-between">
                      <span>By {article.author}</span>
                      <span>{article.date}</span>
                    </div>
                    <p className="article-excerpt text-gray-700 dark:text-gray-300 mb-4">{article.content.props.children[0].props.children}</p>
                    <button
                      className="read-more-btn bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        showArticleDetail(id);
                      }}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <a href="/articles" className="view-all-btn block w-48 mx-auto text-center border-2 border-black dark:border-white text-black dark:text-white rounded-full py-3 font-bold hover:bg-black hover:text-white transition-colors">
              View All Articles
            </a>
          </section>

          {/* Instagram Section */}
          <section className="instagram my-10 fade-in">
            <div className="instagram-header flex justify-between items-center bg-black text-white px-6 py-3 rounded">
              <span>Follow me on Instagram</span>
              <span>📷</span>
            </div>
            <div className="instagram-grid flex overflow-x-auto gap-2 py-3 scroll-smooth">
              {[...Array(6)].map((_, i) => (
                <img
                  key={i}
                  src="/api/placeholder/150/150"
                  alt="Instagram post"
                  className="instagram-image min-w-[150px] h-[150px] rounded transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        // Article Detail Page
        <div id="article-detail" className="fade-in max-w-4xl mx-auto px-4 py-8">
          <button
            className="back-button bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors mb-6"
            onClick={backToHome}
          >
            ← Back to Home
          </button>
          <article className="article-detail">
            <header className="article-detail-header text-center mb-8">
              <h1 className="article-detail-title text-4xl font-bold mb-4 dark:text-white">{articlesData[activeArticleId].title}</h1>
              <div className="article-detail-meta flex justify-center gap-6 text-gray-600 dark:text-gray-400 text-sm mb-6">
                <span>{`By ${articlesData[activeArticleId].author}`}</span>
                <span>{articlesData[activeArticleId].date}</span>
                <span>{articlesData[activeArticleId].category}</span>
                <span>{articlesData[activeArticleId].readingTime}</span>
              </div>
            </header>
            <img
              src={articlesData[activeArticleId].image}
              alt={articlesData[activeArticleId].title}
              className="article-detail-image w-full max-h-[500px] object-cover rounded-lg mb-8"
            />
            <div className="article-detail-content text-lg leading-relaxed dark:text-white">
              {articlesData[activeArticleId].content}
            </div>
          </article>
        </div>
      )}
      <footer className="bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 text-center py-6 mt-10 fade-in">
        <div className="footer-logo font-bold mb-2 dark:text-white">Personal Travel</div>
        <div className="copyright text-sm text-gray-600 dark:text-gray-400 mb-4">Copyright © 2025. All rights reserved.</div>
        <nav className="footer-nav space-x-4">
          <a href="/" className="text-gray-800 dark:text-gray-200 hover:underline">Home</a>
          <a href="/aboutme" className="text-gray-800 dark:text-gray-200 hover:underline">About me</a>
          <a href="/categories" className="text-gray-800 dark:text-gray-200 hover:underline">Categories</a>
          <a href="/contact" className="text-gray-800 dark:text-gray-200 hover:underline">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
