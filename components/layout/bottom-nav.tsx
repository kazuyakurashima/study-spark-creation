"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Flag, Calendar, Zap, MessageCircle } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "ゴールナビ",
      href: "/dashboard/goal-navi",
      icon: Flag,
    },
    {
      name: "カウントダウン",
      href: "/dashboard/countdown",
      icon: Calendar,
    },
    {
      name: "スパーク",
      href: "/dashboard/spark",
      icon: Zap,
    },
    {
      name: "トークルーム",
      href: "/dashboard/talk-room",
      icon: MessageCircle,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
