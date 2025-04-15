"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CountdownHeaderProps {
  viewMode: "day" | "week" | "month"
  onViewModeChange: (mode: "day" | "week" | "month") => void
  onTodayClick: () => void
}

export function CountdownHeader({ viewMode, onViewModeChange, onTodayClick }: CountdownHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4 mr-2" />
            {viewMode === "day" && "日"}
            {viewMode === "week" && "週"}
            {viewMode === "month" && "月"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onViewModeChange("day")}>日</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onViewModeChange("week")}>週</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onViewModeChange("month")}>月</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" onClick={onTodayClick}>
        <Calendar className="h-4 w-4 mr-2" />
        今日
      </Button>
    </div>
  )
}
