import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BudgetChart } from "@/components/budget-chart"
import type { BudgetData, Currency } from "@/app/page"
import { DollarSign, TrendingDown, TrendingUp, Wallet, Heart } from "lucide-react"

interface DashboardProps {
  budgetData: BudgetData
  selectedCurrency: Currency
  user: { name: string; email: string } | null
}

export function Dashboard({ budgetData, selectedCurrency, user }: DashboardProps) {
  const totalPlanned = budgetData.expenses.reduce((sum, expense) => sum + expense.plannedAmount, 0)
  const totalAllocated = budgetData.expenses.reduce((sum, expense) => sum + expense.allocatedAmount, 0)
  const totalActual = budgetData.expenses.reduce((sum, expense) => sum + expense.actualAmount, 0)
  const allocationPercentage = budgetData.totalDeposit > 0 ? (totalAllocated / budgetData.totalDeposit) * 100 : 0

  // Sort expenses by priority: high -> medium -> low
  const sortedExpenses = [...budgetData.expenses].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="space-y-6">
      {/* Greeting Section */}
      <div className="bg-gradient-to-br from-gray-700 via-slate-600 to-zinc-700 rounded-2xl p-8 text-white shadow-2xl shadow-gray-600/50 border border-gray-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <Heart className="h-8 w-8 text-gray-300 animate-pulse" />
          <div>
            <h1 className="text-5xl font-black mb-2 text-gray-100">
              {getGreeting()}, {user?.name || "User"}! 👋
            </h1>
            <p className="text-gray-200 text-xl font-bold">Welcome back to your financial dashboard</p>
            <p className="text-gray-300/80 font-bold mt-2">
              Ready to take control of your budget? Let's make your money work smarter! 💰
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-600 text-white border-gray-500/30 shadow-2xl shadow-gray-600/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-black text-gray-100">Total Deposit</CardTitle>
            <Wallet className="h-5 w-5 text-gray-200" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">
              {selectedCurrency.symbol}
              {budgetData.totalDeposit.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-600 via-gray-500 to-zinc-600 text-white border-gray-500/30 shadow-2xl shadow-slate-600/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-black text-gray-100">Planned Expenses</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-200" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">
              {selectedCurrency.symbol}
              {totalPlanned.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-600 via-slate-500 to-gray-600 text-white border-gray-500/30 shadow-2xl shadow-zinc-600/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-black text-gray-100">Allocated</CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-200" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">
              {selectedCurrency.symbol}
              {totalAllocated.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-700 via-slate-600 to-zinc-700 text-white border-gray-500/30 shadow-2xl shadow-gray-700/50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-black text-gray-100">Remaining</CardTitle>
            <TrendingDown className="h-5 w-5 text-gray-200" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">
              {selectedCurrency.symbol}
              {budgetData.remainingAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Allocation Chart */}
        <Card className="bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-zinc-900/80 backdrop-blur-xl border-gray-600/30 shadow-2xl shadow-gray-600/30 hover:shadow-3xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gray-100 font-black">Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetChart budgetData={budgetData} />
          </CardContent>
        </Card>

        {/* Expense Progress */}
        <Card className="bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-zinc-900/80 backdrop-blur-xl border-gray-600/30 shadow-2xl shadow-gray-600/30 hover:shadow-3xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gray-100 font-black">Expense Progress</CardTitle>
            <p className="text-sm text-gray-300/80 font-bold">Sorted by priority (High → Low)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedExpenses.length > 0 ? (
              sortedExpenses.map((expense) => {
                const progress = expense.plannedAmount > 0 ? (expense.allocatedAmount / expense.plannedAmount) * 100 : 0
                return (
                  <div
                    key={expense.id}
                    className="space-y-2 p-3 rounded-lg bg-gray-700/20 hover:bg-gray-700/30 transition-all duration-300 backdrop-blur-sm border border-gray-600/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-100">{expense.name}</span>
                        <Badge
                          variant={
                            expense.priority === "high"
                              ? "destructive"
                              : expense.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs shadow-sm font-bold"
                        >
                          {expense.priority}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-200/80 font-black">
                        {selectedCurrency.symbol}
                        {expense.allocatedAmount} / {selectedCurrency.symbol}
                        {expense.plannedAmount}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3 bg-gray-800/30" />
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-gray-200/80">
                <div className="text-4xl mb-4">📊</div>
                <p className="font-bold">No expenses added yet.</p>
                <p className="text-sm font-bold">Add expenses in the Itinerary section to see progress here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Health */}
      <Card className="bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-zinc-900/80 backdrop-blur-xl border-gray-600/30 shadow-2xl shadow-gray-600/30 hover:shadow-3xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gray-100 font-black">Budget Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-200/80 font-black">Overall Allocation</span>
              <span className="font-black text-lg text-gray-100">{allocationPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={allocationPercentage} className="h-4 bg-gray-800/30" />
            <div className="text-sm text-gray-200/80 bg-gray-700/20 p-3 rounded-lg backdrop-blur-sm border border-gray-600/30 font-bold">
              {budgetData.totalDeposit === 0
                ? "💡 Set your budget in the Deposits section to get started!"
                : allocationPercentage < 100
                  ? `💰 You have ${selectedCurrency.symbol}${(budgetData.totalDeposit - totalAllocated).toLocaleString()} remaining to allocate`
                  : allocationPercentage > 100
                    ? `⚠️ You are over budget by ${selectedCurrency.symbol}${(totalAllocated - budgetData.totalDeposit).toLocaleString()}`
                    : "✅ Your budget is fully allocated"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
