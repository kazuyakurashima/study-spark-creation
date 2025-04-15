"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { OpeningAnimation } from "@/components/onboarding/opening-animation"
import { AvatarSelection } from "@/components/onboarding/avatar-selection"
import { NameInput } from "@/components/onboarding/name-input"
import { CompletionAnimation } from "@/components/onboarding/completion-animation"

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSkipOpening = () => {
    setStep(1)
  }

  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index)
    setStep(2)
  }

  const handleNameSubmit = (name: string) => {
    setName(name)
    setStep(3)
  }

  const handleComplete = () => {
    // In a real app, we would save the user's avatar and name to Supabase here
    router.push("/dashboard")
  }

  useEffect(() => {
    // Auto-advance from opening animation after 5 seconds
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1)
      }, 5000)
      return () => clearTimeout(timer)
    }

    // Auto-advance from completion animation after 2 seconds
    if (step === 3) {
      const timer = setTimeout(() => {
        handleComplete()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {step === 0 && <OpeningAnimation onSkip={handleSkipOpening} />}
      {step === 1 && <AvatarSelection onSelect={handleAvatarSelect} />}
      {step === 2 && <NameInput onSubmit={handleNameSubmit} />}
      {step === 3 && <CompletionAnimation />}
    </div>
  )
}
