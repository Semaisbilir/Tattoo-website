'use client';
import { useEffect, useState } from 'react';

import Hero from '@/components/Hero';
import About from '@/components/About/About';
import GalleryIntro from '@/components/GalleryIntro/GalleryIntro';
import Location from '@/components/Location/Location';

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <main className="bg-black text-[#CCCCCC] dark:bg-[#1C1C1C] dark:text-[#f5f5f5] min-h-screen">
      <Hero />
      <About />
      <GalleryIntro />
      <Location />
    </main>
  );
}
