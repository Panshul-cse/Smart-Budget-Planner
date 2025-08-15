"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { BudgetData, Expense, Currency } from "@/app/page"
import { Plus, Trash2, Calendar, DollarSign } from "lucide-react"

// Add selectedCurrency prop to the interface
interface ItineraryProps {
  budgetData: BudgetData
  setBudgetData: (data: BudgetData) => void
  selectedCurrency: Currency
}

// Add this function at the top of the component, after the imports
const determineAIPriority = (name: string, category: string): "high" | "medium" | "low" => {
  const expenseName = name.toLowerCase()
  const expenseCategory = category.toLowerCase()

  // High Priority - Essential/Critical expenses
  const highPriorityKeywords = [
    "rent",
    "mortgage",
    "loan",
    "emi",
    "insurance",
    "medical",
    "health",
    "medicine",
    "doctor",
    "hospital",
    "electricity",
    "water",
    "gas",
    "utilities",
    "phone",
    "internet",
    "groceries",
    "food",
    "fuel",
    "petrol",
    "diesel",
    "school",
    "education",
    "tuition",
    "childcare",
    "daycare",
    "tax",
    "debt",
    "credit card",
  ]

  const highPriorityCategories = [
    "housing",
    "utilities",
    "healthcare",
    "insurance",
    "debt",
    "education",
    "transportation",
    "food",
    "groceries",
    "medical",
    "essential",
  ]

  // Medium Priority - Important but not critical
  const mediumPriorityKeywords = [
    "clothing",
    "clothes",
    "gym",
    "fitness",
    "subscription",
    "netflix",
    "spotify",
    "amazon",
    "maintenance",
    "repair",
    "service",
    "cleaning",
    "laundry",
    "haircut",
    "salon",
    "barber",
    "gift",
    "birthday",
    "anniversary",
    "savings",
    "investment",
  ]

  const mediumPriorityCategories = [
    "personal care",
    "fitness",
    "subscriptions",
    "maintenance",
    "gifts",
    "savings",
    "investment",
    "clothing",
  ]

  // Low Priority - Discretionary/Luxury expenses
  const lowPriorityKeywords = [
    "entertainment",
    "movie",
    "cinema",
    "restaurant",
    "dining",
    "coffee",
    "starbucks",
    "vacation",
    "trip",
    "travel",
    "hotel",
    "shopping",
    "gadget",
    "electronics",
    "gaming",
    "hobby",
    "party",
    "club",
    "bar",
    "alcohol",
    "luxury",
    "jewelry",
    "watch",
    "brand",
    "designer",
  ]

  const lowPriorityCategories = [
    "entertainment",
    "dining",
    "travel",
    "shopping",
    "hobbies",
    "luxury",
    "recreation",
    "leisure",
  ]

  // Check for high priority
  if (
    highPriorityKeywords.some((keyword) => expenseName.includes(keyword)) ||
    highPriorityCategories.some((cat) => expenseCategory.includes(cat))
  ) {
    return "high"
  }

  // Check for low priority
  if (
    lowPriorityKeywords.some((keyword) => expenseName.includes(keyword)) ||
    lowPriorityCategories.some((cat) => expenseCategory.includes(cat))
  ) {
    return "low"
  }

  // Default to medium priority
  return "medium"
}

export function Itinerary({ budgetData, setBudgetData, selectedCurrency }: ItineraryProps) {
  // In the newExpense state, remove priority from the initial state:
  const [newExpense, setNewExpense] = useState({
    name: "",
    category: "",
    plannedAmount: "",
    dueDate: "",
  })

  const sortedExpenses = [...budgetData.expenses].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  // In the addExpense function, use AI to determine priority:
  const addExpense = () => {
    if (!newExpense.name || !newExpense.plannedAmount) return

    const aiPriority = determineAIPriority(newExpense.name, newExpense.category)

    const expense: Expense = {
      id: Date.now().toString(),
      name: newExpense.name,
      category: newExpense.category || "Other",
      plannedAmount: Number.parseFloat(newExpense.plannedAmount),
      allocatedAmount: 0,
      actualAmount: 0,
      dueDate: newExpense.dueDate,
      priority: aiPriority,
    }

    setBudgetData({
      ...budgetData,
      expenses: [...budgetData.expenses, expense],
    })

    setNewExpense({
      name: "",
      category: "",
      plannedAmount: "",
      dueDate: "",
    })
  }

  const removeExpense = (id: string) => {
    setBudgetData({
      ...budgetData,
      expenses: budgetData.expenses.filter((expense) => expense.id !== id),
    })
  }

  const updateExpenseActual = (id: string, actualAmount: number) => {
    setBudgetData({
      ...budgetData,
      expenses: budgetData.expenses.map((expense) => (expense.id === id ? { ...expense, actualAmount } : expense)),
    })
  }

  const totalPlanned = budgetData.expenses.reduce((sum, expense) => sum + expense.plannedAmount, 0)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Expense Itinerary</h1>
        <p className="text-green-100">Plan and track your monthly expenses</p>
      </div>

      {/* Add New Expense */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Plus className="h-6 w-6" />
            Add New Expense
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Remove the Priority field from the form by updating the grid to lg:grid-cols-4: */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="expense-name" className="text-gray-700 font-medium">
                Expense Name
              </Label>
              <Input
                id="expense-name"
                placeholder="e.g., Rent, Groceries"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="expense-category" className="text-gray-700 font-medium">
                Category
              </Label>
              <Input
                id="expense-category"
                placeholder="e.g., Housing, Food"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="expense-amount" className="text-gray-700 font-medium">
                Planned Amount
              </Label>
              <Input
                id="expense-amount"
                type="number"
                placeholder="0.00"
                value={newExpense.plannedAmount}
                onChange={(e) => setNewExpense({ ...newExpense, plannedAmount: e.target.value })}
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="expense-date" className="text-gray-700 font-medium">
                Due Date
              </Label>
              <Input
                id="expense-date"
                type="date"
                value={newExpense.dueDate}
                onChange={(e) => setNewExpense({ ...newExpense, dueDate: e.target.value })}
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          {/* Add an AI Priority indicator after the form: */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600 font-medium">🤖 AI Priority Detection</span>
            </div>
            <p className="text-sm text-gray-600">
              Our AI automatically determines expense priority based on the name and category you provide. Essential
              expenses like rent, utilities, and healthcare are marked as high priority, while entertainment and luxury
              items are marked as low priority.
            </p>
          </div>
          <Button
            onClick={addExpense}
            className="mt-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Planned</p>
                <p className="text-xl font-bold">
                  {selectedCurrency.symbol}
                  {totalPlanned.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-xl font-bold">{budgetData.expenses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="w-fit">
                High Priority: {budgetData.expenses.filter((e) => e.priority === "high").length}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense List */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gray-800">Your Expenses</CardTitle>
          <p className="text-sm text-gray-600">Sorted by priority (High → Medium → Low)</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedExpenses.length > 0 ? (
              sortedExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{expense.name}</h3>
                      <Badge variant="outline" className="bg-white">
                        {expense.category}
                      </Badge>
                      <Badge
                        variant={
                          expense.priority === "high"
                            ? "destructive"
                            : expense.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="shadow-sm"
                      >
                        {expense.priority === "high" ? "🔴" : expense.priority === "medium" ? "🟡" : "🟢"}{" "}
                        {expense.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Planned: </span>
                        <span className="font-semibold text-blue-600">
                          {selectedCurrency.symbol}
                          {expense.plannedAmount}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Allocated: </span>
                        <span className="font-semibold text-green-600">
                          {selectedCurrency.symbol}
                          {expense.allocatedAmount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Actual: </span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={expense.actualAmount || ""}
                          onChange={(e) => updateExpenseActual(expense.id, Number.parseFloat(e.target.value) || 0)}
                          className="w-24 h-8 border-gray-300 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <span className="text-gray-600">Due: </span>
                        <span className="font-medium text-gray-800">{expense.dueDate || "Not set"}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeExpense(expense.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium mb-2">No expenses added yet</h3>
                <p className="text-sm">Add your first expense above to get started with budget planning.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
