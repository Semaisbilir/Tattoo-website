'use client';

import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function Gallery(){
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

    /*Tabs */
    const [activeTab, setActiveTab] = useState("fijian");

    return(
        <>
        <main className="bg-black text-[#CCCCCC] dark:bg-[#E0E0E0] dark:text-[#1C1C1C] min-h-screen">
                      <Header toggleDarkMode={() => setDarkMode(!darkMode)} isDarkMode={darkMode} />
                        <section className='flex flex-col justify-center items-center p-5 text-center'>
                            <h2 className='font-[Cinzel] text-5xl mb-8'>
                            No Regrets <span className='dark:text-amber-700 text-amber-300'> Gallery</span>
                            </h2>
                        </section>

                        <section className="w-full">
                            <div className="relative right-0">
                                <div className="w-full">
                                    <div className="relative right-0">
                                        {/*Menu Tabs */}
                                        <ul className="relative flex flex-wrap px-1.5 py-1.5 mx-5 list-none rounded-md bg-slate-100" data-tabs="tabs" role="list">
                                            
                                            {/* Fijian-Polynesian */}
                                            <li className="z-30 flex-auto text-center">
                                                <a 
                                                onClick={() => setActiveTab("fijian")}
                                                className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit
                                                ${activeTab === "fijian" ? "bg-white" : ""}`}
                                                data-tab-target=""
                                                role="tab"
                                                aria-selected="true"
                                                aria-controls="fijian"
                                                >
                                                    <span className="ml-1 font-[Cinzel] font-extrabold text-xl">Fijian-Polynesian</span>
                                                </a>
                                            </li>

                                            {/* Black and Grey */}
                                            <li className="z-30 flex-auto text-center">
                                                <a
                                                onClick={() => setActiveTab("black")}
                                                className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit
                                                ${activeTab === "black" ? "bg-white" : ""}`}
                                                data-tab-target=""
                                                role="tab"
                                                aria-selected="false"
                                                aria-controls="black"
                                                >
                                                    <span className="ml-1 font-[Cinzel] font-extrabold text-xl">Black & Grey</span>
                                                </a>
                                            </li>

                                            {/* Lettering */}
                                            <li className="z-30 flex-auto text-center">
                                                <a
                                                onClick={() => setActiveTab("lettering")} 
                                                className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit
                                                ${activeTab === "lettering" ? "bg-white" : ""}`}
                                                data-tab-target=""
                                                role="tab"
                                                aria-selected="false"
                                                aria-controls="lettering"
                                                >
                                                    <span className="ml-1 font-[Cinzel] font-extrabold text-xl">Lettering</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div data-tab-content="" className="p-5">
                                    {/* Fijian */}
                                    
                                {activeTab === "fijian" && (
                                    <div id="fijian" role="tabpanel" className="block opacity-100">

                                        <div className="fijianContent flex justify-center items-center px-40 text-lg font-[Outfit]">
                                        <p>Step into a world where every line tells a story, every patterns honors the past.This gallery showcases the sacred art of Fijian and Polynesian tattooing - <span className="italic">tatau</span> - an ancient tradition woven into the cultural fabric of Oceania. From symbols of strength and status, each design pulses with meaning. Let the ink guide you through identity, heritage, and resilience in ink and spirit. </p>
                                    </div>
                                        <div role="tabpanel"
                                        className="grid w-full grid-cols-3 gap-4 p-4 font-sans text-base antialiased font-light leading-relaxed text-gray-700 h-max"
                                        data-value="html"
                                        >
                                            <div>
                                                <img

                                                className="w-full h-full lg:h-32 max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996279/1_pzplkk.jpg" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img 

                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996280/3_j6farr.jpg" 

                                                alt="" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996281/4_rdxqdh.jpg" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996282/5_f8tcu3.jpg" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996283/6_uh0pns.jpg" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996292/14_jd1q4m.png" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                    {/* Black and Grey */}
                                    {activeTab === "black" && (
                                    <div id="black" role="tabpanel" className="block opacity-100">
                                        <div 
                                        role="tabpanel"
                                        className="grid w-full grid-cols-3 gap-4 p-4 font-sans text-base antialiased font-light leading-relaxed text-gray-700 h-max"
                                        data-value="html">
                                            <div>
                                                <img
                                                className="w-full h-full max-h-9/12 max-w-full rounded-lg"
                                                src="/images/gallery-tattoos/black/1.jpg" 
                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-h-9/12 max-w-full rounded-lg"
                                                src="/images/gallery-tattoos/black/2.png" 
                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-h-9/12 max-w-full rounded-lg"
                                                src="/images/gallery-tattoos/black/3.png" 
                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996070/4_vnuay4.png" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996070/5_fqbi2i.png" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>

                                            <div>
                                                <img
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996070/6_najync.jpg" 

                                                alt="Fijian Polynesian arm tattoo" />
                                            </div>
                                        </div>
                                    </div>
                                    )}

                                    {/* Lettering */}
                                    {activeTab === "lettering" && (
                                    <div className="hidden opacity-0" id="lettering" role="tabpanel">
                                        <div 
                                        role="tabpanel"
                                        className="grid w-full grid-cols-3 gap-4 p-4 font-sans text-base antialiased font-light leading-relaxed text-gray-700 h-max"
                                        data-value="html"
                                        >
                                            <div>
                                                <img 
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="/images/gallery-tattoos/36.jpg" 
                                                alt="" />
                                            </div>

                                            <div>
                                                <img 
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996337/22_znrpb9.png" 
                                                alt="" />
                                            </div>

                                            <div>
                                                <img 
                                                className="w-full h-full max-w-full rounded-lg"
                                                src="/images/gallery-tattoos/30.jpg" 
                                                alt="" />
                                            </div>
                                        </div>

                                    </div>
                                    )}
                                </div>
                            </div>
                        </section>
        </main>
        </>
    )
}