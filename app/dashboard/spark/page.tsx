"use client"

import { useState, useEffect } from "react"
import { SubjectSelection } from "@/components/spark/subject-selection"
import { MathBookSelection } from "@/components/spark/math-book-selection"
import { TestRangeSelection } from "@/components/spark/test-range-selection"
import { SparkTaskList } from "@/components/spark/spark-task-list"
import { CompletionAnimation } from "@/components/onboarding/completion-animation"

export default function SparkPage() {
  const [step, setStep] = useState(0)
  const [hasSetTasks, setHasSetTasks] = useState(false)
  const [sparkData, setSparkData] = useState({
    subject: "",
    book: "",
    startChapter: "",
    startSection: "",
    endChapter: "",
    endSection: "",
    tasks: [] as any[],
  })

  // Check if the user has already set tasks
  useEffect(() => {
    // In a real app, we would check if the user has already set tasks in Supabase
    // For now, we'll just use local storage
    const savedSpark = localStorage.getItem("sparkData")
    if (savedSpark) {
      setSparkData(JSON.parse(savedSpark))
      setHasSetTasks(true)
      setStep(4)
    }
  }, [])

  const handleSubjectSelect = (subject: string) => {
    setSparkData({ ...sparkData, subject })
    setStep(1)
  }

  const handleBookSelect = (book: string) => {
    setSparkData({ ...sparkData, book })
    setStep(2)
  }

  const handleRangeSelect = (
    startChapter: string,
    startSection: string,
    endChapter: string,
    endSection: string,
    tasks: any[],
  ) => {
    setSparkData({
      ...sparkData,
      startChapter,
      startSection,
      endChapter,
      endSection,
      tasks,
    })
    setStep(3)
  }

  const handleCompletionAnimationEnd = () => {
    // In a real app, we would save the spark data to Supabase here
    localStorage.setItem("sparkData", JSON.stringify(sparkData))
    setHasSetTasks(true)
    setStep(4)
  }

  const handleTaskUpdate = (updatedTasks: any[]) => {
    setSparkData({ ...sparkData, tasks: updatedTasks })
    localStorage.setItem("sparkData", JSON.stringify({ ...sparkData, tasks: updatedTasks }))
  }

  // If the user has already set tasks, show the task list
  if (hasSetTasks && step === 4) {
    return (
      <div className="container py-6">
        <SparkTaskList tasks={sparkData.tasks} onTasksUpdate={handleTaskUpdate} />
      </div>
    )
  }

  // Otherwise, show the task setting flow
  return (
    <div className="container py-6">
      {step === 0 && <SubjectSelection onSelect={handleSubjectSelect} />}

      {step === 1 && <MathBookSelection onSelect={handleBookSelect} onBack={() => setStep(0)} />}

      {step === 2 && <TestRangeSelection onSelect={handleRangeSelect} onBack={() => setStep(1)} />}

      {step === 3 && <CompletionAnimation />}

      {/* Auto-advance from completion animation after 2 seconds */}
      {step === 3 && <div className="hidden">{setTimeout(() => handleCompletionAnimationEnd(), 2000)}</div>}
    </div>
  )
}
