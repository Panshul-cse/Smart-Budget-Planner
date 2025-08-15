"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, LogOut } from "lucide-react"
import { CurrencySelector, type Currency } from "./currency-selector"

interface HeaderWidgetProps {
  selectedCurrency: Currency
  onCurrencyChange: (currency: Currency) => void
  user: { name: string; email: string } | null
  onLogout: () => void
  onContactClick: () => void
}

export function HeaderWidget({
  selectedCurrency,
  onCurrencyChange,
  user,
  onLogout,
  onContactClick,
}: HeaderWidgetProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 backdrop-blur-xl border-b border-gray-600/30 shadow-lg shadow-gray-600/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Combined Date & Time, Currency */}
          <div className="flex items-center gap-4">
            <Card className="bg-gradient-to-br from-gray-700 via-slate-600 to-zinc-700 text-white border-0 shadow-xl shadow-gray-600/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-300" />
                    <div>
                      <div className="text-lg font-black text-gray-100">{formatTime(currentTime)}</div>
                      <div className="text-xs opacity-90 font-bold text-gray-300">Live Time</div>
                    </div>
                  </div>
                  <div className="w-px h-12 bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-300" />
                    <div>
                      <div className="text-sm font-black text-gray-100">{formatDate(currentTime)}</div>
                      <div className="text-xs opacity-90 font-bold text-gray-300">Today's Date</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CurrencySelector selectedCurrency={selectedCurrency} onCurrencyChange={onCurrencyChange} />
          </div>

          {/* Right side - Only Logout Button */}
          <div className="flex items-center gap-4">
            {user && (
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-gray-600/50 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700/20 hover:via-slate-600/20 hover:to-zinc-700/20 hover:border-gray-500 bg-transparent backdrop-blur-sm shadow-lg shadow-gray-600/20 font-black relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
