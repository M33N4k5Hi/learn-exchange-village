"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  // Mock data for demonstration
  const chats = [
    {
      id: "1",
      name: "John Doe",
      lastMessage: "When can we schedule our next session?",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "Thanks for the lesson yesterday!",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      name: "Mike Johnson",
      lastMessage: "I'm interested in learning more about JavaScript",
      time: "2 days ago",
      unread: false,
    },
  ]

  const messages = [
    {
      id: "1",
      senderId: "1",
      text: "Hi there! I'm interested in your JavaScript tutoring.",
      time: "10:15 AM",
    },
    {
      id: "2",
      senderId: "current-user",
      text: "Hello! I'd be happy to help. What specific areas are you looking to improve?",
      time: "10:20 AM",
    },
    {
      id: "3",
      senderId: "1",
      text: "I'm struggling with async/await and Promises. Could you help me understand them better?",
      time: "10:25 AM",
    },
    {
      id: "4",
      senderId: "current-user",
      text: "Async/await and Promises can be tricky. When would you like to schedule our first session?",
      time: "10:28 AM",
    },
    {
      id: "5",
      senderId: "1",
      text: "When can we schedule our next session?",
      time: "10:30 AM",
    },
  ]

  return (
    <div className="h-[calc(100vh-10rem)]">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Messages</h2>

      <div className="grid h-full gap-6 md:grid-cols-[300px_1fr]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Your recent message threads</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  className={`w-full flex items-center gap-3 p-3 text-left hover:bg-muted/50 ${
                    selectedChat === chat.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={chat.name} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{chat.name}</p>
                      <p className="text-xs text-muted-foreground">{chat.time}</p>
                    </div>
                    <p className="text-sm truncate text-muted-foreground">{chat.lastMessage}</p>
                  </div>
                  {chat.unread && <div className="h-2 w-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedChat ? (
          <Card className="flex h-full flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt={chats.find((c) => c.id === selectedChat)?.name}
                  />
                  <AvatarFallback>{chats.find((c) => c.id === selectedChat)?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{chats.find((c) => c.id === selectedChat)?.name}</CardTitle>
                  <CardDescription>Online</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.senderId === "current-user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === "current-user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex h-full flex-col items-center justify-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Select a conversation from the list to start chatting.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

