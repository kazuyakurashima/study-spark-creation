"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Flag, Edit, MessageSquare } from "lucide-react"

interface GoalData {
  testName: string
  startDate: string
  endDate: string
  targetRank: number
  totalStudents: number
  reason: string
}

interface GoalNaviDashboardProps {
  goalData: GoalData
  onEdit: () => void
  onReasonClick: () => void
}

export function GoalNaviDashboard({ goalData, onEdit, onReasonClick }: GoalNaviDashboardProps) {
  const { testName, startDate, endDate, targetRank, totalStudents, reason } = goalData

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })
  }

  // Calculate position for the flag on the number line
  const flagPosition = Math.max(0, Math.min(100, (targetRank / totalStudents) * 100))

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{testName}</h2>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-1" />
                編集
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              {formatDate(startDate)} 〜 {formatDate(endDate)}
            </div>

            <div className="mt-6 space-y-2">
              <div className="text-sm font-medium">
                目標順位: {targetRank}位 / {totalStudents}人中
              </div>

              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                {/* Number line */}
                <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
                  <span>1</span>
                  <span>{totalStudents}</span>
                </div>

                {/* Flag marker */}
                <div className="absolute top-0 flex flex-col items-center" style={{ left: `${flagPosition}%` }}>
                  <Flag className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium">{targetRank}位</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">目標の理由</h2>
            <Button variant="ghost" size="sm" onClick={onReasonClick}>
              <MessageSquare className="h-4 w-4 mr-1" />
              {reason ? "編集" : "入力"}
            </Button>
          </div>

          {reason ? (
            <p className="text-sm">{reason}</p>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">目標を達成したい理由を入力しましょう</p>
              <Button className="mt-4" onClick={onReasonClick}>
                理由を入力する
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
