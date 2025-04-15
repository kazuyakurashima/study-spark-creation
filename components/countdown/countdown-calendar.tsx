"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isSameDay,
  differenceInDays,
  isWithinInterval,
  parseISO,
} from "date-fns"
import { ja } from "date-fns/locale"

interface CountdownCalendarProps {
  viewMode: "day" | "week" | "month"
  currentDate: Date
  onDateChange: (date: Date) => void
  testDates: {
    startDate: string
    endDate: string
    testName: string
  } | null
}

export function CountdownCalendar({ viewMode, currentDate, onDateChange, testDates }: CountdownCalendarProps) {
  // Calculate days until test
  const getDaysUntilTest = () => {
    if (!testDates) return null

    const today = new Date()
    const testStart = parseISO(testDates.startDate)
    const daysUntil = differenceInDays(testStart, today)

    if (daysUntil < 0) return null
    if (daysUntil <= 7) return daysUntil
    return null
  }

  const daysUntilTest = getDaysUntilTest()

  // Check if a date is a test date
  const isTestDate = (date: Date) => {
    if (!testDates) return false

    const testStart = parseISO(testDates.startDate)
    const testEnd = parseISO(testDates.endDate)

    return isWithinInterval(date, { start: testStart, end: testEnd })
  }

  // Navigation handlers
  const handlePrevious = () => {
    if (viewMode === "day") {
      onDateChange(subDays(currentDate, 1))
    } else if (viewMode === "week") {
      onDateChange(subWeeks(currentDate, 1))
    } else if (viewMode === "month") {
      onDateChange(subMonths(currentDate, 1))
    }
  }

  const handleNext = () => {
    if (viewMode === "day") {
      onDateChange(addDays(currentDate, 1))
    } else if (viewMode === "week") {
      onDateChange(addWeeks(currentDate, 1))
    } else if (viewMode === "month") {
      onDateChange(addMonths(currentDate, 1))
    }
  }

  // Render day view
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const now = new Date()
    const isToday = isSameDay(currentDate, now)
    const currentHour = now.getHours()

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">{format(currentDate, "yyyy年MM月dd日 (EEE)", { locale: ja })}</h2>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`flex items-center p-2 ${isToday && hour === currentHour ? "bg-primary/10" : ""}`}
                >
                  <div className="w-16 text-sm text-muted-foreground">{hour}:00</div>
                  <div className="flex-1 min-h-[40px]">
                    {isTestDate(new Date(currentDate.setHours(hour))) && (
                      <div className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">{testDates?.testName}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {daysUntilTest !== null && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-lg font-bold">テストまであと {daysUntilTest} 日</p>
            <p className="text-sm text-muted-foreground">{testDates?.testName}</p>
          </div>
        )}
      </div>
    )
  }

  // Render week view
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start from Monday
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
    const now = new Date()

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">
            {format(weekStart, "yyyy年MM月dd日", { locale: ja })} - {format(weekEnd, "MM月dd日", { locale: ja })}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`p-2 min-h-[100px] border-r last:border-r-0 ${isSameDay(day, now) ? "bg-primary/10" : ""}`}
                >
                  <div className="text-center mb-2">
                    <div className="text-sm font-medium">{format(day, "EEE", { locale: ja })}</div>
                    <div className="text-lg">{format(day, "d")}</div>
                  </div>

                  {isTestDate(day) && (
                    <div className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded text-center">
                      {testDates?.testName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {daysUntilTest !== null && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-lg font-bold">テストまであと {daysUntilTest} 日</p>
            <p className="text-sm text-muted-foreground">{testDates?.testName}</p>
          </div>
        )}
      </div>
    )
  }

  // Render month view
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const weeks = []

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    const now = new Date()

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">{format(monthStart, "yyyy年MM月", { locale: ja })}</h2>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 text-center py-2 border-b">
              <div>月</div>
              <div>火</div>
              <div>水</div>
              <div>木</div>
              <div>金</div>
              <div>土</div>
              <div>日</div>
            </div>

            <div>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7">
                  {week.map((day, dayIndex) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth()

                    return (
                      <div
                        key={dayIndex}
                        className={`p-2 min-h-[80px] border-t border-r last:border-r-0 ${
                          !isCurrentMonth ? "text-muted-foreground bg-muted/30" : ""
                        } ${isSameDay(day, now) ? "bg-primary/10" : ""}`}
                      >
                        <div className="text-right mb-1">{format(day, "d")}</div>

                        {isTestDate(day) && (
                          <div className="px-1 py-0.5 bg-red-100 text-red-800 text-xs rounded text-center">
                            {testDates?.testName}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {daysUntilTest !== null && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-lg font-bold">テストまであと {daysUntilTest} 日</p>
            <p className="text-sm text-muted-foreground">{testDates?.testName}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {viewMode === "day" && renderDayView()}
      {viewMode === "week" && renderWeekView()}
      {viewMode === "month" && renderMonthView()}
    </div>
  )
}
