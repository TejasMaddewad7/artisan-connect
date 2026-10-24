"use client";

import { cn } from "@/lib/utils";

interface LeafProps {
  className?: string;
  variant?: "branch" | "single" | "corner" | "small";
}

export function BotanicalLeaf({ className, variant = "branch" }: LeafProps) {
  if (variant === "single") {
    return (
      <svg
        viewBox="0 0 60 80"
        fill="none"
        className={cn("text-sage-400 opacity-30", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 5C20 25 5 35 5 55C5 65 15 75 30 75C45 75 55 65 55 55C55 35 40 25 30 5Z"
          fill="currentColor"
        />
        <path
          d="M30 15V65"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <path
          d="M30 30C22 35 15 42 12 50"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <path
          d="M30 35C38 40 45 47 48 50"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      </svg>
    );
  }

  if (variant === "small") {
    return (
      <svg
        viewBox="0 0 24 32"
        fill="none"
        className={cn("text-sage-400 opacity-30", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C8 10 2 14 2 22C2 26 6 30 12 30C18 30 22 26 22 22C22 14 16 10 12 2Z"
          fill="currentColor"
        />
        <path
          d="M12 6V26"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />
      </svg>
    );
  }

  if (variant === "corner") {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className={cn("text-sage-400 opacity-15", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main branch */}
        <path
          d="M190 10C160 40 130 70 80 110C50 135 20 160 10 190"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Leaves along the branch */}
        <path
          d="M170 20C165 30 155 35 145 30C150 22 160 18 170 20Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <path
          d="M145 45C140 55 130 60 120 55C125 47 135 43 145 45Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <path
          d="M120 70C115 80 105 85 95 80C100 72 110 68 120 70Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <path
          d="M95 95C90 105 80 110 70 105C75 97 85 93 95 95Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <path
          d="M70 120C65 130 55 135 45 130C50 122 60 118 70 120Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <path
          d="M45 145C40 155 30 160 20 155C25 147 35 143 45 145Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        {/* Right-side leaves */}
        <path
          d="M160 35C170 40 175 50 170 58C162 52 158 42 160 35Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <path
          d="M135 60C145 65 150 75 145 83C137 77 133 67 135 60Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <path
          d="M108 87C118 92 123 102 118 110C110 104 106 94 108 87Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <path
          d="M80 112C90 117 95 127 90 135C82 129 78 119 80 112Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
      </svg>
    );
  }

  // Branch variant (default)
  return (
    <svg
      viewBox="0 0 120 180"
      fill="none"
      className={cn("text-sage-400 opacity-20", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stem */}
      <path
        d="M60 170C60 130 55 90 60 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left leaves */}
      <path
        d="M58 30C40 25 25 30 20 45C30 48 45 42 58 30Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M57 60C39 55 24 60 19 75C29 78 44 72 57 60Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M56 95C38 90 23 95 18 110C28 113 43 107 56 95Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <path
        d="M56 125C38 120 23 125 18 140C28 143 43 137 56 125Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      {/* Right leaves */}
      <path
        d="M62 45C80 40 95 45 100 60C90 63 75 57 62 45Z"
        fill="currentColor"
        fillOpacity="0.65"
      />
      <path
        d="M63 78C81 73 96 78 101 93C91 96 76 90 63 78Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path
        d="M63 110C81 105 96 110 101 125C91 128 76 122 63 110Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  );
}

export function LeafDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <BotanicalLeaf variant="small" className="w-5 h-7 rotate-12" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
