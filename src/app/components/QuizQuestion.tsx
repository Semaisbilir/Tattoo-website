"use client";
import React from "react";
interface QuizAnswer {
  type: "text" | "select" | "file";
  question: string;
  value: string | File[];
  options?: string[];
  extra?: string;
}
interface QuizQuestionProps {
  step: number;
  totalSteps: number;
  question: QuizAnswer;
  onChange: (value: string | File[], extra?: string) => void;
}
const QuizQuestion: React.FC<QuizQuestionProps> = ({
  step,
  totalSteps,
  question,
  onChange,
}) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onChange(files, question.extra);
  };
  const stepLabel = `${String(step + 1).padStart(2, "0")} / ${String(
    totalSteps
  ).padStart(2, "0")}`;
  return (
    <div className="w-full font-subheading">
      <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-12 items-stretch">
        {/* Pregunta */}
        <div className="pr-2 self-center">
          <p className="text-sm text-neutral-500 mb-2">{stepLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
            {question.question}
          </h2>
        </div>
        {/* Divider */}
        <div className="hidden md:block w-px bg-neutral-200" />
        {/* Respuestas */}
        <div className="md:pl-6 h-full flex flex-col justify-center gap-6">
          {question.type === "text" && (
            <div className="mt-4 md:mt-6">
              <input
                type="text"
                value={(question.value as string) ?? ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Your answer"
                className="w-full border-b-2 border-neutral-300 bg-transparent outline-none pt-2 pb-3 text-lg md:text-xl"
              />
            </div>
          )}
          {question.type === "select" && question.options && (
            <div className="flex flex-wrap items-center gap-4 md:gap-6 ml-4 md:ml-8">
              {question.options.map((opt) => {
                const isActive = question.value === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onChange(opt)}
                    className={[
                      "inline-flex items-center justify-center",
                      "px-7 py-3 rounded-full border w-fit",
                      "text-base md:text-lg",
                      "transition-transform duration-150",
                      isActive
                        ? "bg-white dark:bg-black dark:text-white text-black border-white dark:border-black"
                        : "bg-transparent text-white dark:text-black border-white dark:border-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white hover:scale-105",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
          {question.type === "file" && (
            <div className="flex flex-col space-y-2 ml-4 md:ml-8">
              <label className="underline cursor-pointer w-fit">
                Upload files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFile}
                />
              </label>
              <p className="text-sm text-neutral-500">
                {Array.isArray(question.value) &&
                (question.value as File[]).length > 0
                  ? `${(question.value as File[]).length} file(s) selected`
                  : "No files selected"}
              </p>
              {/* Comentario pegado a la línea */}
              <textarea
                placeholder="Optional description..."
                value={question.extra || ""}
                onChange={(e) => onChange(question.value, e.target.value)}
                rows={1}
                className="block w-full border-b border-black bg-transparent outline-none mt-0 py-2 leading-tight text-base md:text-lg placeholder:italic"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuizQuestion;