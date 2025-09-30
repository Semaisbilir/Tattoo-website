import './footer.css';

import Link from "next/link";

export default function Footer(){
    return(
        <>
        <footer className="bg-black dark:bg-[#e9e9e9] flex flex-col justify-center items-center py-1 gap-6 ">
            <span className="flex mb-4 text-[#E0E0E0] dark:text-[#0B0B0B] font-heading justify-center p-10 font-extrabold
            text-2xl
            sm:text-xl
            md:text-2xl
            lg:text-3xl
            xl:text-4xl
            2xl:text-5xl">
                by Andrew Midtskau
            </span>

          {/*Instragram Button */}
            <Link href="https://www.instagram.com/tabuatattoo/?igsh=MWF5ZGN2bnZsN25lMA%3D%3D#" target='_blank' rel="noopener noreferrer">
                <button className="btn-ig dark:bg-black bg-gray-300">
                    <p className="button__instagram text-black dark:text-gray-300 font-[Outfit]">
                        <span style={{ '--index': 0 }}> I </span>
                        <span style={{ '--index': 1}}> N </span>
                        <span style={{ '--index': 2}}> S </span>
                        <span style={{ '--index': 3}}> T </span>
                        <span style={{ '--index': 4}}> A </span>
                        <span style={{ '--index': 5}}> G </span>
                        <span style={{ '--index': 6}}> R </span>
                        <span style={{ '--index': 7}}> A </span>
                        <span style={{ '--index': 8}}> M </span>
                    </p>

                    <div className="button__circle">
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24">
                            <path className="fill-black dark:fill-black hover:fill-black" fillOpacity="1" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                        </svg>
                    </div>
                </button>
            </Link>

            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <span className="block text-white sm:text-center dark:text-black
                text-2xl
                sm:text-lg
                md:text-xl
                lg:text-xl
                xl:text-xl
                2xl:text-xl">© 2025 
                    <Link href="/" className="hover:text-amber-300 dark:hover:text-amber-700"> Tabua Tattoo™. </Link>
                 All rights reserved.
                </span>
            </div>

        </footer>
        </>
    );
}