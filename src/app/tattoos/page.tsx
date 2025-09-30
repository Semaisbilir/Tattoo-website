'use client';

import { motion } from 'framer-motion';

import Link from 'next/link';

import { useEffect, useState } from 'react';

export default function Work(){
     const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const leftColumn ={
        hidden: { x: -100, opacity: 0},
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut"} },
    };

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

  /*Timeline */
  const timelineData = [
    {
      /* Fijian-Polynesian*/
      title: 'Fijian-Polynesian',
      description: 'Step into a world where every line tells a story, every patterns honors the past.This gallery showcases the sacred art of Fijian and Polynesian tattooing - an ancient tradition woven into the cultural fabric of Oceania. From symbols of strength and status, each design pulses with meaning. Let the ink guide you through identity, heritage, and resilience in ink and spirit.',
      images: ['https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996281/4_rdxqdh.jpg'],
      button: <button className="relative overflow-hidden rounded-full bg-black px-3 py-6 mt-6 text-white uppercase transition-all duration-200 ease-in-out hover:[--progress:0] cursor-pointer">
                          <span className="mix-blend-difference relative z-10 text-base">
                            <Link href="/gallery-fijian" className="flex justify-center items-center gap-2 mix-blend-difference relative z-10 text-base">
                            Gallery
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                            </svg>
                            </Link>
                        </span>
                          <span
                            className="pointer-events-none absolute inset-0 z-0 transition-transform duration-200 ease-in-out"
                            style={{
                              transform: 'translateY(var(--progress, 100%))',
                              background: 'linear-gradient(90deg, #fff 25%, transparent 0, transparent 50%, #fff 0, #fff 75%, transparent 0)',
                            }}
                          />
                          <span
                            className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-200 ease-in-out"
                            style={{
                              transform: 'translateY(calc(-1 * var(--progress, 100%)))',
                              background: 'linear-gradient(90deg, transparent 0, transparent 25%, #fff 0, #fff 50%, transparent 0, transparent 75%, #fff 0)',
                            }}
                          />
                        </button>
    },
    {
      /*Black and Grey */
      title: 'Black and Grey',
      description: 'Whether you are drawn to the elegance of monochrome or the storytelling in shadows, our gallery showcases the artistry and versatility of black and grey ink at its finest - from soft shading to bold line-work, this style captures everything from realism and portraiture to surreal and abstract designs.',
      images: ['https://res.cloudinary.com/dnkzcvqxc/image/upload/v1755106716/WhatsApp_Image_2025-08-13_at_09.28.14_3bc143a7_lovcvf.jpg'],
      button: <button className="relative overflow-hidden rounded-full bg-black px-3 py-6 mt-6 text-white uppercase transition-all duration-200 ease-in-out hover:[--progress:0] cursor-pointer">
                          <span className="mix-blend-difference relative z-10 text-base">
                            <Link href="/gallery-bk" className="flex justify-center items-center gap-2 mix-blend-difference relative z-10 text-base">
                            Gallery
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                            </svg>
                            </Link>
                        </span>
                          <span
                            className="pointer-events-none absolute inset-0 z-0 transition-transform duration-200 ease-in-out"
                            style={{
                              transform: 'translateY(var(--progress, 100%))',
                              background: 'linear-gradient(90deg, #fff 25%, transparent 0, transparent 50%, #fff 0, #fff 75%, transparent 0)',
                            }}
                          />
                          <span
                            className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-200 ease-in-out"
                            style={{
                              transform: 'translateY(calc(-1 * var(--progress, 100%)))',
                              background: 'linear-gradient(90deg, transparent 0, transparent 25%, #fff 0, #fff 50%, transparent 0, transparent 75%, #fff 0)',
                            }}
                          />
                        </button>
    },
    {
      /*Lettering */
      title: 'Lettering - script',
      description: 'Words carry power—and when etched in ink, they become timeless expressions of identity, emotion, and belief. Our lettering tattoo gallery showcases the art of typography in its boldest form, from elegant scripts and gothic fonts to minimalist lines and custom calligraphy. Whether it is a name, a mantra, or a message that moves you, these designs prove that sometimes, the most powerful tattoos are the ones that speak.',
      images: ['https://res.cloudinary.com/dnkzcvqxc/image/upload/v1755186517/WhatsApp_Image_2025-08-13_at_09.28.14_c0faf061_bhdo2t.jpg'],
      button: <button className="relative overflow-hidden rounded-full bg-black px-3 py-6 mt-6 text-white uppercase transition-all duration-200 ease-in-out hover:[--progress:0] cursor-pointer">
                          <span className="mix-blend-difference relative z-10 text-base">
                            <Link href="/gallery-script" className="flex justify-center items-center gap-2 mix-blend-difference relative z-10 text-base">
                            Gallery
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                            </svg>
                            </Link>
                        </span>
                          <span
                            className="pointer-events-none absolute inset-0 z-0 transition-transform duration-200 ease-in-out"
                            style={{
                              transform: 'translateY(var(--progress, 100%))',
                              background: 'linear-gradient(90deg, #fff 25%, transparent 0, transparent 50%, #fff 0, #fff 75%, transparent 0)',
                            }}
                          />
                          <span
                            className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-200 ease-in-out"
                            style={{
                              transform: 'translateY(calc(-1 * var(--progress, 100%)))',
                              background: 'linear-gradient(90deg, transparent 0, transparent 25%, #fff 0, #fff 50%, transparent 0, transparent 75%, #fff 0)',
                            }}
                          />
                        </button>
    },
  ];

  /*Mini galleries */
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);


    return (
        <>

        <main className="bg-black text-[#CCCCCC] dark:bg-[#e9e9e9] dark:text-[#1C1C1C] min-h-screen">

            <section className='flex flex-col justify-center items-center p-5 text-center'>
                
                <h2 className='flex justify-center font-subheading text-white dark:text-black mb-
                  text-2xl
                  sm:text-2xl
                  md:text-2xl
                  lg:text-3xl
                  xl:text-4xl
                  2xl:text-5xl'>
                    Skin and Story
                </h2>
                
                <div className='flex flex-col md:flex-row items-center gap-12 max-w-4xl pt-10'>
                    <div className='flex-1 hidden md:block'>
                        {/*Andrew's profile work image */}
                        <motion.div 
                        className="relative w-80 h-116 bg-white dark:bg-black rounded-bl-[45%] flex justify-end items-center"
                        variants={leftColumn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3}}
                        >
                            <img className="absolute -right-20 w-75 h-85 object-cover rounded-bl-[45%] shadow-lg" src="/images/andrew-2.jpg" alt="andrew tattooing" />
                        </motion.div>
                    </div>

                    <div className='flex-1 leading-relaxed text-white dark:text-[#1C1C1C] text-justify
                    text-base
                    sm:text-base
                    md:text-lg
                    lg:text-xl
                    xl:text-2xl
                    2xl:text-2xl'>
                        <p>
                            I began my tattooing journey in 2005, but the roots of my craft go back to my upbringing in Fiji - Tattooing is more than just an art form; it is my way of staying connected to culture, ancestry and identity.
My work carries the spirit of Fijian and Polynesian culture, something deeply personal and not easily found elsewhere. 
                        </p>
                    </div>

                </div>
            </section>

            {/*Timeline */}
            <section>
              <div className='bg-black dark:bg-[#e9e9e9] text-white dark:text-[#1C1C1C] py-12 px-4'>
                <div className='relative max-w-4xl mx-auto'>
                  <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 dark:bg-[#0B0B0B] bg-amber-300'></div>

                  {/*Timeline */}
                  {timelineData.map((item, index) => {
                    const isLeft = index % 2 === 0;

                    return(
                      
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className={`mb-12 flex w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center`}
                    >

                        <div className={`w-1/2 px-4 ${isLeft ? 'text-left' : 'text-right'}`}>
                          <div className='relative bg-[#0B0B0B] dark:bg-gray-500 p-6 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-transform hover:scale-105 duration-300 '>
                            <p className='flex justify-center items-center font-subheading font-bold text-white dark:text-white
                            text-base
                            sm:text-2xl
                            md:text-2xl
                            lg:text-3xl
                            xl:text-4xl
                            2xl:text-4xl
                            '>{item.title}</p>
                            <p className='text-white dark:text-white font-extralight leading-relaxed *:text-base
                              sm:text-base
                              md:text-base
                              lg:text-lg
                              xl:text-xl
                              2xl:text-2xl'>{item.description}</p>

                            {/*Small image*/}
                            <div className='mt-4 grid grid-cols-1 gap-2'>
                              {item.images?.map((src, i) => (
                                <motion.img
                                  key={i}
                                  src={src}
                                  alt={`tattoo ${item.year}`}
                                  className='h-full max-h-52 w-full object-cover rounded-md'
                                  whileHover={{ scale:1.05 }}
                                >
                                  
                                </motion.img>
                              ))}
                            </div>

                            {/*Button to its respective gallery */}
                            {item.button}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>
        </main>
        </>
    );
}