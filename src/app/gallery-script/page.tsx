'use client';

import './style.css';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

export default function LetteringScriptPage(){

    const [selectedImage, setSelectedImage] = useState(null)
    
    const images = [
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996338/23_ofij5s.png", alt: "Script arm tattoo" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996337/22_znrpb9.png", alt: "Script arm tattoo" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996337/21_sta85k.jpg", alt: "Fijian full arm tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996335/20_oanah1.jpg", alt: "Script arm tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996335/19_v5c8am.jpg", alt: "Script arm tattoo" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996333/18_xqc8ub.jpg", alt: "Script arm tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996332/17_djncu6.jpg", alt: "Script name tattoo" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996330/15_stsw36.jpg", alt: "Script name tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996327/12_wfyurr.jpg", alt: "Script name tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996326/11_ndse1n.jpg", alt: "Script name tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996325/10_kniiig.jpg", alt: "Script and drawing tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996324/9_cdg7pu.jpg", alt: "Script tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996323/8_v9gncj.jpg", alt: "Number tattoo"},
    ]

    const columns = [0, 1, 2, 3].map(col => images.slice(col * 3, col * 3 + 3))

    return(
        <>
       <section className="dark:bg-[#e9e9e9] pb-15 pt-0 bg-[#000000] text-white dark:text-[#0B0B0B] relative">
        <div className="max-w-6xl mx-auto text-center">
            <h1 className="flex justify-center items-center font-subheading pb-10
            text-2xl
            lg:text-3xl
            xl:text-4xl
            2xl:text-5xl">
                Lettering - Script
            </h1>
        </div>

        {/*Fijian Polynesian Tattoo Gallery */}
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-10 max-w-6xl mx-auto'>
            {columns.map((colImages, i) => (
                <div key={i} className='grid gap-4'>
                    {colImages.map((img, j) => (
                        <img 
                            key={j}
                            className='h-auto max-w-full transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0'
                            src={img.src}
                            alt={img.alt}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
            ))}
        </section>

        {/*Enlarged Image */}
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                >

                    {/*To prevent the image to close */}
                    <motion.img
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        initial={{ scale: 0.8}}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className='max-w-[90%] max-h-[90%] rounded-lg shadow-lg cursor-pointer'
                        onClick={(e) => e.stopPropagation()}
                    >
                    </motion.img>
                </motion.div>
            )}
        </AnimatePresence>
        </section>

        {/*Back to Main Gallery Button */}
        <div className='styled-wrapper flex justify-center items-center bg-[#000000] dark:bg-[#e9e9e9] text-white dark:text-[#0B0B0B] hover:dark:text-white'>
            <Link href="/tattoos">
                <button className='btn-backTo'>
                    <div className='btn-box'>
                        <span className='btn-element'>
                            <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow-icon"
                            >
                                <path
                                    fill="gray"
                                    d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                                ></path>
                            </svg>
                        </span>

                        <span className='btn-element'>
                            <svg
                            fill="gray"
                            viewBox="0 0  24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="arrow-icon"
                            >
                                <path
                                    d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                                ></path>
                            </svg>
                        </span>
                    </div>
                </button>
            </Link>
        </div>
        </>
    )
}