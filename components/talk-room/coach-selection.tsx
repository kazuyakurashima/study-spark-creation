"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CoachSelectionProps {
  onSelect: (coachIndex: number) => void
}

export function CoachSelection({ onSelect }: CoachSelectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
  }

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      onSelect(selectedIndex)
    }
  }

  // Placeholder coaches - in a real app, these would be actual images
  const coaches = [
    { type: "male", placeholder: "coach/male" },
    { type: "male", placeholder: "coach/male" },
    { type: "female", placeholder: "coach/female" },
    { type: "female", placeholder: "coach/female" },
    { type: "neutral", placeholder: "coach/neutral" },
    { type: "neutral", placeholder: "coach/neutral" },
  ]

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">コーチを選択</h1>
        <p className="mt-2 text-gray-600">あなたの学習をサポートするコーチを選んでください</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {coaches.map((coach, index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedIndex === index
                ? "border-primary scale-105 shadow-lg"
                : "border-transparent hover:border-gray-300"
            }`}
            onClick={() => handleSelect(index)}
          >
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                {coach.type === "male" && "M"}
                {coach.type === "female" && "F"}
                {coach.type === "neutral" && "N"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full" disabled={selectedIndex === null} onClick={handleConfirm}>
        決定
      </Button>
    </div>
  )
}
