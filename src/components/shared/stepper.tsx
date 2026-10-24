"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: { label: string; description?: string }[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={cn("flex items-center", !isLast && "flex-1")}
          >
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  isCompleted &&
                    "bg-terracotta-500 text-white",
                  isActive &&
                    "bg-terracotta-500 text-white ring-4 ring-terracotta-100",
                  !isCompleted &&
                    !isActive &&
                    "bg-cream-200 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4.5 h-4.5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isActive
                    ? "text-terracotta-500"
                    : isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              {step.description && (
                <span className="text-[10px] text-muted-foreground text-center mt-0.5">
                  {step.description}
                </span>
              )}
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 mx-3 mt-[-24px]">
                <div
                  className={cn(
                    "h-0.5 rounded-full transition-all duration-500",
                    isCompleted ? "bg-terracotta-500" : "bg-cream-200"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
