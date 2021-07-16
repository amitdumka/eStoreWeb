import axios from "axios";

//Bill
//bill

export const API_URL = "https://www.aprajitaretails.in/api/ElectricityBills";
export const APIBASE_URL = "https://www.aprajitaretails.in/api";

export async function getConnections(){
  return axios.get(APIBASE_URL+"/electricityConnections"); 
}


// CREATE =>  POST: add a new bill to the server
export async function createBill(bill) {
  return await axios.post(API_URL, bill, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllBills() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getBillById(billId) {
  return await axios.get(`${API_URL}/${billId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findBills(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the bill on the server
export async function updateBill(bill) {
  return await axios.put(
    `${API_URL}/${bill.eletricityBillId}`,
    JSON.stringify(bill),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForBills(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForBills`, {
    ids,
    status,
  });
}

// DELETE => delete the bill from the server
export async function deleteBill(billId) {
  return await axios.delete(`${API_URL}/${billId}`);
}

// DELETE Bills by ids
export async function deleteBills(ids) {
  return await axios.post(`${API_URL}/deleteBills`, { ids });
}
