import axios from "axios";

//PettyCashBook
//pettyCashBook

export const API_URL = "https://www.aprajitaretails.in/api/pettyCashBooks";
export const APIBASE_URL = "https://www.aprajitaretails.in/api";


export async function  getGeneratedPettyCashBook(){
  return axios.get(APIBASE_URL+"/DayClosing/GeneratePettyCashSlip"); 
}

export async function getPayModes(){
  return axios.get(APIBASE_URL+"/enumvalue/paymode/all"); 
}
export async function getPettyCashBookTypes(){
  return axios.get(APIBASE_URL+"/enumvalue/pettyCashBooktype/all");
}
export async function getPettyCashBookedLocations(){
  return axios.get(APIBASE_URL+"/pettyCashBookedlocations");
}



// CREATE =>  POST: add a new pettyCashBook to the server
export async function createPettyCashBook(pettyCashBook) {
  return await axios.post(API_URL, pettyCashBook, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllPettyCashBooks() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getPettyCashBookById(pettyCashBookId) {
  return await axios.get(`${API_URL}/${pettyCashBookId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findPettyCashBooks(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the pettyCashBook on the server
export async function updatePettyCashBook(pettyCashBook) {
  return await axios.put(
    `${API_URL}/${pettyCashBook.pettyCashBookId}`,
    JSON.stringify(pettyCashBook),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForPettyCashBooks(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForPettyCashBooks`, {
    ids,
    status,
  });
}

// DELETE => delete the pettyCashBook from the server
export async function deletePettyCashBook(pettyCashBookId) {
  return await axios.delete(`${API_URL}/${pettyCashBookId}`);
}

// DELETE PettyCashBooks by ids
export async function deletePettyCashBooks(ids) {
  return await axios.post(`${API_URL}/deletePettyCashBooks`, { ids });
}
