//Axios Api Call for Dashboard Api's
// 1. MasterReport
// 2. CashBook
// 3. DailySale/Weekly Sale

import axios from "axios";
import { BASE_URL } from "../../_estore/URLConstants";


//export const API_URL_MR = BASE_URL + "/api/masterreport";

export function getMasterReport() {
  return axios.get(BASE_URL + "/api/masterreport");
}

export async function getCashBook() {
    return await axios.get(`${BASE_URL}/api/cashbook`);
}

export async function getWeeklySale(mode) {
  mode = mode ? mode : 1;
    return await axios.get(`${BASE_URL}/api/dailySale/find?mode=${mode}`);
}
