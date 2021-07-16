import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";


//Receipt
//receipt


export const API_URL = BASE_URL + "/api/receipts";
// CREATE =>  POST: add a new receipt to the server
export async function createReceipt(receipt) {
  return await axios.post(API_URL,  receipt,{
    headers: {'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllReceipts() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getReceiptById(receiptId) {
  return await axios.get(`${API_URL}/${receiptId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findReceipts(queryParams) {
  return await axios.get(`${API_URL}`);//find`, { queryParams });
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


// UPDATE => PUT: update the receipt on the server
export async function updateReceipt(receipt) {
  return await axios.put(`${API_URL}/${receipt.receiptId}`, JSON.stringify( receipt ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForReceipts(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForReceipts`, {
    ids,
    status
  });
}

// DELETE => delete the receipt from the server
export async function deleteReceipt(receiptId) {
  return await axios.delete(`${API_URL}/${receiptId}`);
}

// DELETE Receipts by ids
export async function deleteReceipts(ids) {
  return await axios.post(`${API_URL}/deleteReceipts`, { ids });
}
