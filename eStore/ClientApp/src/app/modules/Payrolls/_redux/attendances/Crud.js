import axios from "axios";

export const API_URL = "https://www.aprajitaretails.in/api/attendances";

export async function doLogin(){
  axios.post("https://www.aprajitaretails.in/api/login").then(
    res => {
      return res.data;  
    }
  ).catch(function (error){console.log(error)});
}

export async function verifyLogin(){

  axios.get("https://www.aprajitaretails.in/api/login").then(
    res => {
      const isLogin = res.data;
      if(!isLogin)  return  doLogin();
    }
  ).catch(function (error){console.log(error)});

}
// CREATE =>  POST: add a new attendance to the server
export async function createAttendance(attendance) {
  return await axios.post(API_URL,  attendance,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllAttendances() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getAttendanceById(attendanceId) {
  return await axios.get(`${API_URL}/${attendanceId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findAttendances(queryParams) {
  //verifyLogin();
  return await axios.get(`${API_URL}`);//find`, { queryParams });
}

// function to get all list of employees
export async function getAllEmployees(){
  return await axios.get("https://www.aprajitaretails.in/api/employees") ; 
}

// UPDATE => PUT: update the attendance on the server
export async function updateAttendance(attendance) {
  return await axios.put(`${API_URL}/${attendance.attendanceId}`, JSON.stringify( attendance ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForAttendances(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForAttendances`, {
    ids,
    status
  });
}

// DELETE => delete the attendance from the server
export async function deleteAttendance(attendanceId) {
  return await axios.delete(`${API_URL}/${attendanceId}`);
}

// DELETE Attendances by ids
export async function deleteAttendances(ids) {
  return await axios.post(`${API_URL}/deleteAttendances`, { ids });
}
