"use client"

import React from "react"

interface VidCardProps {
  videoSrc: string
  text: string
}

const VidCard: React.FC<VidCardProps> = ({ videoSrc, text }) => {
  return (
    <div className="relative group m-10 rounded-2xl overflow-hidden shadow-lg">
      {/* Video */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full  object-cover z-10 transition duration-500 group-hover:blur-md"
      />

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xl font-semibold opacity-0 cursor-pointer group-hover:opacity-100 transition duration-500 ">
        {text}
      </div>
    </div>
  )
}

export default VidCard
