import axios from "axios";

//Connection
//connection

export const API_URL = "https://www.aprajitaretails.in/api/electricityConnections";

export const APIBASE_URL = "https://www.aprajitaretails.in/api";


export async function getRentTypes(){
  return axios.get(APIBASE_URL+"/enumvalue/connectiontype/all");
}


// CREATE =>  POST: add a new connection to the server
export async function createConnection(connection) {
  return await axios.post(API_URL,  connection,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllConnections() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getConnectionById(connectionId) {
  return await axios.get(`${API_URL}/${connectionId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findConnections(queryParams) {
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// UPDATE => PUT: update the connection on the server
export async function updateConnection(connection) {
  return await axios.put(`${API_URL}/${connection.electricityConnectionId}`, JSON.stringify( connection ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForConnections(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForConnections`, {
    ids,
    status
  });
}

// DELETE => delete the connection from the server
export async function deleteConnection(connectionId) {
  return await axios.delete(`${API_URL}/${connectionId}`);
}

// DELETE Connections by ids
export async function deleteConnections(ids) {
  return await axios.post(`${API_URL}/deleteConnections`, { ids });
}
