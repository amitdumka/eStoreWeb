import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";

//BankDeposit
//bankDeposit

export const API_URL = BASE_URL + "/api/bankDeposits";

// CREATE =>  POST: add a new bankDeposit to the server
export async function createBankDeposit(bankDeposit) {
  return await axios.post(API_URL,  bankDeposit,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllBankDeposits() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getBankDepositById(bankDepositId) {
  return await axios.get(`${API_URL}/${bankDepositId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findBankDeposits(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks(){
    return await axios.get(BASE_URL + "/api/bankAccounts") ;
}

// UPDATE => PUT: update the bankDeposit on the server
export async function updateBankDeposit(bankDeposit) {
  return await axios.put(`${API_URL}/${bankDeposit.bankDepositId}`, JSON.stringify( bankDeposit ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForBankDeposits(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForBankDeposits`, {
    ids,
    status
  });
}

// DELETE => delete the bankDeposit from the server
export async function deleteBankDeposit(bankDepositId) {
  return await axios.delete(`${API_URL}/${bankDepositId}`);
}

// DELETE BankDepositss by ids
export async function deleteBankDeposits(ids) {
  return await axios.post(`${API_URL}/deleteBankDeposits`, { ids });
}
