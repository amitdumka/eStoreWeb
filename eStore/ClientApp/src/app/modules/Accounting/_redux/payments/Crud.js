import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";


//Payment
//payment


export const API_URL = BASE_URL +  "/api/payments";

// CREATE =>  POST: add a new payment to the server
export async function createPayment(payment) {
  return await axios.post(API_URL,  payment,{
    headers: {'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllPayments() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getPaymentById(paymentId) {
  return await axios.get(`${API_URL}/${paymentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findPayments(queryParams) {
  return await axios.get(`${API_URL}/dto`);//find`, { queryParams });
}

// function to get all list of employees
export async function getAllEmployees(){
    return await axios.get(BASE_URL + "/api/employees") ;
}

export async function getAllParty(){
    return await axios.get(BASE_URL + "/api/parties") ;
}

export async function getAllBankAccount(){
    return await axios.get(BASE_URL + "/api/bankaccounts") ;
}


// UPDATE => PUT: update the payment on the server
export async function updatePayment(payment) {
  return await axios.put(`${API_URL}/${payment.paymentId}`, JSON.stringify( payment ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForPayments(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForPayments`, {
    ids,
    status
  });
}

// DELETE => delete the payment from the server
export async function deletePayment(paymentId) {
  return await axios.delete(`${API_URL}/${paymentId}`);
}

// DELETE Payments by ids
export async function deletePayments(ids) {
  return await axios.post(`${API_URL}/deletePayments`, { ids });
}
