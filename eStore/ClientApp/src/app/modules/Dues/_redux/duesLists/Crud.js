import axios from "axios";


//duesList
//duesList


export const API_URL = "https://www.aprajitaretails.in/api/dueslists";


// CREATE =>  POST: add a new duesList to the server
export async function createDuesList(duesList) {
  return await axios.post(API_URL,  duesList,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllDuesLists() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getDuesListById(dueslistId) {
  return await axios.get(`${API_URL}/${dueslistId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findDuesLists(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// function to get all list of employees
export async function getSaleList(){
  return await axios.get("https://www.aprajitaretails.in/api/dailySale") ; 
}



// UPDATE => PUT: update the duesList on the server
export async function updateDuesList(duesList) {
  return await axios.put(`${API_URL}/${duesList.dueslistId}`, JSON.stringify( duesList ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForDuesLists(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForDuesLists`, {
    ids,
    status
  });
}

// DELETE => delete the duesList from the server
export async function deleteDuesList(dueslistId) {
  return await axios.delete(`${API_URL}/${dueslistId}`);
}

// DELETE DuesLists by ids
export async function deleteDuesLists(ids) {
  return await axios.post(`${API_URL}/deleteDuesLists`, { ids });
}
