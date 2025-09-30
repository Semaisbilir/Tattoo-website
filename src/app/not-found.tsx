// app/not-found.tsx
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not Found",
  description: "Non-existent page for this website",
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black dark:bg-white" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(60rem 60rem at -10% -10%, rgba(250,204,21,0.16), rgba(250,204,21,0) 55%),
            radial-gradient(52rem 52rem at 110% -10%, rgba(250,204,21,0.15), rgba(250,204,21,0) 56%),
            radial-gradient(64rem 64rem at -10% 110%, rgba(250,204,21,0.14), rgba(250,204,21,0) 58%),
            radial-gradient(56rem 56rem at 110% 110%, rgba(250,204,21,0.16), rgba(250,204,21,0) 58%),
            radial-gradient(36rem 36rem at 0% 50%, rgba(250,204,21,0.14), rgba(250,204,21,0) 60%),
            radial-gradient(36rem 36rem at 100% 50%, rgba(250,204,21,0.14), rgba(250,204,21,0) 60%)
          `,
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 sm:py-24 md:py-28 text-center">
        <h1 className="uppercase leading-[0.98] text-white dark:text-black font-bold text-[clamp(2.2rem,6vw,5.4rem)] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
          404 — Page Not Found
        </h1>

        <div className="mt-10 md:mt-12 lg:mt-16 text-[#E5E5E5] dark:text-[#1C1C1C]/80 font-bold text-xl md:text-2xl lg:text-3xl">
          The page you’re looking for doesn’t exist or has moved.
        </div>
      </div>
    </div>
  );
}
