"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle, Circle, AlertTriangle, ChevronDown, ChevronRight, Settings } from "lucide-react"
import { TaskCompletionAnimation } from "@/components/spark/task-completion-animation"

interface Task {
  id: string
  chapter: string
  section: string
  problem: number
  status: "complete" | "partial" | "incorrect" | null
  date: string | null
}

interface SparkTaskListProps {
  tasks: Task[]
  onTasksUpdate: (tasks: Task[]) => void
}

export function SparkTaskList({ tasks, onTasksUpdate }: SparkTaskListProps) {
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [filter, setFilter] = useState<"all" | "complete" | "incomplete" | "incorrect">("all")
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  // Group tasks by chapter and section
  const groupedTasks: Record<string, Record<string, Task[]>> = {}

  tasks.forEach((task) => {
    if (!groupedTasks[task.chapter]) {
      groupedTasks[task.chapter] = {}
    }

    if (!groupedTasks[task.chapter][task.section]) {
      groupedTasks[task.chapter][task.section] = []
    }

    groupedTasks[task.chapter][task.section].push(task)
  })

  const toggleChapter = (chapter: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapter]: !prev[chapter],
    }))
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleTaskStatusChange = (taskId: string, status: "complete" | "partial" | "incorrect") => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status,
          date: new Date().toISOString(),
        }
      }
      return task
    })

    onTasksUpdate(updatedTasks)

    // Show animation for complete tasks
    if (status === "complete" && animationsEnabled) {
      setShowAnimation(true)
      setTimeout(() => {
        setShowAnimation(false)
      }, 2000)
    }
  }

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled)
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "complete") return task.status === "complete"
    if (filter === "incomplete") return task.status === null
    if (filter === "incorrect") return task.status === "incorrect"
    return true
  })

  // Calculate completion stats
  const completedCount = tasks.filter((task) => task.status === "complete").length
  const partialCount = tasks.filter((task) => task.status === "partial").length
  const incorrectCount = tasks.filter((task) => task.status === "incorrect").length
  const totalCount = tasks.length
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">スパークリスト</h1>
        <Button variant="outline" size="sm" onClick={toggleAnimations}>
          <Settings className="h-4 w-4 mr-2" />
          {animationsEnabled ? "アニメOFF" : "アニメON"}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">進捗状況</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                完了: {completedCount}/{totalCount}
              </span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${completionRate}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>完答: {completedCount}</span>
              <span>一部正解: {partialCount}</span>
              <span>誤答: {incorrectCount}</span>
              <span>未回答: {totalCount - completedCount - partialCount - incorrectCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">全て</TabsTrigger>
          <TabsTrigger value="complete">完答</TabsTrigger>
          <TabsTrigger value="incomplete">未回答</TabsTrigger>
          <TabsTrigger value="incorrect">誤答</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {Object.entries(groupedTasks).map(([chapter, sections]) => (
          <Collapsible
            key={chapter}
            open={openChapters[chapter]}
            onOpenChange={() => toggleChapter(chapter)}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50">
              <span className="font-medium">第{chapter.replace("第", "").replace("章", "")}</span>
              {openChapters[chapter] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="divide-y">
                {Object.entries(sections).map(([section, sectionTasks]) => (
                  <Collapsible
                    key={`${chapter}-${section}`}
                    open={openSections[`${chapter}-${section}`]}
                    onOpenChange={() => toggleSection(`${chapter}-${section}`)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/30">
                      <span>{section}</span>
                      {openSections[`${chapter}-${section}`] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
                        {sectionTasks
                          .filter((task) => {
                            if (filter === "all") return true
                            if (filter === "complete") return task.status === "complete"
                            if (filter === "incomplete") return task.status === null
                            if (filter === "incorrect") return task.status === "incorrect"
                            return true
                          })
                          .map((task) => (
                            <div key={task.id} className="border rounded-md p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">問題 {task.problem}</span>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 rounded-full ${task.status === "complete" ? "bg-blue-100 text-blue-600" : ""}`}
                                    onClick={() => handleTaskStatusChange(task.id, "complete")}
                                  >
                                    <CheckCircle className="h-5 w-5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 rounded-full ${task.status === "partial" ? "bg-yellow-100 text-yellow-600" : ""}`}
                                    onClick={() => handleTaskStatusChange(task.id, "partial")}
                                  >
                                    <Circle className="h-5 w-5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 rounded-full ${task.status === "incorrect" ? "bg-red-100 text-red-600" : ""}`}
                                    onClick={() => handleTaskStatusChange(task.id, "incorrect")}
                                  >
                                    <AlertTriangle className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>
                              {task.date && (
                                <div className="text-xs text-muted-foreground">
                                  {new Date(task.date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {showAnimation && <TaskCompletionAnimation />}
    </div>
  )
}
