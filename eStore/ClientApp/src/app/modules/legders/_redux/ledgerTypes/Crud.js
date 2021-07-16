import axios from "axios";

//ledgerType
//LedgerType
export const API_BASE_URL="https://www.aprajitaretails.in/api/";
export const API_URL = "https://www.aprajitaretails.in/api/ledgerTypes";
// CREATE =>  POST: add a new ledgerType to the server
export async function createLedgerType(ledgerType) {
  return await axios.post(API_URL, ledgerType, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllLedgerTypes() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}
export async function getLedgerCategory(){
  return await axios.get(`${API_BASE_URL}EnumValue/ledgercategorytype/all`);
}
export async function getLedgerTypeById(ledgerTypeId) {
  return await axios.get(`${API_URL}/${ledgerTypeId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findLedgerTypes(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// UPDATE => PUT: update the ledgerType on the server
export async function updateLedgerType(ledgerType) {
  console.error(ledgerType);
  return await axios.put(
    `${API_URL}/${ledgerType.ledgerTypeId}`,
    JSON.stringify(ledgerType),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForLedgerTypes(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForLedgerTypes`, {
    ids,
    status,
  });
}

// DELETE => delete the ledgerType from the server
export async function deleteLedgerType(ledgerTypeId) {
  return await axios.delete(`${API_URL}/${ledgerTypeId}`);
}

// DELETE LedgerTypes by ids
export async function deleteLedgerTypes(ids) {
  return await axios.post(`${API_URL}/deleteLedgerTypes`, { ids });
}
