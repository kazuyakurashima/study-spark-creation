"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

interface NameInputProps {
  onSubmit: (name: string) => void
}

export function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("名前を入力してください")
      return
    }

    if (name.length > 12) {
      setError("名前は12文字以内で入力してください")
      return
    }

    setIsChecking(true)

    // In a real app, we would check if the name is already taken in Supabase
    // For now, we'll just simulate a check
    setTimeout(() => {
      setIsChecking(false)

      // Randomly decide if the name is taken (for demo purposes)
      const isTaken = Math.random() > 0.8

      if (isTaken) {
        setError("この名前は既に使われています。別の名前を入力してください")
      } else {
        onSubmit(name)
      }
    }, 1000)
  }

  return (
    <div className="w-full max-w-md p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">名前を入力</h1>
        <p className="mt-2 text-gray-600">アプリ内で使用する名前を入力してください</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">名前（1〜12文字）</Label>
          <Input id="name" value={name} onChange={handleNameChange} placeholder="ニックネームを入力" maxLength={12} />
          {error && (
            <div className="flex items-center text-sm text-red-500 mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={!name.trim() || isChecking}>
          {isChecking ? "確認中..." : "登録する"}
        </Button>
      </form>
    </div>
  )
}
