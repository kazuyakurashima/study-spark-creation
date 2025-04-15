"use client"

import { useEffect, useState } from "react"

export function CompletionAnimation() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Rainbow animation */}
        <div className="absolute w-[200%] h-[200%] left-[-50%] bottom-[-50%] transform rotate-[-30deg]">
          <div className="rainbow-animation absolute bottom-0 left-0 w-full h-[10%]" />
        </div>

        <div className={`text-center transition-opacity duration-1000 ${showMessage ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">さぁ、あなたの旅をはじめましょう！</h1>
        </div>
      </div>

      <style jsx>{`
        .rainbow-animation {
          background: linear-gradient(
            to right,
            rgba(255, 0, 0, 0.7),
            rgba(255, 165, 0, 0.7),
            rgba(255, 255, 0, 0.7),
            rgba(0, 128, 0, 0.7),
            rgba(0, 0, 255, 0.7),
            rgba(75, 0, 130, 0.7),
            rgba(238, 130, 238, 0.7)
          );
          animation: rainbow-move 2s ease-in-out forwards;
        }
        
        @keyframes rainbow-move {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
