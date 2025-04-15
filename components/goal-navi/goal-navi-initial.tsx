"use client"

import { Button } from "@/components/ui/button"
import { Flag } from "lucide-react"

interface GoalNaviInitialProps {
  onStart: () => void
}

export function GoalNaviInitial({ onStart }: GoalNaviInitialProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Flag className="h-10 w-10 text-primary" />
      </div>

      <h1 className="text-2xl font-bold">あなたのゴールを決めよう！</h1>

      <p className="text-muted-foreground max-w-md">テスト名、テスト期間、目標順位を入力します</p>

      <Button onClick={onStart} size="lg">
        はじめる
      </Button>
    </div>
  )
}
