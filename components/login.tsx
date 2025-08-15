"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react"

interface LoginProps {
  onLogin: (userData: { name: string; email: string }) => void
}

// Simulated user database
const userDatabase = [
  { email: "admin@splitabill.com", password: "admin123", name: "Admin User" },
  { email: "demo@splitabill.com", password: "demo123", name: "Demo User" },
  { email: "john@example.com", password: "john123", name: "John Doe" },
  { email: "jane@example.com", password: "jane123", name: "Jane Smith" },
]

export function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loginError, setLoginError] = useState("")
  const [signupError, setSignupError] = useState("")

  const validateLogin = (email: string, password: string) => {
    const user = userDatabase.find((u) => u.email === email && u.password === password)
    return user
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (!loginData.email || !loginData.password) {
      setLoginError("Please enter both email and password")
      return
    }

    const user = validateLogin(loginData.email, loginData.password)
    if (user) {
      onLogin({
        name: user.name,
        email: user.email,
      })
    } else {
      setLoginError("Invalid email or password. Please try again.")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")

    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setSignupError("Please fill in all fields")
      return
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords do not match")
      return
    }

    if (signupData.password.length < 6) {
      setSignupError("Password must be at least 6 characters long")
      return
    }

    // Check if user already exists
    const existingUser = userDatabase.find((u) => u.email === signupData.email)
    if (existingUser) {
      setSignupError("An account with this email already exists")
      return
    }

    // Add new user to database (in real app, this would be an API call)
    userDatabase.push({
      email: signupData.email,
      password: signupData.password,
      name: signupData.name,
    })

    onLogin({
      name: signupData.name,
      email: signupData.email,
    })
  }

  const handleDemoLogin = () => {
    const demoUser = userDatabase.find((u) => u.email === "demo@splitabill.com")
    if (demoUser) {
      onLogin({
        name: demoUser.name,
        email: demoUser.email,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-4 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-600/20 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-600/5 via-slate-600/5 to-zinc-600/5"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-600 shadow-2xl shadow-gray-600/50 animate-pulse">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-300 via-slate-200 to-zinc-300 bg-clip-text text-transparent">
            SPLITABILL
          </h1>
          <p className="text-gray-400/80 mt-2 font-bold">Smart Budget Planner</p>
        </div>

        <Card className="bg-gradient-to-br from-slate-900/90 via-gray-900/90 to-zinc-900/90 backdrop-blur-xl border-gray-600/30 shadow-2xl shadow-gray-600/50">
          <CardHeader>
            <CardTitle className="text-center text-gray-100 font-black">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800/60 border-gray-600/30">
                <TabsTrigger
                  value="login"
                  className="text-gray-300 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:via-slate-500 data-[state=active]:to-zinc-600 data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-gray-300 font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:via-gray-500 data-[state=active]:to-zinc-600 data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-300 text-sm font-bold">{loginError}</span>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="login-email" className="text-gray-200 font-black">
                      Email
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => {
                          setLoginData({ ...loginData, email: e.target.value })
                          setLoginError("")
                        }}
                        className="pl-10 border-gray-600/50 focus:border-gray-500 focus:ring-gray-500 bg-slate-800/60 text-gray-100 placeholder:text-gray-400/60 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password" className="text-gray-200 font-black">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => {
                          setLoginData({ ...loginData, password: e.target.value })
                          setLoginError("")
                        }}
                        className="pl-10 pr-10 border-gray-600/50 focus:border-gray-500 focus:ring-gray-500 bg-slate-800/60 text-gray-100 placeholder:text-gray-400/60 font-bold"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-600 hover:from-gray-700 hover:via-slate-600 hover:to-zinc-700 text-white shadow-xl shadow-gray-600/50 hover:shadow-2xl transition-all duration-500 font-black relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    Sign In
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-900/20 via-slate-900/20 to-zinc-900/20 border border-blue-600/30 rounded-lg">
                  <p className="text-blue-300 text-xs font-bold mb-2">Demo Credentials:</p>
                  <p className="text-blue-200 text-xs font-bold">Email: demo@splitabill.com</p>
                  <p className="text-blue-200 text-xs font-bold">Password: demo123</p>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  {signupError && (
                    <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-300 text-sm font-bold">{signupError}</span>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="signup-name" className="text-gray-200 font-black">
                      Full Name
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => {
                          setSignupData({ ...signupData, name: e.target.value })
                          setSignupError("")
                        }}
                        className="pl-10 border-gray-600/50 focus:border-gray-500 focus:ring-gray-500 bg-slate-800/60 text-gray-100 placeholder:text-gray-400/60 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-gray-200 font-black">
                      Email
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => {
                          setSignupData({ ...signupData, email: e.target.value })
                          setSignupError("")
                        }}
                        className="pl-10 border-gray-600/50 focus:border-gray-500 focus:ring-gray-500 bg-slate-800/60 text-gray-100 placeholder:text-gray-400/60 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password" className="text-gray-200 font-black">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password (min 6 chars)"
                        value={signupData.password}
                        onChange={(e) => {
                          setSignupData({ ...signupData, password: e.target.value })
                          setSignupError("")
                        }}
                        className="pl-10 pr-10 border-gray-600/50 focus:border-gray-500 focus:ring-gray-500 bg-slate-800/60 text-gray-100 placeholder:text-gray-400/60 font-bold"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-confirm-password" className="text-gray-200 font-black">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => {
                          setSignupData({ ...signupData, confirmPassword: e.target.value })
                          setSignupError("")
                        }}
                        className="pl-10 border-gray-600/50 focus:border-gray-500 focus:ring-gray-500 bg-slate-800/60 text-gray-100 placeholder:text-gray-400/60 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-slate-600 via-gray-500 to-zinc-600 hover:from-slate-700 hover:via-gray-600 hover:to-zinc-700 text-white shadow-xl shadow-slate-600/50 hover:shadow-2xl transition-all duration-500 font-black relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-300/80 font-bold">Or</span>
                </div>
              </div>

              <Button
                onClick={handleDemoLogin}
                variant="outline"
                className="w-full mt-4 border-gray-600/50 text-gray-400 hover:bg-gradient-to-r hover:from-gray-700/20 hover:via-slate-600/20 hover:to-zinc-700/20 hover:border-gray-500 bg-transparent backdrop-blur-sm font-black relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                Try Demo Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-400/60">
          <p className="font-bold">By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
