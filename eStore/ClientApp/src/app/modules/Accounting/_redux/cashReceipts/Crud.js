import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";

//CashReceipt
//cashReceipt

export const API_URL = BASE_URL + "/api/cashReceipts";

// CREATE =>  POST: add a new cashReceipt to the server
export async function createCashReceipt(cashReceipt) {
  return await axios.post(API_URL, cashReceipt, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllCashReceipts() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getCashReceiptById(cashReceiptId) {
  return await axios.get(`${API_URL}/${cashReceiptId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findCashReceipts(queryParams) {
  return await axios.get(`${API_URL}/dto`); //find`, { queryParams });
}

// function to get all list of employees
export async function getAllTranscations() {
  return await axios.get(BASE_URL + "/api/transcationModes");
}

export async function getAllParty() {
  return await axios.get(BASE_URL + "/api/parties");
}

export async function getAllBankAccount() {
  return await axios.get(BASE_URL + "/api/bankaccounts");
}

// UPDATE => PUT: update the cashReceipt on the server
export async function updateCashReceipt(cashReceipt) {
  return await axios.put(
    `${API_URL}/${cashReceipt.cashReceiptId}`,
    JSON.stringify(cashReceipt),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForCashReceipts(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForCashReceipts`, {
    ids,
    status,
  });
}

// DELETE => delete the cashReceipt from the server
export async function deleteCashReceipt(cashReceiptId) {
  return await axios.delete(`${API_URL}/${cashReceiptId}`);
}

// DELETE CashReceipts by ids
export async function deleteCashReceipts(ids) {
  return await axios.post(`${API_URL}/deleteCashReceipts`, { ids });
}
