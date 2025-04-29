import { useAllArticles } from "@/hooks/useArticles";
import { useState } from "react";

export default function Sidebar() {
  const { data: articles = [] } = useAllArticles();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  
  // Sort articles by date for popular articles
  const popularArticles = [...articles]
    .sort((a, b) => b.readingTime - a.readingTime)
    .slice(0, 4);

  const popularDestinations = [
    "Europe", "Asia", "Americas", "Africa"
  ];
  
  return (
    <div className="space-y-8">
      {/* Author Profile */}
      <div className="bg-white dark:bg-black border-2 border-black dark:border-white">
        <div className="text-center p-8">
          <div className="relative w-28 h-28 mx-auto mb-5">
            <img
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3"
              alt="Author"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <h3 className="text-xl font-serif mb-2 text-black dark:text-white">World Explorer</h3>
          <p className="text-black dark:text-white mb-5 text-sm">
            Documenting journeys and sharing travel stories from around the globe.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
              Instagram
            </a>
            <a href="#" className="text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white dark:bg-black border-2 border-black dark:border-white">
        <div className="p-8">
          <h3 className="text-xl font-serif mb-6 text-black dark:text-white">Popular Destinations</h3>
          <div className="space-y-1">
            {popularDestinations.map((destination) => (
              <a 
                key={destination}
                href="#" 
                className="block px-3 py-2 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {destination}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Planner */}
      <div className="bg-white dark:bg-black border-2 border-black dark:border-white">
        <div className="p-8">
          <h3 className="text-xl font-serif mb-4 text-black dark:text-white">Plan Your Journey</h3>
          <p className="text-sm text-black dark:text-white mb-6">Discover your next destination</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-black dark:text-white mb-2">
                Where to?
              </label>
              <input
                type="text"
                placeholder="e.g. Tokyo, Japan"
                className="w-full px-3 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder-black dark:placeholder-white focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-black dark:text-white mb-2">
                Departure
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-black dark:text-white mb-2">
                Return
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white focus:outline-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border-2 border-black dark:border-white"
            >
              Explore
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}