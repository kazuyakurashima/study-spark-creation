"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, BookOpen } from "lucide-react"

interface MathBookSelectionProps {
  onSelect: (book: string) => void
  onBack: () => void
}

export function MathBookSelection({ onSelect, onBack }: MathBookSelectionProps) {
  const books = [
    { name: "体系問題集 数学１代数編", available: true },
    { name: "体系問題集 数学１幾何編", available: false },
    { name: "体系問題集 数学２代数編", available: false },
    { name: "体系問題集 数学２幾何編", available: false },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold ml-2">問題集を選択</h1>
      </div>

      <div className="grid gap-4">
        {books.map((book) => (
          <Card
            key={book.name}
            className={`${
              book.available ? "cursor-pointer hover:bg-muted/50 transition-colors border-primary" : "opacity-50"
            }`}
            onClick={() => book.available && onSelect(book.name)}
          >
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">{book.name}</span>
              {!book.available && <span className="ml-auto text-xs text-muted-foreground">準備中</span>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
