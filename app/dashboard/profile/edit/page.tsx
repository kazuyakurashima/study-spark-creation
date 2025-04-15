"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft } from "lucide-react"

export default function EditProfilePage() {
  const [userName, setUserName] = useState('ユーザー')
  const [avatarIndex, setAvatarIndex] = useState<number | null>(null)
  const [showAvatarSelection, setShowAvatarSelection] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    // In a real app, we would get the user's name and avatar from Supabase
    // For now, we'll just use local storage
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
    
    const savedAvatar = localStorage.getItem('selectedAvatar')
    if (savedAvatar) {
      setAvatarIndex(Number.parseInt(savedAvatar, 10))
    }
  }, [])
  
  const handleBack = () => {
    // Save changes
    localStorage.setItem('userName', userName)
    if (avatarIndex !== null) {
      localStorage.setItem('selectedAvatar', avatarIndex.toString())
    }
    
    router.back()
  }
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  
  const handleAvatarClick = () => {
    setShowAvatarSelection(!showAvatarSelection)
  }
  
  const handleAvatarSelect = (index: number) => {
    setAvatarIndex(index)
    setShowAvatarSelection(false)
  }
  
  // Placeholder avatars - in a real app, these would be actual images
  const avatars = [
    { type: 'male', placeholder: 'avatar/male' },
    { type: 'male', placeholder: 'avatar/male' },
    { type: 'female', placeholder: 'avatar/female' },
    { type: 'female', placeholder: 'avatar/female' },
    { type: 'neutral', placeholder: 'avatar/neutral' },
    { type: 'neutral', placeholder: 'avatar/neutral' },
  ]
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold ml-2">プロフィール編集</h1>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
            <AvatarImage src="/placeholder.svg" alt={userName} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            +
          </div>
        </div>
        
        <div className="mt-6 w-full max-w-xs">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            value={userName}
            onChange={handleNameChange}
            className="mt-1"
            maxLength={12}
          />
        </div>
      </div>
      
      {showAvatarSelection && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">アバターを選択</h2>
            <div className="grid grid-cols-3 gap-4">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 rounded-lg ${
                    avatarIndex === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleAvatarSelect(index)}
                >
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/${avatar.placeholder}.svg`} alt={`Avatar ${index + 1}`} />
                    <AvatarFallback>{avatar.type[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
