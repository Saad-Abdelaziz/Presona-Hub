'use client';

import { useState } from 'react';
import FadeInParagraph from '../components/FadeInParagraph';
import { motion } from 'framer-motion';

export default function ArticleWriter() {
  const [formData, setFormData] = useState({
    title: '',
    keywords: '',
    brandName: ''
  });
  const [articleResult, setArticleResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Sanitize the form data to remove any invalid characters
      const sanitizedData = {
        title: formData.title.trim(),
        keywords: formData.keywords.trim(),
        brandName: formData.brandName.trim()
      };

      // Validate that none of the fields contain invalid characters
      if (!/^[\x20-\x7E\u0600-\u06FF\s]*$/.test(JSON.stringify(sanitizedData))) {
        throw new Error('Form contains invalid characters');
      }

      const response = await fetch('https://saadadbelaziz002.app.n8n.cloud/webhook/0f1e95c9-2d98-4165-bb8a-ab56e34f3261', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitizedData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textResponse = await response.text();
      setArticleResult(textResponse);
      console.log('Response from webhook:', textResponse);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while submitting the form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen p-8" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-primary mb-8 text-right">Article Writer</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-paragraph text-right">
              Article Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
              placeholder="Enter article title"
              dir="rtl"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="keywords" className="block text-sm font-medium text-paragraph text-right">
              Article Keywords
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
              placeholder="Enter keywords (separated by commas)"
              dir="rtl"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="brandName" className="block text-sm font-medium text-paragraph text-right">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
              placeholder="Enter brand name"
              dir="rtl"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-button-primary text-white py-3 px-6 rounded-md hover:opacity-90 transition-opacity font-medium relative"
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Make My Article</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                </div>
              </>
            ) : (
              'Make My Article'
            )}
          </button>
        </form>

        {articleResult && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-neutral" dir="rtl">
              <h2 className="text-xl font-semibold text-primary mb-4 text-right">Generated Article</h2>
              <div className="prose max-w-none">
                {articleResult.split('\n').map((paragraph, index) => (
                  <FadeInParagraph 
                    key={index} 
                    text={paragraph} 
                    index={index} 
                    isRTL={true}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}