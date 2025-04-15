"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, User, HelpCircle, FileText, LogOut } from "lucide-react"

export default function ProfilePage() {
  const [userName, setUserName] = useState("ユーザー")
  const [avatarIndex, setAvatarIndex] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real app, we would get the user's name and avatar from Supabase
    // For now, we'll just use local storage
    const savedName = localStorage.getItem("userName")
    if (savedName) {
      setUserName(savedName)
    }

    const savedAvatar = localStorage.getItem("selectedAvatar")
    if (savedAvatar) {
      setAvatarIndex(Number.parseInt(savedAvatar, 10))
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleEditProfile = () => {
    router.push("/dashboard/profile/edit")
  }

  const handleLogout = () => {
    // In a real app, we would log the user out of Supabase
    // For now, we'll just clear local storage and redirect to the login page
    localStorage.clear()
    router.push("/")
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold ml-2">プロフィール</h1>
      </div>

      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg" alt={userName} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold mt-4">{userName}</h2>
      </div>

      <div className="space-y-2">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleEditProfile}>
          <CardContent className="p-4 flex items-center">
            <User className="h-5 w-5 mr-4 text-primary" />
            <span>アカウント</span>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 flex items-center">
            <HelpCircle className="h-5 w-5 mr-4 text-primary" />
            <span>よくある質問</span>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 flex items-center">
            <FileText className="h-5 w-5 mr-4 text-primary" />
            <span>利用規約</span>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleLogout}>
          <CardContent className="p-4 flex items-center">
            <LogOut className="h-5 w-5 mr-4 text-primary" />
            <span>ログアウト</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
