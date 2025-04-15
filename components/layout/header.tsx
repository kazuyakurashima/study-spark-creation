"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Zap } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  // Get the current page title based on the pathname
  const getPageTitle = () => {
    if (pathname?.includes("/dashboard/goal-navi")) return "ゴールナビ"
    if (pathname?.includes("/dashboard/countdown")) return "カウントダウン"
    if (pathname?.includes("/dashboard/spark")) return "スパーク"
    if (pathname?.includes("/dashboard/talk-room")) return "トークルーム"
    return "ホーム"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <h1 className="font-bold">{getPageTitle()}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/dashboard/spark" className="text-primary">
            <Zap className="h-5 w-5" />
          </Link>
          <Link href="/dashboard/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
