import axios from "axios";

//Party
//party
//Parties
//parties

export const API_URL = "https://www.aprajitaretails.in/api/parties";


// CREATE =>  POST: add a new party to the server
export async function createParty(party) {
  return await axios.post(API_URL, party, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllParties() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getPartyById(partyId) {
  return await axios.get(`${API_URL}/${partyId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findParties(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllLedgerTypes() {
  return await axios.get("https://www.aprajitaretails.in/api/ledgerTypes");
}

// UPDATE => PUT: update the party on the server
export async function updateParty(party) {
  return await axios.put(
    `${API_URL}/${party.partyId}`,
    JSON.stringify(party),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForParties(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForParties`, {
    ids,
    status,
  });
}

// DELETE => delete the party from the server
export async function deleteParty(partyId) {
  return await axios.delete(`${API_URL}/${partyId}`);
}

// DELETE Parties by ids
export async function deleteParties(ids) {
  return await axios.post(`${API_URL}/deleteParties`, { ids });
}
