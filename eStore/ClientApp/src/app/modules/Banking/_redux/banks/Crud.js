import axios from "axios";
import { BASE_URL } from "../../../../../_estore/URLConstants";

//Bank
//bank

export const API_URL = BASE_URL + "api/banks";

// CREATE =>  POST: add a new bank to the server
export async function createBank(bank) {
  return await axios.post(API_URL, bank, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllBanks() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getBankById(bankId) {
  return await axios.get(`${API_URL}/${bankId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findBanks(queryParams) {
  console.log(queryParams);
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// UPDATE => PUT: update the bank on the server
export async function updateBank(bank) {
  return await axios.put(`${API_URL}/${bank.bankId}`, JSON.stringify(bank), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// UPDATE Status
export async function updateStatusForBanks(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForBanks`, {
    ids,
    status,
  });
}

// DELETE => delete the bank from the server
export async function deleteBank(bankId) {
  return await axios.delete(`${API_URL}/${bankId}`);
}

// DELETE Banks by ids
export async function deleteBanks(ids) {
  return await axios.post(`${API_URL}/deleteBanks`, { ids });
}
