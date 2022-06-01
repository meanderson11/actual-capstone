import React, { useContext, useEffect, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"
import useAllBudgets from "../hooks/useAllBudgets"
import useAllTransactions from "../hooks/useAllTransactions"
import axios from 'axios'


const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, postBudget, deleteBudget] = useAllBudgets()
  const [expenses, postTransaction, deleteExpense] = useAllTransactions()

  function getBudgetExpenses(budgetId) {
    const filteredExpenses=expenses.filter(expense => expense.budgetId === budgetId)
    return filteredExpenses
  }

  function addExpense({ description, amount, budgetId }) {
    postTransaction({text: description, amount, budgetId})
  }
  function addBudget({ name, max }) {
    postBudget({title:name,total:max})
  }
  
    // setBudgets(prevBudgets => {
    //   return prevBudgets.filter(budget => budget.id !== id)
    // })
  // }
  // function deleteExpense({ id }) {
  //   setExpenses(prevExpenses => {
  //     return prevExpenses.filter(expense => expense.id !== id)
  //   })
  // }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}