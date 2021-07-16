import axios from "axios";

//purchaseTaxes
//PurchaseTaxes
//purchaseTax
//PurchaseTax


export const API_BASE_URL="https://www.aprajitaretails.in/api/";
export const API_URL = "https://www.aprajitaretails.in/api/purchaseTaxTypes";
// CREATE =>  POST: add a new purchaseTax to the server
export async function createPurchaseTax(purchaseTax) {
  return await axios.post(API_URL, purchaseTax, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllPurchaseTaxes() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}
export async function getTaxType(){
  return await axios.get(`${API_BASE_URL}EnumValue/taxtype/all`);
}
export async function getPurchaseTaxById(purchaseTaxId) {
  return await axios.get(`${API_URL}/${purchaseTaxId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findPurchaseTaxes(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// UPDATE => PUT: update the purchaseTax on the server
export async function updatePurchaseTax(purchaseTax) {
  console.error(purchaseTax);
  return await axios.put(
    `${API_URL}/${purchaseTax.purchaseTaxId}`,
    JSON.stringify(purchaseTax),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForPurchaseTaxes(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForPurchaseTaxes`, {
    ids,
    status,
  });
}

// DELETE => delete the purchaseTax from the server
export async function deletePurchaseTax(purchaseTaxId) {
  return await axios.delete(`${API_URL}/${purchaseTaxId}`);
}

// DELETE PurchaseTaxes by ids
export async function deletePurchaseTaxes(ids) {
  return await axios.post(`${API_URL}/deletePurchaseTaxes`, { ids });
}
