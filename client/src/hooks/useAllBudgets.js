import { useState, useEffect } from "react";
import axios from "axios";

export default function useAllBudgets() {
  const [value, setValue] = useState([]);

  const postBudget = async(budget)=>{
    const budgets = await axios.post('http://localhost:4001/api/v1/budgets',budget)
    setValue(budgets.data.data)
  }
  //sends id to server to locate the budget to delete then receives the updated list of budgets
  const deleteBudget = async (id) => {
    const budgets = await axios.delete(`http://localhost:4001/api/v1/budgets/${id}`)
    setValue(budgets.data.data)
  }

  useEffect(() => {
    const getAllBudgets = async () => {
        const budgets = await axios.get("http://localhost:4001/api/v1/budgets");
        setValue(budgets.data.data);
    };
    getAllBudgets()
  }, [setValue]);

  return [value, postBudget, deleteBudget];
}
