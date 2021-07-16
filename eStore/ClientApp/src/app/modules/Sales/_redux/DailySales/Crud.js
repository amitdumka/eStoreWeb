import axios from "axios";

//DailySale
//dailySale

export const API_URL = "https://www.aprajitaretails.in/api/dailySale";

// CREATE =>  POST: add a new dailySale to the server
export async function createDailySale(dailySale) {
  return await axios.post(API_URL, dailySale, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllDailySales() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getDailySaleById(dailySaleId) {
  return await axios.get(`${API_URL}/${dailySaleId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findDailySales(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}/find?mode=365`); //find`, { queryParams });
}

// function to get all list of employees
export async function getAllEmployees() {
  return await axios.get("https://www.aprajitaretails.in/api/salesmen");
}

// UPDATE => PUT: update the dailySale on the server
export async function updateDailySale(dailySale) {
  return await axios.put(
    `${API_URL}/${dailySale.dailySaleId}`,
    JSON.stringify(dailySale),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForDailySales(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForDailySales`, {
    ids,
    status,
  });
}

// DELETE => delete the dailySale from the server
export async function deleteDailySale(dailySaleId) {
  return await axios.delete(`${API_URL}/${dailySaleId}`);
}

// DELETE DailySales by ids
export async function deleteDailySales(ids) {
  return await axios.post(`${API_URL}/deleteDailySales`, { ids });
}
