import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    try {
      // In a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-6 rounded-md">
      <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Subscribe to Our Newsletter</h3>
      <p className="text-sm mb-4 text-black dark:text-white">
        Get the latest travel tips, destination guides, and exclusive content delivered to your inbox.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            disabled={status === 'loading' || status === 'success'}
          />
          <motion.button
            type="submit"
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </motion.button>
        </div>
        
        {message && (
          <motion.p 
            className={`mt-2 text-sm ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.p>
        )}
      </form>
    </div>
  );
} 