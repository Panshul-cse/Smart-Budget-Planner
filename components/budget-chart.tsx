"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { BudgetData } from "@/app/page"

interface BudgetChartProps {
  budgetData: BudgetData
}

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"]

export function BudgetChart({ budgetData }: BudgetChartProps) {
  const chartData = budgetData.expenses
    .filter((expense) => expense.allocatedAmount > 0)
    .map((expense, index) => ({
      name: expense.name,
      value: expense.allocatedAmount,
      color: COLORS[index % COLORS.length],
    }))

  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-500">No allocated expenses to display</div>
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
