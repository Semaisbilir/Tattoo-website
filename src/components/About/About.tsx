import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function About() {
    // Variants for animations
    const leftColumn: Variants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const rightColumn: Variants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <div className="about bg-black dark:bg-[#e9e9e9] pt-10">
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center gap-10 md:gap-24 lg:gap-36 xl:p-6 relative">
                {/* Left column */}
                <motion.div
                    className="relative w-80 h-116 sm:w-70 sm:h-100 md:w-80 md:h-110 bg-white dark:bg-black rounded-bl-[45%] flex justify-center items-center"
                    variants={leftColumn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Image
                        className="absolute -right-20 w-75 h-85 sm:w-70 sm:h-80 md:w-80 md:h-90 object-cover rounded-bl-[45%] shadow-lg"
                        src="https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753997383/andrew-about-2_a3mj7l.jpg"
                        alt="andrew tattooing"
                        fill
                    />
                </motion.div>

                {/* Right column */}
                <motion.div
                    className="flex flex-col text-center md:text-center lg:text-center max-w-md"
                    variants={rightColumn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="flex justify-center font-subheading text-white dark:text-black mb-6 text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        Marked by Passion
                    </h2>

                    <p className="text-gray-300 dark:text-gray-700 font-generalText text-justify text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl">
                        I take my work seriously and strive to create the best tattoos that I can. I enjoy working with
                        my clients to come up with a design that works best for them.
                    </p>

                    <Link
                        href="/tattoos"
                        className="relative overflow-hidden rounded-full bg-black px-6 py-3 mt-6 text-white uppercase transition-all duration-200 ease-in-out hover:[--progress:0] cursor-pointer flex justify-center items-center gap-2"
                    >
                        Explore My Work
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                        {/* Button hover animation layers */}
                        <span
                            className="pointer-events-none absolute inset-0 z-0 transition-transform duration-200 ease-in-out"
                            style={{
                                transform: "translateY(var(--progress, 100%))",
                                background:
                                    "linear-gradient(90deg, #e9e9e9 25%, transparent 0, transparent 50%, #e9e9e9 0, #e9e9e9 75%, transparent 0)",
                            }}
                        />
                        <span
                            className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-200 ease-in-out"
                            style={{
                                transform: "translateY(calc(-1 * var(--progress, 100%)))",
                                background:
                                    "linear-gradient(90deg, transparent 0, transparent 25%, #e9e9e9 0, #e9e9e9 50%, transparent 0, transparent 75%, #e9e9e9 0)",
                            }}
                        />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
