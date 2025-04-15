"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Sparkles } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "coach"
  text: string
  timestamp: string
}

interface DailyTalkProps {
  coachIndex: number
}

export function DailyTalk({ coachIndex }: DailyTalkProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages from local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem("dailyTalkMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Initial coach message
      const initialMessage: Message = {
        id: "1",
        sender: "coach",
        text: "今日はどんな学習をしましたか？何か新しいことを学びましたか？",
        timestamp: new Date().toISOString(),
      }
      setMessages([initialMessage])
      localStorage.setItem("dailyTalkMessages", JSON.stringify([initialMessage]))
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
    localStorage.setItem("dailyTalkMessages", JSON.stringify(updatedMessages))
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
      localStorage.setItem("dailyTalkMessages", JSON.stringify(finalMessages))
      setIsTyping(false)
    }, 1500)
  }

  // Simple coach response generator
  const getCoachResponse = (userMessage: string): string => {
    const responses = [
      "なるほど、素晴らしい取り組みですね！",
      "その調子で頑張りましょう！",
      "どんな点が難しかったですか？",
      "今日の学習で一番印象に残ったことは何ですか？",
      "明日はどんなことに取り組む予定ですか？",
      "その考え方はとても良いですね。もう少し詳しく教えてください。",
      "素晴らしい進歩ですね！自分の成長を感じられましたか？",
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

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">今日の振り返りのヒント</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
              <li>今日学んだことは？</li>
              <li>何ができるようになった？</li>
              <li>どこが課題？</li>
              <li>明日は何をやる？</li>
            </ul>
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
