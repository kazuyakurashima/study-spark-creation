"use client"

import { useState, useEffect } from "react"
import { CountdownCalendar } from "@/components/countdown/countdown-calendar"
import { CountdownHeader } from "@/components/countdown/countdown-header"

export default function CountdownPage() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day")
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get test dates from local storage (in a real app, this would come from Supabase)
  const [testDates, setTestDates] = useState<{
    startDate: string
    endDate: string
    testName: string
  } | null>(null)

  useEffect(() => {
    const savedGoal = localStorage.getItem("goalData")
    if (savedGoal) {
      const { startDate, endDate, testName } = JSON.parse(savedGoal)
      setTestDates({ startDate, endDate, testName })
    }
  }, [])

  const handleViewModeChange = (mode: "day" | "week" | "month") => {
    setViewMode(mode)
  }

  const handleDateChange = (date: Date) => {
    setCurrentDate(date)
  }

  const handleTodayClick = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="container py-6 space-y-4">
      <CountdownHeader viewMode={viewMode} onViewModeChange={handleViewModeChange} onTodayClick={handleTodayClick} />

      <CountdownCalendar
        viewMode={viewMode}
        currentDate={currentDate}
        onDateChange={handleDateChange}
        testDates={testDates}
      />
    </div>
  )
}
