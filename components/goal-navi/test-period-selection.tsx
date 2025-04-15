"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { CalendarIcon, ChevronLeft } from "lucide-react"

interface TestPeriodSelectionProps {
  testName: string
  onSelect: (startDate: string, endDate: string) => void
  onBack: () => void
}

export function TestPeriodSelection({ testName, onSelect, onBack }: TestPeriodSelectionProps) {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  // Default dates based on test name
  const getDefaultDates = () => {
    const currentYear = new Date().getFullYear()

    switch (testName) {
      case "第１回定期考査":
        return {
          start: new Date(currentYear, 4, 20), // May 20
          end: new Date(currentYear, 4, 21), // May 21
        }
      case "第２回定期考査":
        return {
          start: new Date(currentYear, 7, 30), // Aug 30
          end: new Date(currentYear, 7, 31), // Aug 31
        }
      case "第３回定期考査":
        return {
          start: new Date(currentYear, 10, 20), // Nov 20
          end: new Date(currentYear, 10, 21), // Nov 21
        }
      case "第４回定期考査":
        return {
          start: new Date(currentYear, 0, 30), // Jan 30
          end: new Date(currentYear, 0, 31), // Jan 31
        }
      default:
        return {
          start: undefined,
          end: undefined,
        }
    }
  }

  const defaultDates = getDefaultDates()

  const handleSubmit = () => {
    if (startDate && endDate) {
      onSelect(format(startDate, "yyyy-MM-dd"), format(endDate, "yyyy-MM-dd"))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">テスト期間を選択</h1>
      </div>

      <p className="text-muted-foreground">{testName}の実施期間を選択してください</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">開始日</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "yyyy年MM月dd日", { locale: ja }) : <span>日付を選択</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  defaultMonth={defaultDates.start}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">終了日</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "yyyy年MM月dd日", { locale: ja }) : <span>日付を選択</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  defaultMonth={defaultDates.end}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={!startDate || !endDate}>
        次へ
      </Button>
    </div>
  )
}
