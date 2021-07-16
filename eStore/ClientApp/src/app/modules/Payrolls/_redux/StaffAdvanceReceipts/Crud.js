import axios from "axios";


//StaffAdvanceReceipt
//staffAdvanceReceipt


export const API_URL = "https://www.aprajitaretails.in/api/satffAdvanceReceipts";


// CREATE =>  POST: add a new staffAdvanceReceipt to the server
export async function createStaffAdvanceReceipt(staffAdvanceReceipt) {
  return await axios.post(API_URL,  staffAdvanceReceipt,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllStaffAdvanceReceipts() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getStaffAdvanceReceiptById(staffAdvanceReceiptId) {
  return await axios.get(`${API_URL}/${staffAdvanceReceiptId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findStaffAdvanceReceipts(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// function to get all list of employees
export async function getAllEmployees(){
  return await axios.get("https://www.aprajitaretails.in/api/employees") ; 
}
// function to get all list of employees
export async function getAllParties(){
  return await axios.get("https://www.aprajitaretails.in/api/parties") ; 
}

// UPDATE => PUT: update the staffAdvanceReceipt on the server
export async function updateStaffAdvanceReceipt(staffAdvanceReceipt) {
  return await axios.put(`${API_URL}/${staffAdvanceReceipt.staffAdvanceReceiptId}`, JSON.stringify( staffAdvanceReceipt ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForStaffAdvanceReceipts(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForStaffAdvanceReceipts`, {
    ids,
    status
  });
}

// DELETE => delete the staffAdvanceReceipt from the server
export async function deleteStaffAdvanceReceipt(staffAdvanceReceiptId) {
  return await axios.delete(`${API_URL}/${staffAdvanceReceiptId}`);
}

// DELETE StaffAdvanceReceipts by ids
export async function deleteStaffAdvanceReceipts(ids) {
  return await axios.post(`${API_URL}/deleteStaffAdvanceReceipts`, { ids });
}
