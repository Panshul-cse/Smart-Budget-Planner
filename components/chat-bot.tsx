"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm BudgetBot from SPLITABILL! 🤖💰 I can help you with budgeting advice, saving tips, and smart allocation suggestions. How can I help you manage your finances today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const budgetTips = [
    "Try the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings and debt repayment.",
    "Consider setting up automatic transfers to your savings account to build an emergency fund.",
    "Review your subscriptions monthly - you might be paying for services you don't use.",
    "Use the envelope method for discretionary spending categories like entertainment and dining out.",
    "Track your expenses for a week to identify spending patterns and potential savings opportunities.",
    "Consider increasing your high-priority expense allocations first, then distribute remaining funds.",
    "If you're consistently under budget in a category, consider reallocating those funds to savings or other priorities.",
    "Set up alerts for when you're approaching your budget limits in each category.",
    "Review and adjust your budget monthly based on actual spending patterns.",
    "Consider using cashback credit cards for planned expenses, but pay them off immediately.",
  ]

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("save") || lowerMessage.includes("saving")) {
      return "Here are some saving tips: Start with small amounts and increase gradually. Automate your savings so it happens without thinking. Look for areas where you can cut back, like dining out or subscriptions. Even saving $25/week adds up to $1,300 per year!"
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("allocation")) {
      return "For better budgeting: Prioritize your essential expenses first (rent, utilities, groceries). Then allocate funds to your goals and wants. The 50/30/20 rule is a great starting point - 50% needs, 30% wants, 20% savings/debt."
    }

    if (lowerMessage.includes("debt") || lowerMessage.includes("loan")) {
      return "For debt management: List all debts with interest rates. Consider the avalanche method (pay minimums on all, extra on highest interest) or snowball method (smallest balance first for motivation). Avoid taking on new debt while paying off existing debt."
    }

    if (lowerMessage.includes("emergency") || lowerMessage.includes("fund")) {
      return "Emergency funds are crucial! Aim for 3-6 months of expenses. Start small - even $500 can help with minor emergencies. Keep it in a separate, easily accessible savings account. Build it gradually by setting aside a small amount each month."
    }

    if (lowerMessage.includes("invest") || lowerMessage.includes("investment")) {
      return "Before investing: Ensure you have an emergency fund and high-interest debt is managed. Start with low-cost index funds or ETFs. Consider your risk tolerance and time horizon. Dollar-cost averaging can help reduce timing risk."
    }

    // Random tip for general questions
    const randomTip = budgetTips[Math.floor(Math.random() * budgetTips.length)]
    return `Here's a helpful tip: ${randomTip} Is there a specific area of your budget you'd like help with?`
  }

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: generateBotResponse(inputMessage),
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botResponse])
    setInputMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button - Positioned at bottom */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-600 hover:from-gray-700 hover:via-slate-600 hover:to-zinc-700 shadow-2xl shadow-gray-600/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-110 z-40 animate-pulse font-black relative overflow-hidden group"
          size="icon"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <MessageCircle className="h-6 w-6 relative z-10 text-white" />
        </Button>
      )}

      {/* Chat Window - Positioned at bottom */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-2xl shadow-gray-600/50 z-40 flex flex-col bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-zinc-900/95 backdrop-blur-xl border-gray-600/30">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-600 via-slate-500 to-zinc-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg font-black">
                <Bot className="h-6 w-6" />
                BudgetBot
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 font-black"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-gray-600 via-slate-500 to-zinc-600">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg px-3 py-2 text-sm font-bold ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-gray-600 via-slate-500 to-zinc-600 text-white"
                          : "bg-slate-800/60 text-gray-100 backdrop-blur-sm border border-gray-600/30"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.sender === "user" && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/60 backdrop-blur-sm border border-gray-600/30">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-gray-600/30 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about budgeting..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-gray-600/50 focus:border-gray-500 bg-slate-800/60 text-gray-100 placeholder:text-gray-400/60 font-bold"
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-gray-600 via-slate-500 to-zinc-600 hover:from-gray-700 hover:via-slate-600 hover:to-zinc-700 font-black relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Send className="h-4 w-4 relative z-10 text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
