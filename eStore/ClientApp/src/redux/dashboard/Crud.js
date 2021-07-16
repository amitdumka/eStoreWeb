//Axios Api Call for Dashboard Api's
// 1. MasterReport
// 2. CashBook
// 3. DailySale/Weekly Sale

import axios from "axios";

export const BASE_URL = "https://www.aprajitaretails.in/api/";

export const API_URL_MR = BASE_URL + "masterreport";

export function getMasterReport() {
  return axios.get(API_URL_MR);
}

export async function getCashBook() {
  return await axios.get(`${BASE_URL}cashbook`);
}

export async function getWeeklySale(mode) {
  mode = mode ? mode : 1;
  return await axios.get(`${BASE_URL}dailySale/find?mode=${mode}`);
}
