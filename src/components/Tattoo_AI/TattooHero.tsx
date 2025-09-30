import "./TattooHero.css"
import Link from "next/link";






type Props = {
    onStart: () => void
}




export default function TattooHero({onStart}: Props){
    return (
        <>
         <div className="relative w-full h-1/2 min-h-[525px] overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <video className="w-full h-full object-cover"
                src="https://res.cloudinary.com/dnkzcvqxc/video/upload/v1754103789/AI-Hero_mrbeeg.mp4"
                autoPlay
                loop
                muted
                playsInline>
                </video>
            </div>
            <div className='hero-btn absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-20 flex justify-center pb-6'>
            <button
                onClick = {onStart}
                className="try-btn">  
                        <span className="mix-blend-difference relative z-10 text-base">
                            <div  className="flex justify-center items-center gap-2 mix-blend-difference relative z-10  text-2xl
                            sm:text-lg
                            md:text-xl
                            lg:text-2xl
                            xl:text-3xl
                            xl:text-4xl">
                            Try Now
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                            </svg>
                            </div>
                        </span>
                          
                </button>
            </div>
        </div>
        </>
    );
}
        {/* <div className="relative w-full h-1/2 min-h-[525px] overflow-hidden aspect-video">
            <video className="absolute top-0 left-0 w-full h-full object-cover"
            src="https://res.cloudinary.com/dnkzcvqxc/video/upload/v1754103789/AI-Hero_mrbeeg.mp4"
            autoPlay
            loop
            muted
            playsInline>
            </video> 
            <div className='hero-btn absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center'>
                <button
                onClick = {onStart}
                className="try-btn">  
                Try now
                </button>
            </div>
        </div>
       
        </>
    );
} */}