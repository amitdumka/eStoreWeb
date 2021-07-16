import axios from "axios";

//Report
//report

export const API_URL = "https://www.aprajitaretails.in/api/reports";

export const APIBASE_URL = "https://www.aprajitaretails.in/api";



export async function getIncomeExpensesReport(onDate) {
  return axios.get(API_URL + "/incomeExpenes?onDate="+onDate);
}

// // CREATE =>  POST: add a new report to the server
// export async function createReport(report) {
//   return await axios.post(API_URL, report, {
//     headers: { "Content-Type": "application/json; charset=utf-8" },
//   });
// }

// // READ
// export function getAllReports() {
//   return axios.get(API_URL); //.catch(function (error){console.log(error)});
// }

// export async function getReportById(reportId) {
//   return await axios.get(`${API_URL}/${reportId}`);
// }

// // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// // items => filtered/sorted result
// export async function findReports(queryParams) {
//   console.log(queryParams);
//   return await axios.get(`${API_URL}`); //find`, { queryParams });
// }

// // UPDATE => PUT: update the report on the server
// export async function updateReport(report) {
//   return await axios.put(
//     `${API_URL}/${report.reportId}`,
//     JSON.stringify(report),
//     {
//       headers: { "Content-Type": "application/json; charset=utf-8" },
//     }
//   );
// }

// // UPDATE Status
// export async function updateStatusForReports(ids, status) {
//   return await axios.post(`${API_URL}/updateStatusForReports`, {
//     ids,
//     status,
//   });
// }

// // DELETE => delete the report from the server
// export async function deleteReport(reportId) {
//   return await axios.delete(`${API_URL}/${reportId}`);
// }

// // DELETE Reports by ids
// export async function deleteReports(ids) {
//   return await axios.post(`${API_URL}/deleteReports`, { ids });
// }
