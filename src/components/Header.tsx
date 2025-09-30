
'use client';

import { useState } from 'react';

import Link from "next/link";

import { motion } from "framer-motion";

import SocialButton from './SocialButton/SocialButton';

type HeaderProps = {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
};
export default function Header({ toggleDarkMode, isDarkMode }: HeaderProps) {
  const listVariants ={
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20},
    visible: { opacity: 1, y: 0},
  };
  /*Toggle Hamburger Menu */
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <header className="flex flex-col justify-center items-center py-8 sm:py-2 md:py-4 lg:py-6 xl:py-8 2xl:py-10 bg-[#000000] dark:bg-[#e9e9e9] text-white dark:text-[#0B0B0B] sm:justify-between md:justify-between sm:items-center md:items-center lg:justify-between lg:items-center mx-auto">
        <motion.h1 
        className="flex font-heading
        text-2xl
        sm:text-2xl
        md:text-5xl
        lg:text-6xl
        xl:text-7xl
        2xl:text-8xl
        "
        initial="hidden"
        animate="visible"
        variants={{
          hidden:{},
          visible:{
            transition:{
              staggerChildren: 0.3,
            },
          },
        }}
        >
          <motion.span className="mr-2" 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
          >
            Tabua
          </motion.span>

          <motion.span className="ml-2"         
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}

          >
            Tattoo
          </motion.span>

        </motion.h1>
        <span className="flex mb-4 text-[#E0E0E0] dark:text-[#0B0B0B] font-subheading
        text-2xl
        sm:text-xl
        md:text-2xl
        lg:text-3xl
        xl:text-4xl
        2xl:text-5xl
        ">by Andrew Midtskau</span>
        <nav className="flex flex-col md:flex-row font-extralight
        text-4xl
        sm:text-lg
        md:text-xl
        lg:text-2xl
        ">
          {/* Toggle Menu */}
          <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse justify-center">
            <button 
            data-collapse-toggle="mega-menu" 
            type="button" 
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu"
            aria-label='Toggle hamburger menu'
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
          <motion.ul
          id="mega-menu" 
          className={`${isMenuOpen ? 'flex' : 'hidden'} gap-6 flex-col items-center md:flex md:flex-row lg:flex lg:flex-row`}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { name: "Home", href: "/"},
              { name: "Tattoo Work", href: "/tattoos" },
              { name: "Shop", href: "/shop" },
              { name: "Contact", href: "/contact" },
              { name: "Tattoo Try On", href: "/tattoo-ai"},
            ].map((link, index) => (
              <motion.li
              key={index}
              className="text-white dark:text-[#0B0B0B] hover:border-y-2"
              variants={itemVariants}
              >
                <Link href={link.href} className="block px-2">
                  {link.name}
                </Link>
                </motion.li>
            ))}
            </motion.ul>
          {/* Dark/Light Mode button */}
          <button
            onClick={toggleDarkMode}
            aria-pressed={isDarkMode}
            className="fixed bottom-6 right-6 z-50 bg-amber-300 text-[#0B0B0B] dark:bg-gray-400 dark:text-[#fef4e8] text-[24px] border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:inline-flex items-center mb-2 sm:bottom-4 sm:right-4 lg:bottom-2 lg:right-2"
          >
             {/*Mode */}
            <img src="/images/sunmoon.svg" alt="Toggle dark mode icon" loading="lazy" width="24" height="24" />
            <span className="animate-ping mx-2 h-3 w-3 rounded-full bg-[#fecea8] inline-block"></span>
          </button>
        </nav>

        <SocialButton />
      </header>
    </>
  );
}
