"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface OpeningAnimationProps {
  onSkip: () => void
}

export function OpeningAnimation({ onSkip }: OpeningAnimationProps) {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const steps = [
      { delay: 1000 }, // Night sky
      { delay: 2000 }, // Dawn
      { delay: 2000 }, // White screen
    ]

    if (animationStep < steps.length) {
      const timer = setTimeout(() => {
        setAnimationStep(animationStep + 1)
      }, steps[animationStep].delay)
      return () => clearTimeout(timer)
    }
  }, [animationStep])

  const getBackgroundClass = () => {
    switch (animationStep) {
      case 0:
        return "bg-[#0a1929]" // Night sky
      case 1:
        return "bg-[#264b73]" // Dawn
      case 2:
      default:
        return "bg-white" // White screen
    }
  }

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center transition-colors duration-1000 ${getBackgroundClass()}`}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {animationStep === 0 && (
          <div className="absolute inset-0">
            {/* Stars animation */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        <h1
          className={`text-2xl md:text-3xl font-bold text-center transition-opacity duration-500 ${animationStep < 2 ? "text-white" : "text-gray-800"} ${animationStep === 0 ? "opacity-0" : "opacity-100"}`}
        >
          あなたの可能性を開く冒険
        </h1>
        <p
          className={`mt-2 text-xl md:text-2xl font-medium text-center transition-opacity duration-500 ${animationStep < 2 ? "text-white" : "text-gray-800"} ${animationStep < 1 ? "opacity-0" : "opacity-100"}`}
        >
          今始まる
        </p>

        <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-white" onClick={onSkip}>
          <X className="h-4 w-4 mr-1" />
          スキップ
        </Button>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
