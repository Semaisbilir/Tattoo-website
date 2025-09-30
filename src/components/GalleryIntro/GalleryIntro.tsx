import './gallery-intro.css';

import Link from "next/link";

export default function GalleryIntro(){
    const images = [
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996279/1_pzplkk.jpg", alt: "Black and white fijian arm tattoo" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996248/2_vccbrw.jpg", alt: "Flying eagle arm tattoo in color" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996317/3_riy9mp.jpg", alt: "Black and white upper arm script tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996281/4_rdxqdh.jpg", alt: "Fijian - Polynesian arm tattoo in color"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996250/5_y61w7y.jpg", alt: "Blade and rose arm tattoo in color" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996320/6_twu4wp.jpg", alt: "Black and white upper arm script tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996285/7_shcp0a.jpg", alt: "Fijian - Polynesian arm tattoo in color" },
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996292/14_jd1q4m.png", alt: "Black and white stingray back tattoo "},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996287/9_axhsri.jpg", alt: "Fijian - Polynesian arm tattoo in color"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996325/10_kniiig.jpg", alt: "Black and white upper arm script tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996326/11_ndse1n.jpg", alt: "Black and white upper arm script tattoo"},
        { src: "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996327/12_wfyurr.jpg", alt: "Black and white upper arm script tattoo"},
    ]

    const columns = [0, 1, 2, 3].map(col => images.slice(col * 3, col * 3 + 3))

    return(
        <section className="dark:bg-[#e9e9e9] pb-15 pt-24">
{/*         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
        <path className="fill-white dark:fill-[#FFD700]" fillOpacity="1" d="M0,160L1440,0L1440,0L0,0Z"></path>
        </svg> */}
        <div className="max-w-6xl mx-auto text-center">
            <h1 className="flex justify-center items-center font-subheading text-white dark:text-[#1C1C1C] py-10
            text-2xl
            sm:text-2xl
            md:text-2xl
            lg:text-3xl
            xl:text-4xl
            2xl:text-5xl">
                The Art of Tattoo
            </h1>
        </div>

        {/*Home Page Gallery */}

        <section className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 max-w-5xl pb-10 mx-auto'>
            {columns.map((colImages, i) => (
                <div key={i} className='grid gap-4 max-w-2xl sm:max-w-sm'>
                    {colImages.map((img, j) => (
                        <img 
                            key={j}
                            className='h-auto max-w-full transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0'
                            src={img.src}
                            alt={img.alt}
                        />
                    ))}
                </div>
            ))}
        </section>

        <div className="max-w-6xl mx-auto text-center">
            {/*Button*/}
            <button className="relative overflow-hidden rounded-full bg-black px-3 py-1 mt-6 text-white uppercase transition-all duration-200 ease-in-out hover:[--progress:0] cursor-pointer">
                          <span className="mix-blend-difference relative z-10 text-base">
                            <Link href="/tattoos" className="flex justify-center items-center gap-2 mix-blend-difference relative z-10 text-base">
                            Stories in Skin
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
                              background: 'linear-gradient(90deg, #e9e9e9 25%, transparent 0, transparent 50%, #e9e9e9 0, #e9e9e9 75%, transparent 0)',
                            }}
                          />
                          <span
                            className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-200 ease-in-out"
                            style={{
                              transform: 'translateY(calc(-1 * var(--progress, 100%)))',
                              background: 'linear-gradient(90deg, transparent 0, transparent 25%, #e9e9e9 0, #e9e9e9 50%, transparent 0, transparent 75%, #e9e9e9 0)',
                            }}
                          />
            </button>
        </div>
        </section>
    );
}

