import React, { useState } from "react";

export default function TravelGuide() {
  const [isLoading, setIsLoading] = useState(false);

  const guides = [
    { id: 1, title: "Mystery of Asia", price: 29, image: "/images/asia.jpg" },
    { id: 2, title: "Mystery of Europe", price: 29, image: "/images/europe.jpg" },
    { id: 3, title: "Mystery of Australia", price: 29, image: "/images/australia.jpg" },
    { id: 4, title: "Mystery of Africa", price: 29, image: "/images/africa.jpg" },
    { id: 5, title: "Mystery of USA", price: 29, image: "/images/usa.jpg" },
  ];

  const handleBuyClick = () => {
    setIsLoading(true);
    // Simulate loading for purchase (e.g., calling API or redirecting)
    setTimeout(() => {
      alert("Thank you for your purchase!");
      setIsLoading(false);
    }, 1500); // Simulate a 1.5 second loading time
  };

  return (
    <section className="py-8 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col">
        <h2 className="text-center text-lg font-serif mb-6">
          Find your complete guide to everywhere you need to visit
        </h2>

        <div className="flex gap-4 overflow-x-auto pr-20">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="min-w-[140px] max-w-[140px] bg-white text-black text-center border border-gray-300 rounded-lg shadow-md transform transition-all hover:scale-105 duration-300"
            >
              <div className="h-[160px] overflow-hidden rounded-t-lg">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-sm font-semibold leading-tight">{guide.title}</p>
                <p className="text-sm my-1">${guide.price}</p>
                <button
                  onClick={handleBuyClick}
                  disabled={isLoading}
                  className={`bg-black text-white text-xs px-3 py-1 w-full rounded-md ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800 transition-all duration-300"
                  }`}
                >
                  {isLoading ? "Processing..." : "Buy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
