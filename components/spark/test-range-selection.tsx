"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

interface TestRangeSelectionProps {
  onSelect: (startChapter: string, startSection: string, endChapter: string, endSection: string, tasks: any[]) => void
  onBack: () => void
}

export function TestRangeSelection({ onSelect, onBack }: TestRangeSelectionProps) {
  const [step, setStep] = useState(0)
  const [startChapter, setStartChapter] = useState<string | null>(null)
  const [startSection, setStartSection] = useState<string | null>(null)
  const [endChapter, setEndChapter] = useState<string | null>(null)
  const [endSection, setEndSection] = useState<string | null>(null)

  // Math book structure
  const mathBook = {
    chapters: [
      {
        title: "第1章 正の数と負の数",
        sections: [
          { title: "① 正の数と負の数", problems: "1-14" },
          { title: "② 加法と減法", problems: "15-29" },
          { title: "③ 乗法と除法", problems: "30-44" },
          { title: "④ 四則の混じった計算", problems: "45-61" },
          { title: "章末問題", problems: "1-5" },
        ],
      },
      {
        title: "第2章 式の計算",
        sections: [
          { title: "① 文字式", problems: "1-13" },
          { title: "② 多項式の計算", problems: "14-33" },
          { title: "③ 単項式の乗法と除法", problems: "34-41" },
          { title: "④ 文字式の利用", problems: "42-49" },
          { title: "章末問題", problems: "1-5" },
        ],
      },
      {
        title: "第3章 方程式",
        sections: [
          { title: "① 方程式とその解 / ② １次方程式の解き方", problems: "1-14" },
          { title: "③ 1次方程式の利用", problems: "15-36" },
          { title: "④ 連立方程式", problems: "37-49" },
          { title: "⑤ 連立方程式の利用", problems: "50-63" },
          { title: "章末問題", problems: "1-6" },
        ],
      },
      {
        title: "第4章 不等式",
        sections: [
          { title: "① 不等式の性質 / ② 不等式の解き方", problems: "1-18" },
          { title: "③ 不等式の利用", problems: "19-33" },
          { title: "④ 連立不等式", problems: "34-51" },
          { title: "章末問題", problems: "1-6" },
        ],
      },
      {
        title: "第5章 1次関数",
        sections: [
          { title: "① 変化と関数", problems: "1-2" },
          { title: "② 比例とそのグラフ", problems: "3-20" },
          { title: "③ 反比例とそのグラフ", problems: "21-33" },
          { title: "④ 比例,反比例の利用", problems: "34-38" },
          { title: "⑤ 1次関数とそのグラフ", problems: "39-63" },
          { title: "⑥ 1次関数と方程式", problems: "64-72" },
          { title: "⑦ 1次関数の利用", problems: "73-92" },
          { title: "章末問題", problems: "1-5" },
        ],
      },
    ],
  }

  // Generate tasks based on selected range
  const generateTasks = () => {
    if (!startChapter || !startSection || !endChapter || !endSection) return []

    const tasks = []
    let collecting = false

    for (const chapter of mathBook.chapters) {
      const chapterTitle = chapter.title.split(" ")[0]

      if (chapterTitle === startChapter) collecting = true

      if (collecting) {
        for (const section of chapter.sections) {
          const sectionTitle = section.title

          // If we're at the start chapter, only collect sections after the start section
          if (chapterTitle === startChapter && !collecting) {
            if (sectionTitle === startSection) collecting = true
            else continue
          }

          // If we're collecting, add tasks for this section
          if (collecting) {
            // Parse problem range
            const problemsText = section.problems
            const [start, end] = problemsText.split("-").map((p) => Number.parseInt(p, 10))

            // Create a task for each problem
            if (!isNaN(start) && !isNaN(end)) {
              for (let i = start; i <= end; i++) {
                tasks.push({
                  id: `${chapterTitle}-${sectionTitle}-${i}`,
                  chapter: chapterTitle,
                  section: sectionTitle,
                  problem: i,
                  status: null, // null, 'complete', 'partial', 'incorrect'
                  date: null,
                })
              }
            }

            // If we're at the end chapter and section, stop collecting
            if (chapterTitle === endChapter && sectionTitle === endSection) {
              collecting = false
              break
            }
          }
        }
      }

      // If we've finished the end chapter, stop collecting
      if (chapterTitle === endChapter) collecting = false
    }

    return tasks
  }

  const handleStartChapterSelect = (chapter: string) => {
    setStartChapter(chapter)
    setStep(1)
  }

  const handleStartSectionSelect = (section: string) => {
    setStartSection(section)
    setStep(2)
  }

  const handleEndChapterSelect = (chapter: string) => {
    setEndChapter(chapter)
    setStep(3)
  }

  const handleEndSectionSelect = (section: string) => {
    setEndSection(section)
    setStep(4)
  }

  const handleConfirm = () => {
    const tasks = generateTasks()
    onSelect(startChapter!, startSection!, endChapter!, endSection!, tasks)
  }

  const handleReset = () => {
    setStartChapter(null)
    setStartSection(null)
    setEndChapter(null)
    setEndSection(null)
    setStep(0)
  }

  const handleBack = () => {
    if (step === 0) {
      onBack()
    } else if (step === 1) {
      setStartChapter(null)
      setStep(0)
    } else if (step === 2) {
      setStartSection(null)
      setStep(1)
    } else if (step === 3) {
      setEndChapter(null)
      setStep(2)
    } else if (step === 4) {
      setEndSection(null)
      setStep(3)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold ml-2">試験範囲を決定</h1>
      </div>

      {step === 0 && (
        <>
          <p className="text-muted-foreground">試験範囲はどこからですか。まずは章を選びましょう</p>

          <div className="grid gap-4">
            {mathBook.chapters.map((chapter) => (
              <Card
                key={chapter.title}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleStartChapterSelect(chapter.title.split(" ")[0])}
              >
                <CardContent className="p-4">
                  <span className="font-medium">{chapter.title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {step === 1 && startChapter && (
        <>
          <p className="text-muted-foreground">{startChapter}のどの項目からですか？</p>

          <div className="grid gap-4">
            {mathBook.chapters
              .find((c) => c.title.startsWith(startChapter))
              ?.sections.map((section) => (
                <Card
                  key={section.title}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleStartSectionSelect(section.title)}
                >
                  <CardContent className="p-4">
                    <span className="font-medium">{section.title}</span>
                    <span className="text-sm text-muted-foreground ml-2">（問題{section.problems}）</span>
                  </CardContent>
                </Card>
              ))}
          </div>
        </>
      )}

      {step === 2 && startChapter && startSection && (
        <>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">選択した範囲（開始）:</p>
            <p>
              {startChapter} {startSection}
            </p>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              選び直す
            </Button>
            <Button onClick={() => setStep(3)}>試験範囲を決める（どこまでか）</Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-muted-foreground">試験範囲はどこまでですか。章を選びましょう</p>

          <div className="grid gap-4">
            {mathBook.chapters.map((chapter) => {
              const chapterNum = chapter.title.split(" ")[0]
              const startChapterNum = Number.parseInt(startChapter!.replace("第", "").replace("章", ""), 10)
              const thisChapterNum = Number.parseInt(chapterNum.replace("第", "").replace("章", ""), 10)

              // Only show chapters that are equal to or after the start chapter
              if (thisChapterNum >= startChapterNum) {
                return (
                  <Card
                    key={chapter.title}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleEndChapterSelect(chapterNum)}
                  >
                    <CardContent className="p-4">
                      <span className="font-medium">{chapter.title}</span>
                    </CardContent>
                  </Card>
                )
              }
              return null
            })}
          </div>
        </>
      )}

      {step === 4 && endChapter && (
        <>
          <p className="text-muted-foreground">{endChapter}のどの項目までですか？</p>

          <div className="grid gap-4">
            {mathBook.chapters
              .find((c) => c.title.startsWith(endChapter))
              ?.sections.map((section) => {
                // If end chapter is the same as start chapter, only show sections after the start section
                if (endChapter === startChapter) {
                  const startSectionIndex =
                    mathBook.chapters
                      .find((c) => c.title.startsWith(startChapter))
                      ?.sections.findIndex((s) => s.title === startSection) || 0

                  const thisSectionIndex =
                    mathBook.chapters
                      .find((c) => c.title.startsWith(endChapter))
                      ?.sections.findIndex((s) => s.title === section.title) || 0

                  if (thisSectionIndex < startSectionIndex) return null
                }

                return (
                  <Card
                    key={section.title}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleEndSectionSelect(section.title)}
                  >
                    <CardContent className="p-4">
                      <span className="font-medium">{section.title}</span>
                      <span className="text-sm text-muted-foreground ml-2">（問題{section.problems}）</span>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </>
      )}

      {step === 4 && startChapter && startSection && endChapter && endSection && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">選択した範囲:</p>
            <p>
              {startChapter} {startSection} から {endChapter} {endSection} まで
            </p>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              初めからやり直す
            </Button>
            <Button variant="outline" onClick={() => setStep(3)}>
              選び直す（どこまでか）
            </Button>
            <Button onClick={handleConfirm}>試験範囲を決定</Button>
          </div>
        </div>
      )}
    </div>
  )
}
