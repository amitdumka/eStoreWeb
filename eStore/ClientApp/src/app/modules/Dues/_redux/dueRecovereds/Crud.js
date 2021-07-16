import axios from "axios";


//DueRecovered
//dueRecovered


export const API_URL = "https://www.aprajitaretails.in/api/dueRecovereds";
// CREATE =>  POST: add a new dueRecovered to the server
export async function createDueRecovered(dueRecovered) {
  return await axios.post(API_URL,  dueRecovered,{
    headers: {'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllDueRecovereds() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getDueRecoveredById(dueRecoveredId) {
  return await axios.get(`${API_URL}/${dueRecoveredId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findDueRecovereds(queryParams) {
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// function to get all list of employees
export async function getPayModes(){
  return await axios.get("https://www.aprajitaretails.in/api/enumvalue/paymode/all") ; 
}

export async function getDueList(){
  return await axios.get("https://www.aprajitaretails.in/api/duesLists") ; 
}

// UPDATE => PUT: update the dueRecovered on the server
export async function updateDueRecovered(dueRecovered) {
  return await axios.put(`${API_URL}/${dueRecovered.dueRecoveredId}`, JSON.stringify( dueRecovered ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForDueRecovereds(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForDueRecovereds`, {
    ids,
    status
  });
}

// DELETE => delete the dueRecovered from the server
export async function deleteDueRecovered(dueRecoveredId) {
  return await axios.delete(`${API_URL}/${dueRecoveredId}`);
}

// DELETE DueRecovereds by ids
export async function deleteDueRecovereds(ids) {
  return await axios.post(`${API_URL}/deleteDueRecovereds`, { ids });
}
