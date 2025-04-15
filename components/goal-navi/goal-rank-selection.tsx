"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { AlertCircle } from "lucide-react"

interface GoalRankSelectionProps {
  onSelect: (targetRank: number, totalStudents: number) => void
  onBack: () => void
}

export function GoalRankSelection({ onSelect, onBack }: GoalRankSelectionProps) {
  const [targetRank, setTargetRank] = useState<number | "">("")
  const [totalStudents, setTotalStudents] = useState<number | "">("")
  const [error, setError] = useState<string | null>(null)

  const handleTargetRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value, 10)
    setTargetRank(value)
    setError(null)
  }

  const handleTotalStudentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value, 10)
    setTotalStudents(value)
    setError(null)
  }

  const handleSubmit = () => {
    if (typeof targetRank !== "number" || typeof totalStudents !== "number") {
      setError("数値を入力してください")
      return
    }

    if (totalStudents < 20 || totalStudents > 1000) {
      setError("学年人数は20〜1000の範囲で入力してください")
      return
    }

    if (targetRank < 1 || targetRank > totalStudents) {
      setError(`目標順位は1〜${totalStudents}の範囲で入力してください`)
      return
    }

    onSelect(targetRank, totalStudents)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">目標順位を設定</h1>
      </div>

      <p className="text-muted-foreground">目標とする順位と学年の人数を入力してください</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="target-rank">目標順位</Label>
          <div className="flex items-center">
            <Input
              id="target-rank"
              type="number"
              min={1}
              value={targetRank}
              onChange={handleTargetRankChange}
              className="w-24"
            />
            <span className="ml-2">位</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="total-students">学年人数</Label>
          <div className="flex items-center">
            <Input
              id="total-students"
              type="number"
              min={20}
              max={1000}
              value={totalStudents}
              onChange={handleTotalStudentsChange}
              className="w-24"
            />
            <span className="ml-2">人</span>
          </div>
          <p className="text-xs text-muted-foreground">20〜1000人の範囲で入力してください</p>
        </div>

        {error && (
          <div className="flex items-center text-sm text-red-500 mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={targetRank === "" || totalStudents === ""}>
        設定する
      </Button>
    </div>
  )
}
