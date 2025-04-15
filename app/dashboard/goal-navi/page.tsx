"use client"

import { useState, useEffect } from "react"
import { GoalNaviInitial } from "@/components/goal-navi/goal-navi-initial"
import { TestNameSelection } from "@/components/goal-navi/test-name-selection"
import { TestPeriodSelection } from "@/components/goal-navi/test-period-selection"
import { GoalRankSelection } from "@/components/goal-navi/goal-rank-selection"
import { GoalNaviDashboard } from "@/components/goal-navi/goal-navi-dashboard"
import { GoalReasonInput } from "@/components/goal-navi/goal-reason-input"
import { CompletionAnimation } from "@/components/onboarding/completion-animation"

export default function GoalNaviPage() {
  const [step, setStep] = useState(0)
  const [hasSetGoal, setHasSetGoal] = useState(false)
  const [goalData, setGoalData] = useState({
    testName: "",
    startDate: "",
    endDate: "",
    targetRank: 0,
    totalStudents: 0,
    reason: "",
  })

  // Check if the user has already set a goal
  useEffect(() => {
    // In a real app, we would check if the user has already set a goal in Supabase
    // For now, we'll just use local storage
    const savedGoal = localStorage.getItem("goalData")
    if (savedGoal) {
      setGoalData(JSON.parse(savedGoal))
      setHasSetGoal(true)
    }
  }, [])

  const handleTestNameSelect = (testName: string) => {
    setGoalData({ ...goalData, testName })
    setStep(1)
  }

  const handleTestPeriodSelect = (startDate: string, endDate: string) => {
    setGoalData({ ...goalData, startDate, endDate })
    setStep(2)
  }

  const handleGoalRankSelect = (targetRank: number, totalStudents: number) => {
    setGoalData({ ...goalData, targetRank, totalStudents })
    setStep(3)
  }

  const handleCompletionAnimationEnd = () => {
    // In a real app, we would save the goal data to Supabase here
    localStorage.setItem("goalData", JSON.stringify(goalData))
    setHasSetGoal(true)
    setStep(4)
  }

  const handleEditGoal = () => {
    setStep(0)
  }

  const handleReasonSubmit = (reason: string) => {
    setGoalData({ ...goalData, reason })
    // In a real app, we would save the reason to Supabase here
    localStorage.setItem("goalData", JSON.stringify({ ...goalData, reason }))
  }

  // If the user has already set a goal, show the dashboard
  if (hasSetGoal && step === 4) {
    return (
      <div className="container py-6 space-y-6">
        <GoalNaviDashboard goalData={goalData} onEdit={handleEditGoal} onReasonClick={() => setStep(5)} />
      </div>
    )
  }

  // If the user is entering their reason, show the reason input
  if (step === 5) {
    return (
      <div className="container py-6">
        <GoalReasonInput initialReason={goalData.reason} onSubmit={handleReasonSubmit} onBack={() => setStep(4)} />
      </div>
    )
  }

  // Otherwise, show the goal setting flow
  return (
    <div className="container py-6">
      {step === 0 && !hasSetGoal && <GoalNaviInitial onStart={() => setStep(0)} />}

      {step === 0 && <TestNameSelection onSelect={handleTestNameSelect} />}

      {step === 1 && (
        <TestPeriodSelection testName={goalData.testName} onSelect={handleTestPeriodSelect} onBack={() => setStep(0)} />
      )}

      {step === 2 && <GoalRankSelection onSelect={handleGoalRankSelect} onBack={() => setStep(1)} />}

      {step === 3 && <CompletionAnimation />}

      {/* Auto-advance from completion animation after 2 seconds */}
      {step === 3 && <div className="hidden">{setTimeout(() => handleCompletionAnimationEnd(), 2000)}</div>}
    </div>
  )
}
