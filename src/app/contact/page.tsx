import Image from "next/image";
import OpenQuizButton from "../components/OpenQuizButton";
import contactLogo from "../../../public/images/contact.png";
export default function Contact() {
  return (
    <main className="bg-black text-white dark:bg-white dark:text-black">
      <section className="min-h-[50vh] flex items-center justify-center py-10 sm:py-14">
        {/* Card: móvil ocupa ~90vw; en desktop mantiene tu banner */}
        <div
          className="
            w-[92vw] max-w-lg
            sm:w-full sm:max-w-3xl
            bg-white/20 dark:bg-black/20 rounded-xl shadow-[0_6px_30px_rgba(0,0,0,.35)]
            px-5 py-8 sm:px-12 sm:py-12
          "
        >
          {/* Móvil: 1 col; Desktop: 2 cols auto-auto centradas */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] justify-center items-center gap-6 sm:gap-10">
            {/* Imagen */}
            <div className="mx-auto sm:mx-0 w-28 h-28 sm:w-44 sm:h-44 relative">
              <Image
                src={contactLogo}
                alt="Contact logo"
                fill
                sizes="(max-width: 640px) 112px, 176px"
                className="rounded-full ring-1 ring-white/15 shadow-xl object-cover"
                priority
              />
            </div>
            {/* Texto + botón */}
            <div className="flex flex-col items-center text-center">
              <h2 className="font-subheading text-[20px] sm:text-[26px] tracking-wide leading-snug mb-5 sm:mb-6">
                BOOK YOUR TATTOO
                <br />
                EXPERIENCE
              </h2>
              <OpenQuizButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}