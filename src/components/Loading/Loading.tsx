export default function MantaRayLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative">
        {/* Bubbles */}
        <div className="absolute left-1/2 -translate-x-1/2 bubble"></div>
        <div className="absolute left-1/3 bubble delay-200"></div>
        <div className="absolute left-2/3 bubble delay-400"></div>

        {/* Manta Ray */}
        <img src="/images/gallery-tattoos/Loading/MantaRay.png" alt="Manta" className ="MantaRay" />
      </div>

      <style jsx>{`
        /* Body Glide */
        @keyframes glide {
          0% { transform: translateX(-50px) translateY(0); }
          50% { transform: translateX(50px) translateY(-10px); }
          100% { transform: translateX(-50px) translateY(0); }
        }

        /* Wing Flap */
        @keyframes flap {
          0%, 100% { transform: rotate(4deg) scaleY(1); }
          50% { transform: rotate(-4deg) scaleY(0.95); }
        }

        /* Tail Sway */
        @keyframes sway {
          0%, 100% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
        }

        /* Bubble Rising */
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-80px) scale(0.6); opacity: 0; }
        }

         @keyframes Mrise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-10px) scale(1); opacity: 0; }
        }

        .animate-glide {
          animation: glide 4s ease-in-out infinite;
        }
        .MantaRay {
          transform-origin: 150px 75px;
          animation: Mrise 3s ease-in-out infinite;
        }
        .tail {
          transform-origin: 150px 75px;
          animation: sway 1.8s ease-in-out infinite;
        }
        .bubble {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: rise 3s ease-in-out infinite;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}
