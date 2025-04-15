"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyTalk } from "@/components/talk-room/daily-talk"
import { WeeklyTalk } from "@/components/talk-room/weekly-talk"
import { CoachSelection } from "@/components/talk-room/coach-selection"

export default function TalkRoomPage() {
  const [hasSelectedCoach, setHasSelectedCoach] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null)

  // Check if the user has already selected a coach
  useEffect(() => {
    // In a real app, we would check if the user has already selected a coach in Supabase
    // For now, we'll just use local storage
    const savedCoach = localStorage.getItem("selectedCoach")
    if (savedCoach) {
      setSelectedCoach(Number.parseInt(savedCoach, 10))
      setHasSelectedCoach(true)
    }
  }, [])

  const handleCoachSelect = (coachIndex: number) => {
    setSelectedCoach(coachIndex)

    // In a real app, we would save the coach selection to Supabase
    localStorage.setItem("selectedCoach", coachIndex.toString())
    setHasSelectedCoach(true)
  }

  if (!hasSelectedCoach) {
    return <CoachSelection onSelect={handleCoachSelect} />
  }

  return (
    <div className="container py-6">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">今日のトーク</TabsTrigger>
          <TabsTrigger value="weekly">今週のトーク</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <DailyTalk coachIndex={selectedCoach!} />
        </TabsContent>
        <TabsContent value="weekly">
          <WeeklyTalk coachIndex={selectedCoach!} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
