'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';
import styles from '../styles.module.css';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className={`${styles.background} shadow-sm border-b ${styles['border-neutral']}`}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <div className="relative w-40 h-12">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  priority
                  style={{ 
                    objectFit: 'contain'
                  }}
                />
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className={`${styles['text-paragraph']} hover:${styles['text-primary']} px-3 py-2 rounded-md transition-colors`}>
              Home
            </Link>
            <Link href="/article-writer" className={`${styles['text-paragraph']} hover:${styles['text-primary']} px-3 py-2 rounded-md transition-colors`}>
              Article Writer
            </Link>
            <Link href="/about" className={`${styles['text-paragraph']} hover:${styles['text-primary']} px-3 py-2 rounded-md transition-colors`}>
              About
            </Link>
            {!session && (
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <Link href="/signin" className={`${styles['text-paragraph']} hover:${styles['text-primary']} px-4 py-2 rounded-md transition-colors border border-gray-200 hover:border-gray-300`}>
                  Sign in
                </Link>
                <Link href="/signup" className={`${styles['button-primary']} text-white hover:opacity-90 px-4 py-2 rounded-md transition-colors`}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
