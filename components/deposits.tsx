"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { BudgetData } from "@/app/page"
import { PiggyBank, Calculator, DollarSign } from "lucide-react"
import type { Currency } from "@/lib/types"

interface DepositsProps {
  budgetData: BudgetData
  setBudgetData: (data: BudgetData) => void
  selectedCurrency: Currency
}

export function Deposits({ budgetData, setBudgetData, selectedCurrency }: DepositsProps) {
  const [depositAmount, setDepositAmount] = useState("")

  const updateDeposit = () => {
    const amount = Number.parseFloat(depositAmount) || 0
    setBudgetData({
      ...budgetData,
      totalDeposit: amount,
      remainingAmount: amount - budgetData.expenses.reduce((sum, expense) => sum + expense.allocatedAmount, 0),
    })
  }

  const allocateProportionally = () => {
    if (budgetData.totalDeposit === 0) return

    const totalPlanned = budgetData.expenses.reduce((sum, expense) => sum + expense.plannedAmount, 0)

    if (totalPlanned === 0) return

    const updatedExpenses = budgetData.expenses.map((expense) => ({
      ...expense,
      allocatedAmount: (expense.plannedAmount / totalPlanned) * budgetData.totalDeposit,
    }))

    setBudgetData({
      ...budgetData,
      expenses: updatedExpenses,
      remainingAmount: 0,
    })
  }

  const allocateByPriority = () => {
    if (budgetData.totalDeposit === 0) return

    let remainingAmount = budgetData.totalDeposit
    const updatedExpenses = [...budgetData.expenses]

    // Sort by priority: high -> medium -> low
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    updatedExpenses.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])

    // Allocate by priority
    updatedExpenses.forEach((expense) => {
      if (remainingAmount >= expense.plannedAmount) {
        expense.allocatedAmount = expense.plannedAmount
        remainingAmount -= expense.plannedAmount
      } else {
        expense.allocatedAmount = remainingAmount
        remainingAmount = 0
      }
    })

    setBudgetData({
      ...budgetData,
      expenses: updatedExpenses,
      remainingAmount,
    })
  }

  const clearAllocations = () => {
    const updatedExpenses = budgetData.expenses.map((expense) => ({
      ...expense,
      allocatedAmount: 0,
    }))

    setBudgetData({
      ...budgetData,
      expenses: updatedExpenses,
      remainingAmount: budgetData.totalDeposit,
    })
  }

  const totalPlanned = budgetData.expenses.reduce((sum, expense) => sum + expense.plannedAmount, 0)
  const totalAllocated = budgetData.expenses.reduce((sum, expense) => sum + expense.allocatedAmount, 0)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Deposits & Allocation</h1>
        <p className="text-purple-100">Manage your budget and allocate funds to expenses</p>
      </div>

      {/* Deposit Input */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <PiggyBank className="h-6 w-6" />
            Set Your Budget
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="deposit-amount" className="text-gray-700 font-medium">
                Total Available Amount
              </Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="Enter your total budget"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="mt-1 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <Button
              onClick={updateDeposit}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Update Budget
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-xl font-bold">
                  {selectedCurrency.symbol}
                  {budgetData.totalDeposit.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-orange-600" />
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
            <div>
              <p className="text-sm text-gray-600">Total Allocated</p>
              <p className="text-xl font-bold text-green-600">
                {selectedCurrency.symbol}
                {totalAllocated.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className={`text-xl font-bold ${budgetData.remainingAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                {selectedCurrency.symbol}
                {budgetData.remainingAmount.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Allocation Controls */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Allocation Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={allocateProportionally} disabled={budgetData.totalDeposit === 0}>
              Allocate Proportionally
            </Button>
            <Button onClick={allocateByPriority} disabled={budgetData.totalDeposit === 0} variant="outline">
              Allocate by Priority
            </Button>
            <Button onClick={clearAllocations} variant="outline">
              Clear All Allocations
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Proportional:</strong> Allocates budget based on planned expense ratios
            </p>
            <p>
              <strong>Priority:</strong> Allocates to high priority items first, then medium, then low
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Allocation Details */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Allocation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetData.expenses.map((expense) => {
              const allocationPercentage =
                budgetData.totalDeposit > 0 ? (expense.allocatedAmount / budgetData.totalDeposit) * 100 : 0
              return (
                <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{expense.name}</h3>
                      <span className="text-sm text-gray-500">({expense.category})</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Planned: {selectedCurrency.symbol}
                      {expense.plannedAmount} • Allocated: {selectedCurrency.symbol}
                      {expense.allocatedAmount.toFixed(2)} •{allocationPercentage.toFixed(1)}% of budget
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${
                        expense.allocatedAmount >= expense.plannedAmount ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {expense.allocatedAmount >= expense.plannedAmount ? "Fully Funded" : "Underfunded"}
                    </div>
                  </div>
                </div>
              )
            })}
            {budgetData.expenses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No expenses to allocate. Add expenses in the Itinerary section first.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
