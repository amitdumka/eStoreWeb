import axios from "axios"; import { BASE_URL } from "../../../../../_estore/URLConstants";

export const API_URL = BASE_URL + "/api/salaries";


// CREATE =>  POST: add a new salary to the server
export async function createSalary(salary) {
  return await axios.post(API_URL,  salary,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllSalaries() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getSalaryById(currentSalaryId) {
  return await axios.get(`${API_URL}/${currentSalaryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findSalaries(queryParams) {
  //verifyLogin();
  console.log("findSalaries");
    console.log(queryParams);
    console.log(queryParams.filter);
    const filter = queryParams.filter;
    console.log(filter);
    return await axios.get(`${API_URL}`);//,filter, {
      //  headers: { 'Content-Type': 'application/json; charset=utf-8' }
    //});
}

// function to get all list of employees
export async function getAllEmployees() {
    return await axios.get(BASE_URL+"/api/employees");
}

// UPDATE => PUT: update the salary on the server
export async function updateSalary(salary) {
    console.log(salary);
    salary.employee = null;
    salary.store = null;
    console.log(salary);
  return await axios.put(`${API_URL}/${salary.currentSalaryId}`, JSON.stringify( salary ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForSalaries(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForSalaries`, {
    ids,
    status
  });
}

// DELETE => delete the salary from the server
export async function deleteSalary(currentSalaryId) {
  return await axios.delete(`${API_URL}/${currentSalaryId}`);
}

// DELETE Salaries by ids
export async function deleteSalaries(ids) {
  return await axios.post(`${API_URL}/deleteSalaries`, { ids });
}
