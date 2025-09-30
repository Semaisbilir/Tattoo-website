"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const QuizModal = dynamic(() => import("./QuizModal"), { ssr: false });

export default function OpenQuizButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center justify-center gap-2
          rounded-full bg-black text-white
          border border-white/20
          px-6 py-3 text-sm sm:text-lg
          transition-all duration-300 ease-in-out
          hover:bg-white hover:text-black hover:border-white
          hover:shadow-[0_6px_20px_rgba(0,0,0,.45)]
          hover:scale-[1.03]
          focus:outline-none focus:ring-2 focus:ring-white/30
          min-w-[220px] sm:min-w-[340px]  /* móvil no se desborda, desktop largo */
          whitespace-nowrap
        "
      >
        <span>Open Booking Quiz</span>
        <span aria-hidden>→</span>
      </button>

      <QuizModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
