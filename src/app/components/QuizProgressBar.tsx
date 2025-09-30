"use client";
import React from "react";
interface QuizProgressBarProps {
  currentStep: number; // empieza en 1 en tu Modal: currentStep + 1
  totalSteps: number;
}
const QuizProgressBarComponent: React.FC<QuizProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  // aseguramos 0–100
  const pct = Math.max(
    0,
    Math.min(100, Math.round((currentStep / totalSteps) * 100))
  );
  return (
    <div className="w-full">
      <div className="w-full h-[6px] bg-neutral-700 dark:bg-neutral-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-white dark:bg-black rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
export default QuizProgressBarComponent;