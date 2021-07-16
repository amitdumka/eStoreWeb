import axios from "axios";


//TranscationMode
//transcationMode

export const API_URL = "https://www.aprajitaretails.in/api/transcationModes";
// CREATE =>  POST: add a new transcationMode to the server
export async function createTranscationMode(transcationMode) {
  return await axios.post(API_URL,  transcationMode,{
    headers: {'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllTranscationModes() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getTranscationModeById(transcationModeId) {
  return await axios.get(`${API_URL}/${transcationModeId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findTranscationModes(queryParams) {
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// function to get all list of employees
export async function getAllEmployees(){
  return await axios.get("https://www.aprajitaretails.in/api/employees") ; 
}

export async function getAllParty(){
  return await axios.get("https://www.aprajitaretails.in/api/parties") ; 
}

export async function getAllBankAccount(){
  return await axios.get("https://www.aprajitaretails.in/api/bankaccounts") ; 
}


// UPDATE => PUT: update the transcationMode on the server
export async function updateTranscationMode(transcationMode) {
  return await axios.put(`${API_URL}/${transcationMode.transcationModeId}`, JSON.stringify( transcationMode ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForTranscationModes(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForTranscationModes`, {
    ids,
    status
  });
}

// DELETE => delete the transcationMode from the server
export async function deleteTranscationMode(transcationModeId) {
  return await axios.delete(`${API_URL}/${transcationModeId}`);
}

// DELETE TranscationModes by ids
export async function deleteTranscationModes(ids) {
  return await axios.post(`${API_URL}/deleteTranscationModes`, { ids });
}
