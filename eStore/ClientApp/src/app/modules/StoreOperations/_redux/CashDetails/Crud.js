import axios from "axios";

//CashDetail
//cashDetail

export const API_URL = "https://www.aprajitaretails.in/api/cashDetails";
export const APIBASE_URL = "https://www.aprajitaretails.in/api";

export async function getPayModes(){
  return axios.get(APIBASE_URL+"/enumvalue/paymode/all"); 
}
export async function getCashDetailTypes(){
  return axios.get(APIBASE_URL+"/enumvalue/cashDetailtype/all");
}
export async function getCashDetailedLocations(){
  return axios.get(APIBASE_URL+"/cashDetailedlocations");
}



// CREATE =>  POST: add a new cashDetail to the server
export async function createCashDetail(cashDetail) {
  return await axios.post(API_URL, cashDetail, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllCashDetails() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getCashDetailById(cashDetailId) {
  return await axios.get(`${API_URL}/${cashDetailId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findCashDetails(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the cashDetail on the server
export async function updateCashDetail(cashDetail) {
  return await axios.put(
    `${API_URL}/${cashDetail.cashDetailId}`,
    JSON.stringify(cashDetail),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForCashDetails(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForCashDetails`, {
    ids,
    status,
  });
}

// DELETE => delete the cashDetail from the server
export async function deleteCashDetail(cashDetailId) {
  return await axios.delete(`${API_URL}/${cashDetailId}`);
}

// DELETE CashDetails by ids
export async function deleteCashDetails(ids) {
  return await axios.post(`${API_URL}/deleteCashDetails`, { ids });
}
