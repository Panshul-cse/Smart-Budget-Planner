import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { BudgetData, Currency } from "@/app/page"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, PieChart } from "lucide-react"

interface InsightsProps {
  budgetData: BudgetData
  selectedCurrency: Currency
}

export function Insights({ budgetData, selectedCurrency }: InsightsProps) {
  const totalPlanned = budgetData.expenses.reduce((sum, expense) => sum + expense.plannedAmount, 0)
  const totalAllocated = budgetData.expenses.reduce((sum, expense) => sum + expense.allocatedAmount, 0)
  const totalActual = budgetData.expenses.reduce((sum, expense) => sum + expense.actualAmount, 0)

  const budgetUtilization = budgetData.totalDeposit > 0 ? (totalAllocated / budgetData.totalDeposit) * 100 : 0
  const spendingEfficiency = totalAllocated > 0 ? (totalActual / totalAllocated) * 100 : 0

  const overBudgetExpenses = budgetData.expenses.filter((expense) => expense.actualAmount > expense.allocatedAmount)
  const underBudgetExpenses = budgetData.expenses.filter(
    (expense) => expense.actualAmount < expense.allocatedAmount && expense.actualAmount > 0,
  )
  const fullyFundedExpenses = budgetData.expenses.filter((expense) => expense.allocatedAmount >= expense.plannedAmount)

  const categoryBreakdown = budgetData.expenses.reduce(
    (acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = { planned: 0, allocated: 0, actual: 0 }
      }
      acc[expense.category].planned += expense.plannedAmount
      acc[expense.category].allocated += expense.allocatedAmount
      acc[expense.category].actual += expense.actualAmount
      return acc
    },
    {} as Record<string, { planned: number; allocated: number; actual: number }>,
  )

  const generateRecommendations = () => {
    const recommendations = []

    if (budgetUtilization < 80) {
      recommendations.push({
        type: "opportunity",
        title: "Underutilized Budget",
        description: `You have ${(100 - budgetUtilization).toFixed(1)}% of your budget unallocated. Consider increasing allocations to high-priority expenses.`,
        icon: TrendingUp,
      })
    }

    if (budgetUtilization > 100) {
      recommendations.push({
        type: "warning",
        title: "Over Budget",
        description: `You've allocated ${(budgetUtilization - 100).toFixed(1)}% more than your available budget. Consider reducing some allocations.`,
        icon: AlertTriangle,
      })
    }

    if (overBudgetExpenses.length > 0) {
      recommendations.push({
        type: "alert",
        title: "Overspending Detected",
        description: `${overBudgetExpenses.length} expense(s) are over their allocated amounts. Review: ${overBudgetExpenses.map((e) => e.name).join(", ")}.`,
        icon: TrendingDown,
      })
    }

    const highPriorityUnderfunded = budgetData.expenses.filter(
      (e) => e.priority === "high" && e.allocatedAmount < e.plannedAmount,
    )
    if (highPriorityUnderfunded.length > 0) {
      recommendations.push({
        type: "warning",
        title: "High Priority Items Underfunded",
        description: `${highPriorityUnderfunded.length} high-priority expense(s) need more funding: ${highPriorityUnderfunded.map((e) => e.name).join(", ")}.`,
        icon: Target,
      })
    }

    if (spendingEfficiency > 0 && spendingEfficiency < 70) {
      recommendations.push({
        type: "opportunity",
        title: "Low Spending Efficiency",
        description: `You're only using ${spendingEfficiency.toFixed(1)}% of your allocated budget. Consider reallocating unused funds.`,
        icon: PieChart,
      })
    }

    return recommendations
  }

  const recommendations = generateRecommendations()

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Budget Insights</h1>
        <p className="text-orange-100">Analyze your spending patterns and get personalized recommendations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{budgetUtilization.toFixed(1)}%</span>
                <Badge
                  variant={budgetUtilization > 100 ? "destructive" : budgetUtilization > 90 ? "default" : "secondary"}
                >
                  {budgetUtilization > 100 ? "Over" : budgetUtilization > 90 ? "High" : "Normal"}
                </Badge>
              </div>
              <Progress value={Math.min(budgetUtilization, 100)} className="h-2" />
              <p className="text-xs text-gray-500">
                {selectedCurrency.symbol}
                {totalAllocated.toLocaleString()} of {selectedCurrency.symbol}
                {budgetData.totalDeposit.toLocaleString()} allocated
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Spending Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{spendingEfficiency.toFixed(1)}%</span>
                <Badge
                  variant={spendingEfficiency > 80 ? "default" : spendingEfficiency > 50 ? "secondary" : "outline"}
                >
                  {spendingEfficiency > 80 ? "Efficient" : spendingEfficiency > 50 ? "Moderate" : "Low"}
                </Badge>
              </div>
              <Progress value={spendingEfficiency} className="h-2" />
              <p className="text-xs text-gray-500">
                {selectedCurrency.symbol}
                {totalActual.toLocaleString()} spent of {selectedCurrency.symbol}
                {totalAllocated.toLocaleString()} allocated
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Funding Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{fullyFundedExpenses.length}</span>
                <Badge variant="default">of {budgetData.expenses.length}</Badge>
              </div>
              <Progress
                value={(fullyFundedExpenses.length / Math.max(budgetData.expenses.length, 1)) * 100}
                className="h-2"
              />
              <p className="text-xs text-gray-500">Expenses fully funded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <rec.icon
                    className={`h-5 w-5 mt-0.5 ${
                      rec.type === "warning"
                        ? "text-orange-500"
                        : rec.type === "alert"
                          ? "text-red-500"
                          : "text-blue-500"
                    }`}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>Great job! Your budget looks well-balanced.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(categoryBreakdown).map(([category, data]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{category}</h3>
                  <div className="text-sm text-gray-600">
                    Planned: {selectedCurrency.symbol}
                    {data.planned} • Allocated: {selectedCurrency.symbol}
                    {data.allocated.toFixed(2)} • Spent: {selectedCurrency.symbol}
                    {data.actual.toFixed(2)}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Planned</div>
                    <Progress value={100} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Allocated</div>
                    <Progress value={data.planned > 0 ? (data.allocated / data.planned) * 100 : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Spent</div>
                    <Progress value={data.allocated > 0 ? (data.actual / data.allocated) * 100 : 0} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expense Performance */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Expense Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-red-600 mb-3">Over Budget ({overBudgetExpenses.length})</h3>
              <div className="space-y-2">
                {overBudgetExpenses.map((expense) => (
                  <div key={expense.id} className="text-sm">
                    <div className="font-medium">{expense.name}</div>
                    <div className="text-gray-600">
                      {selectedCurrency.symbol}
                      {expense.actualAmount} / {selectedCurrency.symbol}
                      {expense.allocatedAmount}
                      (+{selectedCurrency.symbol}
                      {(expense.actualAmount - expense.allocatedAmount).toFixed(2)})
                    </div>
                  </div>
                ))}
                {overBudgetExpenses.length === 0 && <p className="text-gray-500 text-sm">No overspending detected</p>}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-green-600 mb-3">Under Budget ({underBudgetExpenses.length})</h3>
              <div className="space-y-2">
                {underBudgetExpenses.map((expense) => (
                  <div key={expense.id} className="text-sm">
                    <div className="font-medium">{expense.name}</div>
                    <div className="text-gray-600">
                      {selectedCurrency.symbol}
                      {expense.actualAmount} / {selectedCurrency.symbol}
                      {expense.allocatedAmount}
                      (-{selectedCurrency.symbol}
                      {(expense.allocatedAmount - expense.actualAmount).toFixed(2)})
                    </div>
                  </div>
                ))}
                {underBudgetExpenses.length === 0 && <p className="text-gray-500 text-sm">No under-budget expenses</p>}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-blue-600 mb-3">Fully Funded ({fullyFundedExpenses.length})</h3>
              <div className="space-y-2">
                {fullyFundedExpenses.map((expense) => (
                  <div key={expense.id} className="text-sm">
                    <div className="font-medium">{expense.name}</div>
                    <div className="text-gray-600">
                      {selectedCurrency.symbol}
                      {expense.allocatedAmount} allocated
                    </div>
                  </div>
                ))}
                {fullyFundedExpenses.length === 0 && <p className="text-gray-500 text-sm">No fully funded expenses</p>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
