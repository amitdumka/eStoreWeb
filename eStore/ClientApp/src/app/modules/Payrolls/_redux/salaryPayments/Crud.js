import axios from "axios";


//SalaryPayment
//salaryPayment


export const API_URL = "https://www.aprajitaretails.in/api/salaryPayments";

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
// CREATE =>  POST: add a new salaryPayment to the server
export async function createSalaryPayment(salaryPayment) {
  return await axios.post(API_URL,  salaryPayment,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllSalaryPayments() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getSalaryPaymentById(salaryPaymentId) {
  return await axios.get(`${API_URL}/${salaryPaymentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findSalaryPayments(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// function to get all list of employees
export async function getAllEmployees(){
  return await axios.get("https://www.aprajitaretails.in/api/employees") ; 
}

// UPDATE => PUT: update the salaryPayment on the server
export async function updateSalaryPayment(salaryPayment) {
  return await axios.put(`${API_URL}/${salaryPayment.salaryPaymentId}`, JSON.stringify( salaryPayment ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForSalaryPayments(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForSalaryPayments`, {
    ids,
    status
  });
}

// DELETE => delete the salaryPayment from the server
export async function deleteSalaryPayment(salaryPaymentId) {
  return await axios.delete(`${API_URL}/${salaryPaymentId}`);
}

// DELETE SalaryPayments by ids
export async function deleteSalaryPayments(ids) {
  return await axios.post(`${API_URL}/deleteSalaryPayments`, { ids });
}
