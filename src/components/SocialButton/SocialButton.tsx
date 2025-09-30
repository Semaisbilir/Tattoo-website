import Link from "next/link";

export default function SocialButton(){
    return(
        <>
            <div className="flex items-center gap-4 mt-10 cursor-pointer">
                <div className="social-button">
                    {/*Instagram */}
                    <Link href="https://www.instagram.com/tabuatattoo/?igsh=MWF5ZGN2bnZsN25lMA%3D%3D#" target='_blank'>
                        <button className="relative w-12 h-12 rounded-full group cursor-pointer">
                            <div
                            className="floater w-full h-full absolute top-0 left-0 dark:bg-[#bdc1c7] bg-amber-300 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                            ></div>
                            <div
                            className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-transparent rounded-full"
                            >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            >
                            <path
                            className="  dark:fill-black fill-white dark:hover:fill-black  duration-300"
                            d="M21.94 6.46809C21.8884 5.2991 21.6994 4.49551 21.4285 3.79911C21.1492 3.05994 20.7194 2.39818 20.1564 1.84802C19.6062 1.28932 18.9401 0.855163 18.2094 0.580194C17.5091 0.309437 16.7096 0.120336 15.5407 0.0688497C14.363 0.0128932 13.9891 0 11.0022 0C8.01527 0 7.64141 0.0128932 6.46808 0.064466C5.29914 0.116039 4.49551 0.305225 3.79932 0.57581C3.05994 0.855163 2.39818 1.28494 1.84802 1.84802C1.28932 2.39813 0.855377 3.06428 0.580193 3.7949C0.309437 4.49551 0.120379 5.2948 0.0688496 6.4637C0.0129362 7.64141 0 8.01527 0 11.0022C0 13.9891 0.0129362 14.363 0.0644659 15.5363C0.116039 16.7053 0.305225 17.5089 0.576025 18.2053C0.855377 18.9444 1.28932 19.6062 1.84802 20.1564C2.39818 20.7151 3.06432 21.1492 3.79494 21.4242C4.49547 21.6949 5.29476 21.884 6.46391 21.9355C7.63702 21.9873 8.0111 22 10.998 22C13.9849 22 14.3588 21.9873 15.5321 21.9355C16.7011 21.884 17.5047 21.695 18.2009 21.4242C18.9321 21.1415 19.5961 20.7091 20.1505 20.1548C20.7048 19.6005 21.1373 18.9365 21.42 18.2053C21.6906 17.5047 21.8798 16.7052 21.9314 15.5363C21.9829 14.363 21.9958 13.9891 21.9958 11.0022C21.9958 8.01527 21.9914 7.64137 21.94 6.46809ZM19.9588 15.4503C19.9114 16.5248 19.731 17.105 19.5805 17.4918C19.2109 18.4502 18.4502 19.2109 17.4918 19.5805C17.105 19.731 16.5206 19.9114 15.4503 19.9586C14.29 20.0103 13.942 20.023 11.0066 20.023C8.07118 20.023 7.71881 20.0103 6.56259 19.9586C5.48816 19.9114 4.90796 19.731 4.52117 19.5805C4.04425 19.4043 3.61014 19.1249 3.25772 18.7596C2.89242 18.4029 2.61306 17.9731 2.43677 17.4961C2.28635 17.1094 2.10589 16.5248 2.05874 15.4547C2.007 14.2943 1.99428 13.9461 1.99428 11.0107C1.99428 8.07535 2.007 7.72298 2.05874 6.56698C2.10589 5.49254 2.28635 4.91235 2.43677 4.52555C2.61306 4.04842 2.89241 3.61439 3.26211 3.26189C3.61865 2.89658 4.04842 2.61723 4.52555 2.44115C4.91235 2.29073 5.49692 2.11023 6.56697 2.06291C7.72736 2.01134 8.07556 1.99844 11.0107 1.99844C13.9505 1.99844 14.2985 2.01134 15.4547 2.06291C16.5292 2.11027 17.1093 2.29069 17.4961 2.44111C17.9731 2.61723 18.4072 2.89658 18.7596 3.26189C19.1249 3.61865 19.4042 4.04842 19.5805 4.52555C19.731 4.91235 19.9114 5.49671 19.9587 6.56698C20.0103 7.72736 20.0232 8.07535 20.0232 11.0107C20.0232 13.9461 20.0104 14.29 19.9588 15.4503Z"
                            ></path>
                            <path
                            className="dark:fill-black fill-white dark:hover:fill-black duration-300"
                            d="M11.0026 5.35054C7.88252 5.35054 5.35107 7.88182 5.35107 11.0021C5.35107 14.1223 7.88252 16.6536 11.0026 16.6536C14.1227 16.6536 16.6541 14.1223 16.6541 11.0021C16.6541 7.88182 14.1227 5.35054 11.0026 5.35054ZM11.0026 14.668C8.97844 14.668 7.33654 13.0264 7.33654 11.0021C7.33654 8.97774 8.97844 7.33609 11.0025 7.33609C13.0269 7.33609 14.6685 8.97774 14.6685 11.0021C14.6685 13.0264 13.0268 14.668 11.0026 14.668ZM18.1971 5.12706C18.1971 5.85569 17.6063 6.44646 16.8775 6.44646C16.1489 6.44646 15.5581 5.85569 15.5581 5.12706C15.5581 4.39833 16.1489 3.80774 16.8775 3.80774C17.6063 3.80774 18.1971 4.39829 18.1971 5.12706Z"
                            ></path>
                        </svg>
                    </div>
                    </button>
                    </Link>
                    </div>

                    {/*YouTube */}
                    <div className="social-button">
                    <button className="relative w-12 h-12 rounded-full group cursor-pointer">
                    <div
                    className="floater w-full h-full absolute top-0 left-0 dark:bg-[#bdc1c7] bg-amber-300 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                    ></div>
                    <div
                    className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-transparent rounded-full"
                    >
                    
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                    <path
                    className="fill-white dark:fill-black duration-300"
                    d="M23.498 6.186a2.998 2.998 0 0 0-2.112-2.112C19.938 3.5 12 3.5 12 3.5s-7.938 0-9.386.574A2.998 2.998 0 0 0 .502 6.186 31.58 31.58 0 0 0 0 12a31.58 31.58 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.112 2.112C4.062 20.5 12 20.5 12 20.5s7.938 0 9.386-.574a2.998 2.998 0 0 0 2.112-2.112A31.58 31.58 0 0 0 24 12a31.58 31.58 0 0 0-.502-5.814ZM9.75 15.5v-7l6 3.5-6 3.5Z"
                    />

                    </svg>
                    </div>
                    </button>
                    </div>

                    {/*Email */}
                    <div className="social-button">
                    <button className="relative w-12 h-12 rounded-full group cursor-pointer">
                    <div
                    className="floater w-full h-full absolute top-0 left-0 dark:bg-[#bdc1c7] bg-amber-300 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                    ></div>
                    <div
                    className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-transparent rounded-full"
                    >
                    <svg
                        height="32"
                        width="32"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        className="dark:fill-black fill-white dark:hover:fill-black duration-300"
                        d="M28 5H4c-1.104 0-2 .896-2 2v18c0 1.104.896 2 2 2h24c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2zm0 4.879L16 18 4 9.879V7l12 8 12-8v2.879zM4 23V11.885l11.446 7.63c.269.18.594.274.921.274s.652-.094.92-.274L28 11.885V23H4z"
                        fill="#FFFFFF"
                        ></path>
                    </svg>
                    </div>
                    </button>
                    </div>
                    </div>

        </>
    );
}