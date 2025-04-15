"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TestNameSelectionProps {
  onSelect: (testName: string) => void
}

export function TestNameSelection({ onSelect }: TestNameSelectionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [customName, setCustomName] = useState("")

  const handleOptionChange = (value: string) => {
    setSelectedOption(value)
  }

  const handleCustomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomName(e.target.value)
  }

  const handleSubmit = () => {
    if (selectedOption === "custom") {
      if (customName.trim()) {
        onSelect(customName)
      }
    } else if (selectedOption) {
      onSelect(selectedOption)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">テスト名を選択</h1>
        <p className="mt-2 text-muted-foreground">目標を設定するテストを選んでください</p>
      </div>

      <div className="space-y-4">
        <RadioGroup value={selectedOption || ""} onValueChange={handleOptionChange}>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="第１回定期考査" id="option1" />
            <Label htmlFor="option1">第１回定期考査</Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="第２回定期考査" id="option2" />
            <Label htmlFor="option2">第２回定期考査</Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="第３回定期考査" id="option3" />
            <Label htmlFor="option3">第３回定期考査</Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="第４回定期考査" id="option4" />
            <Label htmlFor="option4">第４回定期考査</Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="custom" id="option5" />
            <Label htmlFor="option5">自分で入力</Label>
          </div>
        </RadioGroup>

        {selectedOption === "custom" && (
          <div className="space-y-2">
            <Label htmlFor="custom-name">テスト名を入力</Label>
            <Input id="custom-name" value={customName} onChange={handleCustomNameChange} placeholder="例：中間テスト" />
          </div>
        )}
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={!selectedOption || (selectedOption === "custom" && !customName.trim())}
      >
        次へ
      </Button>
    </div>
  )
}
