"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { Itinerary } from "@/components/itinerary"
import { Deposits } from "@/components/deposits"
import { Insights } from "@/components/insights"
import { ChatBot } from "@/components/chat-bot"
import { HeaderWidget } from "@/components/header-widget"
import { Login } from "@/components/login"
import { Contact } from "@/components/contact"
import { currencies, type Currency } from "@/components/currency-selector"
import { UpiApps } from "@/components/upi-apps"

export type Expense = {
  id: string
  name: string
  category: string
  plannedAmount: number
  allocatedAmount: number
  actualAmount: number
  dueDate: string
  priority: "high" | "medium" | "low"
}

export type BudgetData = {
  totalDeposit: number
  expenses: Expense[]
  remainingAmount: number
}

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard")
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [showContact, setShowContact] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0])
  const [budgetData, setBudgetData] = useState<BudgetData>({
    totalDeposit: 0,
    expenses: [],
    remainingAmount: 0,
  })

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setBudgetData({
      totalDeposit: 0,
      expenses: [],
      remainingAmount: 0,
    })
    setActiveView("dashboard")
  }

  const handleContactClick = () => {
    setActiveView("contact")
  }

  const handleBackFromContact = () => {
    setShowContact(false)
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard budgetData={budgetData} selectedCurrency={selectedCurrency} user={user} />
      case "itinerary":
        return <Itinerary budgetData={budgetData} setBudgetData={setBudgetData} selectedCurrency={selectedCurrency} />
      case "deposits":
        return <Deposits budgetData={budgetData} setBudgetData={setBudgetData} selectedCurrency={selectedCurrency} />
      case "insights":
        return <Insights budgetData={budgetData} selectedCurrency={selectedCurrency} />
      case "upi-apps":
        return <UpiApps />
      case "contact":
        return <Contact onBack={() => setActiveView("dashboard")} />
      default:
        return <Dashboard budgetData={budgetData} selectedCurrency={selectedCurrency} user={user} />
    }
  }

  // Show login screen if user is not logged in
  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 relative overflow-hidden">
      {/* Enhanced Geometric Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-600/20 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-600/5 via-slate-600/5 to-zinc-600/5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gray-600/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-slate-600/10 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 border border-zinc-600/10 rounded-full"></div>
      </div>

      <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 relative z-10">
        <HeaderWidget
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
          user={user}
          onLogout={handleLogout}
          onContactClick={handleContactClick}
        />
        <div className="p-6">
          <div className="mx-auto max-w-7xl">{renderActiveView()}</div>
        </div>
      </main>
      <ChatBot />
    </div>
  )
}
