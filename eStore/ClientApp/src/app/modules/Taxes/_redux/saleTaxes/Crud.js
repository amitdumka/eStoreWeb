import axios from "axios";

//SaleTax
//saleTax
//SaleTaxes
//saleTaxes

export const API_URL = "https://www.aprajitaretails.in/api/saleTaxTypes";


// CREATE =>  POST: add a new saleTax to the server
export async function createSaleTax(saleTax) {
  return await axios.post(API_URL, saleTax, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllSaleTaxes() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getSaleTaxById(saleTaxId) {
  return await axios.get(`${API_URL}/${saleTaxId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findSaleTaxes(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllTaxTypes() {
  return await axios.get("https://www.aprajitaretails.in/api/enumvalue/taxtype/all");
}

// UPDATE => PUT: update the saleTax on the server
export async function updateSaleTax(saleTax) {
  return await axios.put(
    `${API_URL}/${saleTax.saleTaxId}`,
    JSON.stringify(saleTax),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForSaleTaxes(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForSaleTaxes`, {
    ids,
    status,
  });
}

// DELETE => delete the saleTax from the server
export async function deleteSaleTax(saleTaxId) {
  return await axios.delete(`${API_URL}/${saleTaxId}`);
}

// DELETE SaleTaxes by ids
export async function deleteSaleTaxes(ids) {
  return await axios.post(`${API_URL}/deleteSaleTaxes`, { ids });
}
