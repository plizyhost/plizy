"use client";

// This component is now a Client Component because it uses styled-jsx for the animation.

export const GreenCheckmark = () => (
  <svg className="h-16 w-16 text-green-500 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 12.5l3 3 6-6"
      className="path"
      style={{
        strokeDasharray: 20,
        strokeDashoffset: 20,
        animation: 'draw 0.5s ease-in-out forwards 0.2s',
      }}
    />
    <style jsx>{`
      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>
  </svg>
);