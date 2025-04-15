"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Sparkles } from "lucide-react"

interface GoalReasonInputProps {
  initialReason: string
  onSubmit: (reason: string) => void
  onBack: () => void
}

export function GoalReasonInput({ initialReason, onSubmit, onBack }: GoalReasonInputProps) {
  const [mode, setMode] = useState<"light" | "deep">("light")
  const [reason, setReason] = useState(initialReason || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teacherResponse, setTeacherResponse] = useState<string | null>(null)

  const handleModeChange = (value: string) => {
    setMode(value as "light" | "deep")
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value)
  }

  const handleSubmit = () => {
    if (!reason.trim()) return

    setIsSubmitting(true)

    // In a real app, we would send the reason to Supabase and ChatGPT here
    // For now, we'll just simulate a response
    setTimeout(() => {
      onSubmit(reason)
      setTeacherResponse(
        "素晴らしい目標理由ですね！自分の可能性を信じて、一歩一歩進んでいきましょう。何か困ったことがあれば、いつでも相談してくださいね。",
      )
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">目標の理由</h1>
      </div>

      <div className="bg-muted p-4 rounded-lg flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Teacher" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-sm">
            さっき入力してくれた順位、なんでそれを目指したいって思ったのか、ちょっとだけ教えてくれたらうれしいな
          </p>
        </div>
      </div>

      <Tabs defaultValue={mode} onValueChange={handleModeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="light">カンタンに書く</TabsTrigger>
          <TabsTrigger value="deep">じっくり考えて書く</TabsTrigger>
        </TabsList>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">書くときのヒント</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
            <li>その順位を決めた理由は？</li>
            <li>それを達成したら、どんな自分になれそう？</li>
            <li>これからどんな気持ちで取り組む？</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">※いずれか一つでもOK。気軽に書いてね！</p>
        </div>

        <TabsContent value="light" className="mt-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="ライバルに勝ちたいから"
              value={reason}
              onChange={handleReasonChange}
              className="flex-1 min-h-[100px]"
              maxLength={200}
            />
          </div>
          <div className="text-xs text-right text-muted-foreground">{reason.length}/200文字</div>
        </TabsContent>

        <TabsContent value="deep" className="mt-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="これまであきらめてばかりだったけど、今回は本気で変わりたいと思って…"
              value={reason}
              onChange={handleReasonChange}
              className="flex-1 min-h-[200px]"
              maxLength={3000}
            />
          </div>
          <div className="text-xs text-right text-muted-foreground">{reason.length}/3000文字</div>
        </TabsContent>

        <Button className="w-full mt-6" onClick={handleSubmit} disabled={!reason.trim() || isSubmitting}>
          {isSubmitting ? "送信中..." : "登録する"}
        </Button>
      </Tabs>

      {teacherResponse && (
        <div className="mt-6 space-y-4">
          <div className="bg-muted p-4 rounded-lg flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Teacher" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm">{teacherResponse}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
