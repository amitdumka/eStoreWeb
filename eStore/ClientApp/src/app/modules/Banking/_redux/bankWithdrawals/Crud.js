import axios from "axios"; import { BASE_URL } from "../../../../../_estore/URLConstants";

//BankWithdrawal
//bankWithdrawal

export const API_URL = BASE_URL +"/api/bankWithdrawals";

// CREATE =>  POST: add a new bankWithdrawal to the server
export async function createBankWithdrawal(bankWithdrawal) {
  return await axios.post(API_URL,  bankWithdrawal,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllBankWithdrawals() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getBankWithdrawalById(bankWithdrawalId) {
  return await axios.get(`${API_URL}/${bankWithdrawalId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findBankWithdrawals(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

export async function getAllPayModes(){
    return await axios.get(BASE_URL +"/api/EnumValue/paymode/all") ;
}

// function to get all list of banks
export async function getAllBanks(){
    return await axios.get(BASE_URL +"/api/bankAccounts") ;
}

// UPDATE => PUT: update the bankWithdrawal on the server
export async function updateBankWithdrawal(bankWithdrawal) {
  return await axios.put(`${API_URL}/${bankWithdrawal.bankWithdrawalId}`, JSON.stringify( bankWithdrawal ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForBankWithdrawals(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForBankWithdrawals`, {
    ids,
    status
  });
}

// DELETE => delete the bankWithdrawal from the server
export async function deleteBankWithdrawal(bankWithdrawalId) {
  return await axios.delete(`${API_URL}/${bankWithdrawalId}`);
}

// DELETE BankWithdrawals by ids
export async function deleteBankWithdrawals(ids) {
  return await axios.post(`${API_URL}/deleteBankWithdrawals`, { ids });
}
