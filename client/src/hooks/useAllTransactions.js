import { useState, useEffect } from "react";
import axios from "axios";

export default function useAllTransactions() {
  const [expenses, setExpenses] = useState([]);

  //accepts an expense object as defined in the Models
  const postTransaction = async (expense) => {
    //captures the response
    const expenses = await axios.post("http://localhost:4001/api/v1/transactions", expense)
    //sets the expense state value to the array of expenses
    setExpenses(expenses.data.data) 
  }
  
//example delete 
  // delteFN =(expense)=>{
  //   const id = expense['_id']
  //  axios delete
  //  set expense to response.data.data
  // }

  const deleteTransaction= async (id) => {
    const transactions= await axios.delete(`http://localhost:4001/api/v1/transactions/${id}`)
    setExpenses(transactions.data.data)
  }

  useEffect(() => {
    const getAllTransactions = async () => {
        const transactions = await axios.get("http://localhost:4001/api/v1/transactions");
        setExpenses(transactions.data.data);
    };
    getAllTransactions()
  }, [setExpenses]);

  return [expenses, postTransaction,deleteTransaction];
}
