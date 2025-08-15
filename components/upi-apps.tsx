"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, CreditCard, ExternalLink, Shield, Zap } from "lucide-react"

export function UpiApps() {
  const openPhonePe = () => {
    const phonePeUrl = "phonepe://pay"
    const webUrl = "https://www.phonepe.com/"

    window.location.href = phonePeUrl

    setTimeout(() => {
      window.open(webUrl, "_blank")
    }, 1000)
  }

  const openGooglePay = () => {
    const googlePayUrl = "tez://upi"
    const webUrl = "https://pay.google.com/"

    window.location.href = googlePayUrl

    setTimeout(() => {
      window.open(webUrl, "_blank")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-transparent rounded-2xl p-8 text-white shadow-2xl shadow-red-600/50 border border-red-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-500/60 to-red-400/20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Zap className="h-8 w-8 text-red-200 animate-pulse" />
            <div>
              <h1 className="text-5xl font-black mb-2">UPI Payment Apps 💳</h1>
              <p className="text-red-100 text-xl font-bold">Quick access to your favorite payment apps</p>
            </div>
          </div>
          <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-4 border border-red-500/30 mt-6">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-200" />
              <p className="text-red-100 font-bold text-lg">
                "Access your UPI without losing our company" - Stay connected while you pay! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* UPI Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PhonePe Card */}
        <Card className="bg-black/90 backdrop-blur-xl border-red-600/30 shadow-2xl shadow-red-600/30 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-red-100 font-black text-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 via-red-600 to-purple-800 shadow-xl shadow-purple-600/50">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              PhonePe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Instant UPI Payments</span>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Bill Payments & Recharges</span>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Money Transfer</span>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Cashback & Rewards</span>
              </div>
            </div>

            <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-4 border border-red-600/30">
              <p className="text-red-300 text-sm font-bold text-center">🔒 Secure payments with advanced encryption</p>
            </div>

            <Button
              onClick={openPhonePe}
              className="w-full bg-gradient-to-r from-purple-600 via-red-600 to-purple-800 hover:from-purple-700 hover:via-red-700 hover:to-purple-900 text-white shadow-xl shadow-purple-600/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 font-black text-lg py-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Smartphone className="h-5 w-5 mr-3" />
              Open PhonePe
              <ExternalLink className="h-4 w-4 ml-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Google Pay Card */}
        <Card className="bg-black/90 backdrop-blur-xl border-red-600/30 shadow-2xl shadow-red-600/30 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-red-100 font-black text-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-red-600 to-blue-800 shadow-xl shadow-blue-600/50">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              Google Pay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Quick UPI Transactions</span>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Google Integration</span>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Contactless Payments</span>
              </div>
              <div className="flex items-center gap-3 text-red-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Loyalty Programs</span>
              </div>
            </div>

            <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-4 border border-red-600/30">
              <p className="text-red-300 text-sm font-bold text-center">
                🛡️ Protected by Google's security infrastructure
              </p>
            </div>

            <Button
              onClick={openGooglePay}
              className="w-full bg-gradient-to-r from-blue-600 via-red-600 to-blue-800 hover:from-blue-700 hover:via-red-700 hover:to-blue-900 text-white shadow-xl shadow-blue-600/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 font-black text-lg py-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <CreditCard className="h-5 w-5 mr-3" />
              Open Google Pay
              <ExternalLink className="h-4 w-4 ml-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/80 backdrop-blur-xl border-red-600/30 shadow-xl shadow-red-600/20">
          <CardContent className="p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-green-800 shadow-xl shadow-green-600/50 mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-black text-red-100 text-lg mb-2">Secure Payments</h3>
            <p className="text-red-300 text-sm font-bold">Bank-grade security for all transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-xl border-red-600/30 shadow-xl shadow-red-600/20">
          <CardContent className="p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-800 shadow-xl shadow-yellow-600/50 mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-black text-red-100 text-lg mb-2">Instant Transfer</h3>
            <p className="text-red-300 text-sm font-bold">Lightning-fast money transfers 24/7</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-xl border-red-600/30 shadow-xl shadow-red-600/20">
          <CardContent className="p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 shadow-xl shadow-purple-600/50 mx-auto mb-4">
              <ExternalLink className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-black text-red-100 text-lg mb-2">Easy Access</h3>
            <p className="text-red-300 text-sm font-bold">One-click access to your favorite apps</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
