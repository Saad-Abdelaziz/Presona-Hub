"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        email,
        password,
      });

      if (result?.ok) {
        // Handle successful sign-in (e.g., redirect to dashboard)
        console.log('Sign-in successful!');
        router.push('/'); // Redirect to home page or dashboard
      } else {
        // Handle sign-in error (e.g., display error message)
        let errorMessage = 'Sign-in failed.';
        if (result?.error) {
          errorMessage = 'Sign-in failed: ' + result.error;
        }
        console.error(errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred during sign-in:', error);
      setError('An error occurred during sign-in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className={`text-3xl font-bold ${styles['text-primary']}`}>Sign in to your account</h1>
          <p className={`mt-2 text-sm ${styles['text-paragraph']}`}>
            Or{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        <div className={`${styles.background} shadow-md rounded-lg p-8 border ${styles['border-neutral']}`}>
           {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                  {error}
                </div>
              )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            

            
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            

            
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${styles['button-primary']} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                 {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
