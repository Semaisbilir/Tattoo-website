"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

const QuizModal = dynamic(() => import("../../app/components/QuizModal"), { ssr: false });

export default function Location(){
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative grid grid-cols-6 gap-4 bg-[url(/images/gallery-tattoos/fijian/2.jpg)] bg-cover bg-center py-20">
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="col-span-4 col-start-2 flex flex-col items-center justify-center relative z-10 text-white gap-4">
          <h2 className=" flex mb-4 font-subheading 
                 text-2xl
                sm:text-2xl
                md:text-2xl
                lg:text-3xl
                xl:text-4xl
                2xl:text-5xl">
            Where to find Me
          </h2>
          <h3 className="font-subheading font-extralight
                sm:text-2xl
                md:text-3xl
                lg:text-3xl
                xl:text-4xl
                2xl:text-5xl pt-12">Vancouver</h3>
          <h4 className="font-subheading
                sm:text-lg
                md:text-xl
                lg:text-3xl
                xl:text-3xl
                2xl:text-2xl pt-12">Kingsway - Fraser</h4>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-6 w-full">
            <div className="flex justify-end">
              <img className="w-6 h-6" src="/images/icons/map.svg" alt="Map icon" />
            </div>
            <div className="flex items-center">
              <p className="text-xl"> Monkey King Tattoo - <br/>774 Kingsway, Vancouver, BC</p>
            </div>

            <div className="flex justify-end">
              <img className="w-6 h-6" src="/images/icons/phone.svg" alt="Phone icon" />
            </div>
            <div className="flex items-center">
              <p className="text-xl">778-839-8129</p>
            </div>

            <div className="flex justify-end">
              <img className="w-6 h-6" src="/images/icons/email.svg" alt="Email icon" />
            </div>
            <div className="flex items-center">
              <p className="text-xl">tabuatattoo@gmail.com</p>
            </div>

            <div className="flex justify-end">
              <img className="w-6 h-6" src="/images/icons/time.svg" alt="" />
            </div>
            <div className="flex items-center">
              <p className="text-xl">Take the Quiz and Schedule a time</p>
            </div>

            <div className="flex justify-end">
              <img className="hidden" src="/images/icons/time.svg" alt="Hidden icon" />
            </div>

            {/*Quiz button */}
<div className="flex items-center">
  <button
    className="
      relative overflow-hidden rounded-full bg-black
      px-3 !py-3 sm:!py-4            /* más alto, mismo ancho */
      min-h-[52px] sm:min-h-[64px]   /* asegura ‘gordito’ sin distorsión */
      mt-6 text-white uppercase
      transition-all duration-200 ease-in-out hover:[--progress:0]
      cursor-pointer
    "
  >
    <span className="mix-blend-difference relative z-10 text-base leading-none">
      <Link
        href="/gallery"
        onClick={(e) => { e.preventDefault(); setOpen(true); }}
        className="flex justify-center items-center gap-2 mix-blend-difference relative z-10 text-base leading-none whitespace-nowrap"
      >
        Schedule with Andrew
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

        </div>
      </div>

      <QuizModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
