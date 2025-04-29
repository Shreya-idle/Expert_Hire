import React, { useState, useEffect } from 'react';
import Newsletter from './Newsletter';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submissions, setSubmissions] = useState([]);

  // Load submissions from localStorage on component mount
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('contactSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new submission with timestamp
    const newSubmission = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toLocaleString()
    };
    
    // Update submissions state
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    
    // Save to localStorage
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="max-w-lg mb-8">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div>
          <Newsletter />
        </div>
      </div>

      {/* Display submitted messages */}
      {submissions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Previous Messages</h2>
          <div className="space-y-4">
            {submissions.map(submission => (
              <div key={submission.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{submission.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{submission.email}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{submission.timestamp}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{submission.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact; 