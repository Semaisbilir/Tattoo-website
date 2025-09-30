"use client"

import React, { useEffect, useState, useRef } from "react"
import { TattooCanvas } from "../../components/Tattoo_AI/TattooCanvas"
import Link from "next/link"
import "./ai.css"
import axios from "axios"
import Header from "@/components/Header"
import TattooHero from "@/components/Tattoo_AI/TattooHero"
import MantaRayLoader from "@/components/Loading/Loading"
import toast from "react-hot-toast"
import SplashCursor from './Splash'
import VidCard from "@/components/Tattoo_AI/Video_Cards"
import { div } from "framer-motion/client"
import { BackgroundTextAnimation } from "@/components/Tattoo_AI/Animated-Background"
import InfiniteGallery from "@/app/tattoo-ai/InfiniteMenu"



function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      )
    }
    return false
  })

  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const [activeTab, setActiveTab] = useState("fijian")
  const [bodyImage, setBodyImage] = useState<string | null>(null)
  const [tattooImage, setTattooImage] = useState<string | null>(null)
  const [canvasData, setCanvasData] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [bodyPart, setBodyPart] = useState<string>("arm")
  const [tattooSource, setTattooSource] = useState<"upload" | "gallery" | null>("upload")

  const steps = ["Upload Body", "Choose Tattoo", "Select Area"]
  const [currentStep, setCurrentStep] = useState(0)
  // CHANGED: make bar 100% when preview is ready
  const progressPercent = previewUrl ? 100 : ((currentStep + 1) / steps.length) * 100

  const galleryImages = [
    "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996355/tattoo_test_vqghv7.webp",
    "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996354/tattoo_test_image_qkrrxl.jpg",
    "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996352/tattoo_test_2_gt8tpt.jpg",
    "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996350/Native_test1_rs6gut.png",
    "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996349/native_test_cye5vw.jpg",
    "https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996347/flowers_test_krfgjr.webp",
  ]

  

  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tattooSource === "gallery" && galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [tattooSource])

  const bodyParts = [
    "Arm (Upper)",
    "Arm (Forearm)",
    "Leg (Thigh)",
    "Leg (Calf)",
    "Chest (Left)",
    "Chest (Right)",
    "Back (Upper)",
    "Back (Lower)",
    "Shoulder (Left)",
    "Shoulder (Right)",
    "Hand",
    "Foot",
    "Neck",
    "Wrist",
    "skin",
    "jaw",
    "chin",
  ]

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (img: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setter(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleGenerate = async () => {
    if (!canvasData) return
    setLoading(true)

    const prompt = `fit the tattoo provided on the ${bodyPart} realistically remember to delete the white background and blend the tattoo with the skin tone`

    try {
      const response = await axios.post("/api/generate-preview", {
        imageData: canvasData,
        prompt,
      })

      const output = response.data.output
      toast.success("AI generation successful!")

      if (!output) {
        throw new Error("No output received from the AI backend.")
      }

      if (Array.isArray(output) && output.length > 0) {
        setPreviewUrl(output[0])
      } else if (typeof output === "string") {
        setPreviewUrl(output)
      } else {
        throw new Error("Unexpected output format from AI backend.")
      }
    } catch (err) {
      alert("Generation failed. Check the console for details.")
      console.error("AI generation error:", err)
    } finally {
      setLoading(false)
    }
  }

  const isNextDisabled =
    (currentStep === 0 && !bodyImage) || (currentStep === 1 && !tattooImage)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // restore scroll
    }
  }, [loading]);

  // ADDED: download handler (used only when previewUrl exists)
  const handleDownload = async () => {
    if (!previewUrl) return;
  
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = "tattoo_preview.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // cleanup
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Failed to download image.");
    }
  };

  return (
    <main className=" z-10 flex items-center flex-row  text-[#CCCCCC]  dark:text-[#1C1C1C] min-hs">
      {loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md ">
        <MantaRayLoader />
      </div>
    )}
    
  
      {!hasStarted ? (
        <TattooHero onStart={() => setHasStarted(true)} />

        
      ) : (


        <>
          <BackgroundTextAnimation />
      <Link href={"/shop"} className="hidden lg:block ">
      <VidCard videoSrc="https://res.cloudinary.com/dnkzcvqxc/video/upload/v1756144993/Shop_Vid_divivh.mp4" text="Click to see our shop" />
      </Link>

        <div className="z-10 w-full mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-bold text-center text-[#CCCCCC]">Try it yourself!</h1>

          <div className="mb-6">
            <div className="w-full bg-gray-300 h-2 rounded">
              {/* CHANGED: add glow gradient when previewUrl exists */}
              <div
                className={`h-2 rounded transition-all duration-300 ${
                  previewUrl ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse" : "bg-blue-500"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center ${
                    index === currentStep
                      ? "font-bold text-blue-500"
                      : index < currentStep
                      ? "text-green-600"
                      : ""
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* ADDED: hide the step UI & canvas once previewUrl exists */}
          {!previewUrl && (
            <>
              {currentStep === 0 && (
                <div className="">
            <label
                className="flex flex-col items-center justify-center w-full h-150 transition bg-black  dark:bg-[#E0E0E0] border-2 border-gray-300 border-dashed z-index-10 rounded- appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600 ">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline"> browse</span>
                        
                    </span>
                </span>
                <input className="flex items-center justify-center cursor-pointer" type="file" name="file_upload"
                onChange={(e) => handleUpload(e, setBodyImage)}/>
            </label>
        </div> )}
              

              {currentStep === 1 && (
            <div className= "justify-center">
              <div className= "flex justify-center">
              </div>
              <div className="flex justify-center gap-20 mb-2">
                <button
                  type="button"
                  onClick={() => setTattooSource("upload")}
                  className={`px-3 py-1 rounded ${
                    tattooSource === "upload"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setTattooSource("gallery")}
                  className={`px-3 py-1 rounded ${
                    tattooSource === "gallery"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  Gallery
                </button>
              </div>

              {tattooSource === "upload" && (
                <div className="">
            <label
                className="flex flex-col items-center justify-center w-full h-150 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none z-10 cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline"> browse</span>
                        
                    </span>
                </span>
                <input className="flex items-center justify-center cursor-pointer" type="file" name="file_upload"
                onChange={(e) => handleUpload(e, setTattooImage)}/>
            </label>
        </div> )}
              

              {tattooSource === "gallery" && (
<div className="transition-all duration-300 ease-in-out border rounded p-2 space-y-2">
    <p className="text-sm mb-2">Choose a tattoo:</p>
    <InfiniteGallery
      items={galleryImages.map((src) => ({ image: src }))}
  onSelect={(img) => {
    console.log("Selected tattoo:", img);
    setTattooImage(img);
  }}
    />
  </div>
)}
            </div>
          )}

              {currentStep === 2 && (
            <div className="text-[#CCCCCC]  dark:text-white">
              <label className="block font-medium mb-1 " >Select Body Part</label>
              <select
                value={bodyPart}
                onChange={(e) => setBodyPart(e.target.value)}
                className="w-full border rounded px-2 py-1 mb-5 bg-white text-black  "
              >
                {bodyParts.map((part) => (
                  <option key={part} value={part} className="mb-10em">
                    {part}
                  </option>
                ))}
              </select>

              {bodyImage && tattooImage && (
                <TattooCanvas
                  bodyImageUrl={bodyImage}
                  tattooImageUrl={tattooImage}
                  onExport={setCanvasData}
                />
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
<div className="styled-wrapper">
  <button className="back-btn"
        onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
        disabled={currentStep === 0}>
    <div className="back-btn-box">
      <span className="back-btn-elem">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="arrow-icon"
        >
          <path
            fill="cyan"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </svg>
      </span>
      <span className="back-btn-elem">
        <svg
          fill="purple"
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
</div>


            {currentStep < steps.length - 1 ? (
              <div className="sstyled-wrapper">
  <button
    className="next-btn"
    onClick={() =>
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
    disabled={isNextDisabled}
  >
    <div className="next-btn-box">
      <span className="next-btn-elem">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="arrow-icon"
        >
          <path
            fill="purple"
            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
          />
        </svg>
      </span>
      <span className="next-btn-elem">
        <svg
          fill="cyan"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="arrow-icon"
        >
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      </span>
    </div>
  </button>
</div>
            ) : (
              <button
                
                onClick={handleGenerate}
                disabled={!canvasData || loading}
                className="ai-btn"
              >
                
                {loading ? "Generating..." : "Generate Preview"}
                <div id="container-stars">
                <div id="stars"></div>
              </div>

              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              </button>
            )}
          </div>
            </>
          )}

          {previewUrl && (
            <div className = " flex flex items-center flex-col" >
              <h2 className="font-semibold mt-6 mb-2">
                <strong>AI Generated Preview:</strong>
                </h2>
              <img src={previewUrl} alt="Tattoo Preview" className="rounded w-full" />
              {/* ADDED: download button */}
              <button
                onClick={handleDownload}
                className="ai-btn mt-4 "
              >
                Keep my image
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:block ">
      <VidCard videoSrc="https://res.cloudinary.com/dnkzcvqxc/video/upload/v1755832380/0821_xqspfd.mp4" text="Hover to watch Tutorial!" />
    </div>
        </>
      )}
    
    </main>
  )
}

export default App
