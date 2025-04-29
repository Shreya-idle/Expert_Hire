import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../utils/animations';

export default function TravelGuide() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const guides = [
    {
      id: 1,
      title: "Complete Europe Travel Guide",
      description: "Comprehensive guide covering all major European destinations, local customs, and travel tips.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    },
    {
      id: 2,
      title: "Asia Explorer's Guide",
      description: "Detailed guide for exploring Asian countries, including cultural insights and must-visit locations.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa"
    },
    {
      id: 3,
      title: "Americas Travel Handbook",
      description: "Complete guide to North and South America, featuring hidden gems and local experiences.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
    }
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    console.log('Processing payment for:', selectedGuide);
    setPaymentInfo({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: ''
    });
    setSelectedGuide(null);
  };

  return (
    <section className="py-16 bg-white dark:bg-black border-y-2 border-black dark:border-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-serif mb-2 text-black dark:text-white">
            Complete Travel Guides
          </h2>
          <p className="text-sm text-black dark:text-white max-w-xl mx-auto">
            Get comprehensive travel guides for your next adventure. Each guide includes detailed information about destinations, local customs, and travel tips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              className="bg-white dark:bg-black border-2 border-black dark:border-white"
              variants={cardHover}
              whileHover="hover"
              onClick={() => setSelectedGuide(guide)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-black dark:text-white">{guide.title}</h3>
                <p className="text-black dark:text-white mb-4">{guide.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-black dark:text-white">${guide.price}</span>
                  <button
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm uppercase tracking-wider hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border-2 border-black dark:border-white"
                    onClick={() => setSelectedGuide(guide)}
                  >
                    Purchase Guide
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 max-w-md w-full">
              <h3 className="text-2xl font-serif mb-4 text-black dark:text-white">Complete Your Purchase</h3>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm text-black dark:text-white mb-2">Card Number</label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-black dark:text-white mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-black dark:text-white mb-2">CVV</label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-black dark:text-white mb-2">Name on Card</label>
                  <input
                    type="text"
                    value={paymentInfo.name}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-bold text-black dark:text-white">
                    Total: ${selectedGuide.price}
                  </span>
                  <div className="space-x-4">
                    <button
                      type="button"
                      className="bg-white dark:bg-black text-black dark:text-white px-4 py-2 text-sm uppercase tracking-wider border-2 border-black dark:border-white"
                      onClick={() => setSelectedGuide(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm uppercase tracking-wider border-2 border-black dark:border-white"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
