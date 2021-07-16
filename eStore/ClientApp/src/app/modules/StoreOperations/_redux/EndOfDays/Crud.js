import axios from "axios";

//EndOfDay
//endOfDay

export const API_URL = "https://www.aprajitaretails.in/api/endOfDays";
export const APIBASE_URL = "https://www.aprajitaretails.in/api";

export async function getPayModes(){
  return axios.get(APIBASE_URL+"/enumvalue/paymode/all"); 
}
export async function getEndOfDayTypes(){
  return axios.get(APIBASE_URL+"/enumvalue/endOfDaytype/all");
}
export async function getEndOfDayedLocations(){
  return axios.get(APIBASE_URL+"/endOfDayedlocations");
}



// CREATE =>  POST: add a new endOfDay to the server
export async function createEndOfDay(endOfDay) {
  return await axios.post(API_URL, endOfDay, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllEndOfDays() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getEndOfDayById(endOfDayId) {
  return await axios.get(`${API_URL}/${endOfDayId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findEndOfDays(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the endOfDay on the server
export async function updateEndOfDay(endOfDay) {
  return await axios.put(
    `${API_URL}/${endOfDay.endOfDayId}`,
    JSON.stringify(endOfDay),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForEndOfDays(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForEndOfDays`, {
    ids,
    status,
  });
}

// DELETE => delete the endOfDay from the server
export async function deleteEndOfDay(endOfDayId) {
  return await axios.delete(`${API_URL}/${endOfDayId}`);
}

// DELETE EndOfDays by ids
export async function deleteEndOfDays(ids) {
  return await axios.post(`${API_URL}/deleteEndOfDays`, { ids });
}
