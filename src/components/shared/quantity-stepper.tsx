"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantityStepperProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  const sizeClasses = {
    sm: {
      wrapper: "h-7",
      button: "w-7 h-7",
      icon: "w-3 h-3",
      text: "text-xs w-8",
    },
    md: {
      wrapper: "h-9",
      button: "w-9 h-9",
      icon: "w-4 h-4",
      text: "text-sm w-10",
    },
    lg: {
      wrapper: "h-11",
      button: "w-11 h-11",
      icon: "w-4.5 h-4.5",
      text: "text-base w-12",
    },
  };

  const s = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-white",
        s.wrapper,
        className
      )}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center rounded-l-lg transition-colors",
          "hover:bg-cream-100 active:bg-cream-200 disabled:opacity-40 disabled:cursor-not-allowed",
          s.button
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={s.icon} />
      </button>
      <span
        className={cn(
          "text-center font-medium select-none border-x border-border",
          s.text,
          s.wrapper
        )}
        style={{ lineHeight: s.wrapper === "h-7" ? "1.75rem" : s.wrapper === "h-9" ? "2.25rem" : "2.75rem" }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center rounded-r-lg transition-colors",
          "hover:bg-cream-100 active:bg-cream-200 disabled:opacity-40 disabled:cursor-not-allowed",
          s.button
        )}
        aria-label="Increase quantity"
      >
        <Plus className={s.icon} />
      </button>
    </div>
  );
}
