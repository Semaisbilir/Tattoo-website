"use client";
import { useMemo, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizProgressBarComponent from "./QuizProgressBar";
import toast, { Toaster } from "react-hot-toast";
interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface QuizAnswer {
  type: "text" | "select" | "file";
  question: string;
  value: string | File[];
  options?: string[];
  extra?: string; // en file: aquí puede venir la URL de Cloudinary si ya subiste
}
interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}
const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const baseQuestions: QuizAnswer[] = [
  { type: "select", question: "Do you currently have any tattoos?", value: "", options: ["Yes", "No"] },
  { type: "text", question: "Which area(s) of your body would you like to get tattooed?", value: "" },
  { type: "file", question: "Do you have a reference image or sketch for your tattoo?", value: [], extra: "" },
  { type: "select", question: "What size would you like your tattoo to be?", value: "", options: ["Small (6 × 4 inches)", "Medium (8 × 8 inches)", "Large (more than 8 × 8 inches)"] },
  { type: "text", question: "What tattoo style are you interested in?", value: "" },
  { type: "text", question: "Do you have any allergies, skin conditions or medical issues we should know about?", value: "" }, // ← consolidada
  { type: "select", question: "How would you rate your pain tolerance?", value: "", options: ["Low", "Medium", "High"] },
  { type: "text", question: "What days of the week are you usually available?", value: "" },
];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>(baseQuestions);
  const [contact, setContact] = useState<ContactInfo>({ name: "", phone: "", email: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = answers.length + 1;
  const isQuestionRequired = (index: number) => {
  const q = answers[index];
  return q?.type !== "file";
};
  const isAnswerFilled = (q: QuizAnswer, index: number) => {
    if (!isQuestionRequired(index)) return true;
    if (q.type === "file") {
      const hasFiles = Array.isArray(q.value) && (q.value as File[]).length > 0;
      const hasText = (q.extra ?? "").trim().length > 0;
      return hasFiles || hasText;
    }
    return typeof q.value === "string" && (q.value as string).trim().length > 0;
  };
  const isContactValid = useMemo(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    return contact.name.trim() && contact.phone.trim() && emailRegex.test(contact.email);
  }, [contact]);
  const canProceed = useMemo(() => {
    if (currentStep < answers.length) return isAnswerFilled(answers[currentStep], currentStep);
    return !!isContactValid;
  }, [answers, currentStep, isContactValid]);
  const handleNext = () => {
    if (!canProceed) {
      toast.error("Please answer this question to continue.");
      return;
    }
    if (currentStep < totalSteps - 1) setCurrentStep((p) => p + 1);
  };
  const handleBack = () => currentStep > 0 && setCurrentStep((p) => p - 1);
  const handleChange = (index: number, value: string | File[], extra?: string) => {
    setAnswers((prev) =>
      prev.map((q, i) => (i === index ? { ...q, value, extra: extra ?? q.extra } : q))
    );
  };
  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };
  // -- Nuevo: Submit con FormData + toast.promise + autocierre --
// -- Submit con FormData + toasts + autocierre (incluye comentario en P3) --
const handleSubmit = async () => {
  if (!isContactValid) {
    toast.error("Please complete your contact information.");
    return;
  }
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // Extrae urls y la nota de q.extra (acepta JSON del uploader, urls sueltas o texto)
  const parseFileExtra = (extra?: string): { urls: string[]; note: string } => {
    if (!extra) return { urls: [], note: "" };
    const s = extra.trim();
    // 1) JSON de Cloudinary (secure_url/url)
    try {
      const obj = JSON.parse(s);
      const candidates = [
        obj?.secure_url,
        obj?.url,
        obj?.data?.secure_url,
        obj?.data?.url,
      ].filter((x) => typeof x === "string") as string[];
      if (candidates.length) return { urls: candidates, note: "" };
    } catch {
      // no era JSON
    }
    // 2) Mezcla de URLs + texto
    const urlRe = /(https?:\/\/[^\s")']+)/gi;
    const urls = s.match(urlRe) || [];
    const note = s.replace(urlRe, "").trim();
    return { urls, note };
  };
  // Build QA + URLs (incluye comentario del usuario en la respuesta de la P3)
  const collectedUrls: string[] = [];
  const qa = answers.map((q) => {
    let answer = "";
    if (q.type === "file") {
      const { urls, note } = parseFileExtra(q.extra);
      if (urls.length) collectedUrls.push(...urls);
      const filesCount = Array.isArray(q.value) ? (q.value as File[]).length : 0;
      const parts: string[] = [];
      if (note) parts.push(note); // :point_left: nota/comentario del usuario
      if (urls.length) {
        parts.push(`Reference links provided (${urls.length}).`);
        parts.push("No reference provided.");
      }
      answer = parts.join(" ");
    } else {
      answer = String(q.value ?? "").trim();
    }
    return { question: q.question, answer };
  });
  // Construye FormData
  const formData = new FormData();
  formData.append("qa", JSON.stringify(qa));
  formData.append("name", contact.name);
  formData.append("phone", contact.phone || "");
  formData.append("email", contact.email);
  formData.append("notes", contact.notes || "");
  if (collectedUrls.length > 0) {
    formData.append("fileUrls", JSON.stringify(collectedUrls));
  }
  // Adjunta archivos crudos (el backend los sube a Cloudinary si vienen)
  answers.forEach((q) => {
    if (q.type === "file" && Array.isArray(q.value)) {
      (q.value as File[]).forEach((f) => {
        if (f && f.size > 0) formData.append("files[]", f);
      });
    }
  });
  // Toasts
  const toastId = toast.loading("Sending submission...");
  setIsSubmitting(true);
  try {
    const res = await fetch("/api/quiz", { method: "POST", body: formData });
    if (!res.ok) {
      let msg = "Request failed";
      try {
        const err = await res.json();
        msg = err?.details?.[0] || err?.message || err?.error || msg;
      } catch {}
      throw new Error(msg);
    }
    toast.success("Submission sent successfully!", { id: toastId, duration: 4000 });
    // Deja que el usuario vea el toast y luego cierra
    await sleep(800);
    onClose?.();
    setCurrentStep(0);
    setAnswers(baseQuestions);
    setContact({ name: "", phone: "", email: "", notes: "" });
  } catch (e: any) {
    toast.error(e?.message || "Something went wrong. Please try again.", {
      id: toastId,
      duration: 5000,
    });
  } finally {
    setIsSubmitting(false);
  }
};
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black dark:bg-white text-white dark:text-black w-full h-full overflow-auto font-subheading text-sm font-extralight">
      <Toaster position="top-right" />
      {/* Cerrar */}
      <button
        className="absolute top-4 right-4 dark:text-black text-white text-2xl z-10"
        onClick={onClose}
        disabled={isSubmitting}
        aria-label="Close"
      >
        ✕
      </button>
      {/* CONTENEDOR CENTRADO: 1) contenido 2) progress 3) navegación */}
      <div className="mx-auto h-full w-full max-w-6xl px-6 md:pl-24 md:pr-10 grid grid-rows-[1fr_auto_auto]">
        {/* Fila 1: CONTENIDO CENTRADO */}
        <div className="flex items-center justify-center">
          <div className="w-full">
            {currentStep < answers.length ? (
              <QuizQuestion
                step={currentStep}
                totalSteps={totalSteps}
                question={answers[currentStep]}
                onChange={(value, extra) => handleChange(currentStep, value, extra)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-6 md:gap-10">
                <div>
                  <p className="text-sm text-neutral-500 mb-2">
                    {totalSteps}/{totalSteps}
                  </p>
                  <div className="w-full md:w-1/2 flex items-center justify-start min-h-full">
                    <h2 className="font-subheading text-3xl md:text-5xl font-bold uppercase leading-tight whitespace-nowrap">
                      Contact Info
                    </h2>
                  </div>
                </div>
                <div className="hidden md:block w-px bg-neutral-300" />
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={contact.name}
                    onChange={(e) => handleContactChange("name", e.target.value)}
                    className="w-full border-b border-white dark:border-black outline-none py-2"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={contact.phone}
                    onChange={(e) => handleContactChange("phone", e.target.value)}
                    className="w-full border-b border-white dark:border-black bg-transparent outline-none py-2"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => handleContactChange("email", e.target.value)}
                    className="w-full border-b border-white dark:border-black bg-transparent outline-none py-2"
                    required
                  />
                  <textarea
                    placeholder="Any comments or notes?"
                    value={contact.notes}
                    onChange={(e) => handleContactChange("notes", e.target.value)}
                    className="w-full border border-neutral-300 rounded px-3 py-3"
                    rows={3}
                  />
                  <p className="text-base italic text-neutral-500">
                    * Last-minute cancellations will be charged for the time booked.".
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Fila 2: PROGRESS BAR ABAJO */}
        <div className="mt-10">
          <QuizProgressBarComponent currentStep={currentStep + 1} totalSteps={totalSteps} />
        </div>
        {/* Fila 3: NAVEGACIÓN */}
        <div className="flex items-center justify-between py-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className="inline-flex items-center gap-3 text-lg md:text-xl text-white/50 dark:text-black/30 dark:hover:text-black hover:text-white disabled:opacity-90 transition"
          >
            ← <span>Back</span>
          </button>
          <button
            onClick={currentStep === totalSteps - 1 ? handleSubmit : handleNext}
            disabled={!canProceed || isSubmitting}
            className="inline-flex items-center gap-3 text-lg md:text-xl text-white dark:text-black hover:text-white dark:hover:text-black disabled:opacity-50 transition"
          >
            <span>{currentStep === totalSteps - 1 ? (isSubmitting ? "Sending..." : "Send") : "Next"}</span> →
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuizModal;