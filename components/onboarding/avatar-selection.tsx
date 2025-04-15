"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AvatarSelectionProps {
  onSelect: (index: number) => void
}

export function AvatarSelection({ onSelect }: AvatarSelectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
  }

  const handleContinue = () => {
    if (selectedIndex !== null) {
      onSelect(selectedIndex)
    }
  }

  // Placeholder avatars - in a real app, these would be actual images
  const avatars = [
    { type: "male", placeholder: "avatar/male" },
    { type: "male", placeholder: "avatar/male" },
    { type: "female", placeholder: "avatar/female" },
    { type: "female", placeholder: "avatar/female" },
    { type: "neutral", placeholder: "avatar/neutral" },
    { type: "neutral", placeholder: "avatar/neutral" },
  ]

  return (
    <div className="w-full max-w-md p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">アバターを選択</h1>
        <p className="mt-2 text-gray-600">あなたを表すアバターを選んでください</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {avatars.map((avatar, index) => (
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
                {avatar.type === "male" && "M"}
                {avatar.type === "female" && "F"}
                {avatar.type === "neutral" && "N"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full" disabled={selectedIndex === null} onClick={handleContinue}>
        名前入力へ
      </Button>
    </div>
  )
}
