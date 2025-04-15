"use client"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calculator, Globe, FlaskRoundIcon as Flask, BookMarked } from "lucide-react"

interface SubjectSelectionProps {
  onSelect: (subject: string) => void
}

export function SubjectSelection({ onSelect }: SubjectSelectionProps) {
  const subjects = [
    { name: "英語", icon: Globe },
    { name: "数学", icon: Calculator },
    { name: "国語", icon: BookOpen },
    { name: "理科", icon: Flask },
    { name: "社会", icon: BookMarked },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">スパーク（修得）する科目を選びましょう</h1>
      </div>

      <div className="grid gap-4">
        {subjects.map((subject) => (
          <Card
            key={subject.name}
            className={`cursor-pointer hover:bg-muted/50 transition-colors ${
              subject.name === "数学" ? "border-primary" : ""
            }`}
            onClick={() => onSelect(subject.name)}
          >
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <subject.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">{subject.name}</span>
              {subject.name !== "数学" && <span className="ml-auto text-xs text-muted-foreground">準備中</span>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
