import Link from "next/link";

import { motion } from "framer-motion";

export default function Hero(){
    return (
        <>
        <div className="relative w-full h-1/2 min-h-[600px] overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <video className="w-full h-full object-cover"
                src="https://res.cloudinary.com/dnkzcvqxc/video/upload/v1753997505/hero-video_dvmtjm.mp4"
                autoPlay
                loop
                muted
                playsInline>
                </video>
            </div>
            <div className='hero-btn absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center pb-6'>
                <button className="relative overflow-hidden rounded-full bg-transparent px-3 py-6 mt-6 text-white uppercase transition-all duration-200 ease-in-out hover:[--progress:0] cursor-pointer">  
                        <span className="mix-blend-difference relative z-10 text-base">
                            <Link href="/" className="flex justify-center items-center gap-2 mix-blend-difference relative z-10  text-2xl
                            sm:text-lg
                            md:text-xl
                            lg:text-2xl
                            xl:text-3xl
                            2xl:text-4xl">
                            Book Now
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
            </div>
        </div>
        </>
    );
}