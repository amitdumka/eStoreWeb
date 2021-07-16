import axios from "axios";


//Expense
//expense


export const API_URL = "https://www.aprajitaretails.in/api/expenses";

export async function doLogin(){
  axios.post("https://www.aprajitaretails.in/api/login").then(
    res => {
      return res.data;  
    }
  ).catch(function (error){console.log(error)});
}

export async function verifyLogin(){

  axios.get("https://www.aprajitaretails.in/api/login").then(
    res => {
      const isLogin = res.data;
      if(!isLogin)  return  doLogin();
    }
  ).catch(function (error){console.log(error)});

}
// CREATE =>  POST: add a new expense to the server
export async function createExpense(expense) {
  return await axios.post(API_URL,  expense,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllExpenses() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getExpenseById(expenseId) {
  return await axios.get(`${API_URL}/${expenseId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findExpenses(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}/dto`);//find`, { queryParams });
}

// function to get all list of employees
export async function getAllEmployees(){
  return await axios.get("https://www.aprajitaretails.in/api/employees") ; 
}

export async function getAllParty(){
  return await axios.get("https://www.aprajitaretails.in/api/parties") ; 
}

export async function getAllBankAccount(){
  return await axios.get("https://www.aprajitaretails.in/api/bankaccounts") ; 
}


// UPDATE => PUT: update the expense on the server
export async function updateExpense(expense) {
  return await axios.put(`${API_URL}/${expense.expenseId}`, JSON.stringify( expense ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForExpenses(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForExpenses`, {
    ids,
    status
  });
}

// DELETE => delete the expense from the server
export async function deleteExpense(expenseId) {
  return await axios.delete(`${API_URL}/${expenseId}`);
}

// DELETE Expenses by ids
export async function deleteExpenses(ids) {
  return await axios.post(`${API_URL}/deleteExpenses`, { ids });
}
