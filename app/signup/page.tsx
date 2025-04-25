'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles.module.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sign up');
      }
      
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className={`text-3xl font-bold ${styles['text-primary']}`}>Create your account</h1>
          <p className={`mt-3 ${styles['text-paragraph']}`}>
            Join our community and start exploring
          </p>
        </div>
        
        <div className={`${styles.background} shadow-md rounded-lg p-8 border ${styles['border-neutral']}`}>
          {success ? (
            <div className="text-center">
              <div className="mb-4 text-green-600 text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${styles['text-primary']}`}>Sign up successful!</h2>
              <p className={`mb-4 ${styles['text-paragraph']}`}>Your account has been created.</p>
              <Link href="/" className={`${styles['button-primary']} text-white px-4 py-2 rounded-md inline-block transition-colors hover:opacity-90`}>
                Go to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className={`block mb-2 font-medium ${styles['text-primary']}`}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className={`block mb-2 font-medium ${styles['text-primary']}`}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className={`block mb-2 font-medium ${styles['text-primary']}`}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className={`block mb-2 font-medium ${styles['text-primary']}`}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${styles['button-primary']} text-white py-2 px-4 rounded-md transition-colors hover:opacity-90 flex justify-center items-center`}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
              
              <div className="mt-6 text-center">
                <p className={styles['text-paragraph']}>
                  Already have an account?{' '}
                  <Link href="/signin" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
