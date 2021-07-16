import axios from "axios";

//BillPayment
//billPayment

export const API_URL = "https://www.aprajitaretails.in/api/ebillPayments";
export const APIBASE_URL = "https://www.aprajitaretails.in/api";

export async function getConnections(){
  return axios.get(APIBASE_URL+"/electricityConnections"); 
}
export async function getBills(){
  return axios.get(APIBASE_URL+"/electricityBills");
}

// CREATE =>  POST: add a new billPayment to the server
export async function createBillPayment(billPayment) {
  return await axios.post(API_URL, billPayment, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllBillPayments() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getBillPaymentById(billPaymentId) {
  return await axios.get(`${API_URL}/${billPaymentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findBillPayments(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the billPayment on the server
export async function updateBillPayment(billPayment) {
  return await axios.put(
    `${API_URL}/${billPayment.eBillPaymentId}`,
    JSON.stringify(billPayment),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForBillPayments(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForBillPayments`, {
    ids,
    status,
  });
}

// DELETE => delete the billPayment from the server
export async function deleteBillPayment(billPaymentId) {
  return await axios.delete(`${API_URL}/${billPaymentId}`);
}

// DELETE BillPayments by ids
export async function deleteBillPayments(ids) {
  return await axios.post(`${API_URL}/deleteBillPayments`, { ids });
}
