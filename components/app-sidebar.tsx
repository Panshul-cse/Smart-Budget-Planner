"use client"

import { BarChart3, Calendar, PiggyBank, TrendingUp, Smartphone, MessageSquare } from "lucide-react"

const menuItems = [
  {
    title: "Home",
    icon: BarChart3,
    id: "dashboard",
  },
  {
    title: "Itinerary",
    icon: Calendar,
    id: "itinerary",
  },
  {
    title: "Deposits",
    icon: PiggyBank,
    id: "deposits",
  },
  {
    title: "Insights",
    icon: TrendingUp,
    id: "insights",
  },
  {
    title: "UPI Apps",
    icon: Smartphone,
    id: "upi-apps",
  },
  {
    title: "Contact",
    icon: MessageSquare,
    id: "contact",
  },
]

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  return (
    <div className="group relative">
      {/* Collapsed Sidebar */}
      <div className="fixed left-0 top-0 z-40 h-full w-16 bg-gradient-to-b from-slate-900/90 via-gray-900/90 to-zinc-900/90 backdrop-blur-xl border-r border-gray-600/30 transition-all duration-500 group-hover:w-64 group-hover:bg-gradient-to-b group-hover:from-slate-900/95 group-hover:via-gray-900/95 group-hover:to-zinc-900/95 shadow-2xl shadow-gray-600/20">
        {/* Header */}
        <div className="p-4 group-hover:p-6 transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-600 shadow-xl shadow-gray-600/50 flex-shrink-0 animate-pulse">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
              <h1 className="text-xl font-black bg-gradient-to-r from-gray-300 via-slate-200 to-zinc-300 bg-clip-text text-transparent whitespace-nowrap">
                SPLITABILL
              </h1>
              <p className="text-sm text-gray-400/80 whitespace-nowrap font-bold">Smart Budget Planner</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-2 group-hover:px-4 transition-all duration-500">
          <div className="mb-4">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-2 mb-2">
              <span className="text-gray-400 font-black text-sm">Navigation</span>
            </div>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-500 group/item hover:bg-gray-700/20 hover:text-gray-300 hover:shadow-lg hover:shadow-gray-600/30 ${
                    activeView === item.id
                      ? "bg-gradient-to-r from-gray-600 via-slate-500 to-zinc-600 text-white shadow-xl shadow-gray-600/50"
                      : "text-gray-400/80 hover:shadow-md"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold whitespace-nowrap">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for main content */}
      <div className="w-16 group-hover:w-64 transition-all duration-500"></div>
    </div>
  )
}
