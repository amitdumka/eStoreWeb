import axios from "axios";

//DayClosing
//dayClosing

export const API_URL = "https://www.aprajitaretails.in/api/dayClosings";
export const APIBASE_URL = "https://www.aprajitaretails.in/api";

export async function getPayModes(){
  return axios.get(APIBASE_URL+"/enumvalue/paymode/all"); 
}
export async function getDayClosingTypes(){
  return axios.get(APIBASE_URL+"/enumvalue/dayClosingtype/all");
}
export async function getDayClosingedLocations(){
  return axios.get(APIBASE_URL+"/dayClosingedlocations");
}



// CREATE =>  POST: add a new dayClosing to the server
export async function createDayClosing(dayClosing) {
  return await axios.post(API_URL, dayClosing, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllDayClosings() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getDayClosingById(dayClosingId) {
  return await axios.get(`${API_URL}/${dayClosingId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findDayClosings(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the dayClosing on the server
export async function updateDayClosing(dayClosing) {
  return await axios.put(
    `${API_URL}/${dayClosing.dayClosingId}`,
    JSON.stringify(dayClosing),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForDayClosings(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForDayClosings`, {
    ids,
    status,
  });
}

// DELETE => delete the dayClosing from the server
export async function deleteDayClosing(dayClosingId) {
  return await axios.delete(`${API_URL}/${dayClosingId}`);
}

// DELETE DayClosings by ids
export async function deleteDayClosings(ids) {
  return await axios.post(`${API_URL}/deleteDayClosings`, { ids });
}
