"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, BarChart, PieChart, TrendingUp } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "coach"
  text: string
  timestamp: string
}

interface WeeklyTalkProps {
  coachIndex: number
}

export function WeeklyTalk({ coachIndex }: WeeklyTalkProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages from local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem("weeklyTalkMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Initial coach message
      const initialMessage: Message = {
        id: "1",
        sender: "coach",
        text: "今週の学習を振り返りましょう。どんな成果がありましたか？",
        timestamp: new Date().toISOString(),
      }
      setMessages([initialMessage])
      localStorage.setItem("weeklyTalkMessages", JSON.stringify([initialMessage]))
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    localStorage.setItem("weeklyTalkMessages", JSON.stringify(updatedMessages))
    setNewMessage("")

    // Simulate coach typing
    setIsTyping(true)

    // Simulate coach response after a delay
    setTimeout(() => {
      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "coach",
        text: getCoachResponse(newMessage),
        timestamp: new Date().toISOString(),
      }

      const finalMessages = [...updatedMessages, coachMessage]
      setMessages(finalMessages)
      localStorage.setItem("weeklyTalkMessages", JSON.stringify(finalMessages))
      setIsTyping(false)
    }, 1500)
  }

  // Simple coach response generator
  const getCoachResponse = (userMessage: string): string => {
    const responses = [
      "今週の取り組みを詳しく教えてください。どんな科目に力を入れましたか？",
      "素晴らしい進歩ですね！特に成長を感じた部分はどこですか？",
      "今週の学習で難しかったことはありますか？どのように乗り越えましたか？",
      "来週はどんな目標に取り組みたいですか？",
      "先週と比べて、どんな変化がありましたか？",
      "その調子です！自分の成長をしっかり認めることも大切ですよ。",
      "計画通りに進んでいますか？もし遅れがあれば、どう調整するか考えてみましょう。",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">今週の学習状況</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-xs text-muted-foreground">完了タスク</div>
            </div>
            <div className="flex flex-col items-center">
              <PieChart className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">75%</div>
              <div className="text-xs text-muted-foreground">正答率</div>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">5日</div>
              <div className="text-xs text-muted-foreground">学習日数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "coach" && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" alt="Coach" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p>{message.text}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {formatTimestamp(message.timestamp)}
              </div>
            </div>

            {message.sender === "user" && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" alt="Coach" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <Card className="mt-auto">
        <CardContent className="p-4">
          <div className="flex items-end space-x-2">
            <Textarea
              value={newMessage}
              onChange={handleMessageChange}
              placeholder="メッセージを入力..."
              className="flex-1 min-h-[80px]"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #888;
          border-radius: 50%;
          display: inline-block;
          margin: 0 2px;
          opacity: 0.4;
          animation: typing 1s infinite;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
