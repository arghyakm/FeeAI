"use client"

import { contextualChatSession } from "@/ai/flows/contextual-chat-session"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Send } from "lucide-react"
import { FormEvent, useRef, useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { Logo } from "../icons"

interface Message {
  role: "user" | "assistant"
  content: string
}

const quickReplies = [
  "Check Balance",
  "What is my due date?",
  "Show payment history",
  "How much is pending?",
];

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste! I'm FeeBuddy, your personal fee assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickReply = (text: string) => {
    setInput(text);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setInput("")

    try {
      const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await contextualChatSession({ prompt: input, chatHistory });
      
      const assistantMessage: Message = { role: "assistant", content: response.reply }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the AI assistant.",
      })
       const errorMessage: Message = { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again later." }
       setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="flex flex-col h-full max-h-[85vh]">
      <CardHeader>
        <h2 className="font-headline text-2xl font-bold">AI Fee Assistant</h2>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pr-2">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4",
                message.role === "user" ? "justify-end" : ""
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Logo className="h-5 w-5"/>
                  </div>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-2xl rounded-lg p-3 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                   <AvatarImage src="https://picsum.photos/seed/user-avatar/200/200" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Logo className="h-5 w-5"/>
                  </div>
                </Avatar>
              <div className="max-w-xs rounded-lg p-3 text-sm bg-muted">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-foreground/50"></span>
                  <span className="h-2 w-2 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_0.2s_infinite] rounded-full bg-foreground/50"></span>
                  <span className="h-2 w-2 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_0.4s_infinite] rounded-full bg-foreground/50"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 border-t pt-4">
        <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Button key={reply} variant="outline" size="sm" onClick={() => handleQuickReply(reply)} disabled={isLoading}>
                {reply}
              </Button>
            ))}
          </div>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
