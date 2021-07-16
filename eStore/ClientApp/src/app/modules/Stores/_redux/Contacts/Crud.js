import axios from "axios";

//Contact
//contact

export const API_URL = "https://www.aprajitaretails.in/api/contacts";
export const APIBASE_URL = "https://www.aprajitaretails.in/api";


// CREATE =>  POST: add a new contact to the server
export async function createContact(contact) {
  return await axios.post(API_URL, contact, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// READ
export function getAllContacts() {
  return axios.get(API_URL); //.catch(function (error){console.log(error)});
}

export async function getContactById(contactId) {
  return await axios.get(`${API_URL}/${contactId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findContacts(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`); //find`, { queryParams });
}

// function to get all list of banks
export async function getAllBanks() {
  return await axios.get("https://www.aprajitaretails.in/api/banks");
}

// UPDATE => PUT: update the contact on the server
export async function updateContact(contact) {
  return await axios.put(
    `${API_URL}/${contact.contactId}`,
    JSON.stringify(contact),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

// UPDATE Status
export async function updateStatusForContacts(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForContacts`, {
    ids,
    status,
  });
}

// DELETE => delete the contact from the server
export async function deleteContact(contactId) {
  return await axios.delete(`${API_URL}/${contactId}`);
}

// DELETE Contacts by ids
export async function deleteContacts(ids) {
  return await axios.post(`${API_URL}/deleteContacts`, { ids });
}
