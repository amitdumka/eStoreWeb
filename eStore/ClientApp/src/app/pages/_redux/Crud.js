import axios from "axios";
//import { BASE_URL } from  "../../../_estore/URLConstants";
const BASE_URL = "";

export async function getStores() {
  return axios.get(BASE_URL + "/api/stores");
}

export async function getTailoringChecks(rData) {
  const data = JSON.stringify(rData);
  console.log(data);
  return await axios.get(
    BASE_URL + "/api/controlCheckWork/tailoringCheck?requestData=" + data
  );
}
export async function getTailoringError(rData) {
  const data = JSON.stringify(rData);
  console.log(data);
  return await axios.get(
    BASE_URL + "/api/controlCheckWork/tailoringError?requestData=" + data
  );
}

export async function getDuplicateInvChecks(id) {
  return await axios.get(
    BASE_URL + "/api/controlCheckWork/invCheck?storeId=" + id
  );
}

export async function getDuplicateSlipChecks(id) {
  return await axios.get(
    BASE_URL + "/api/controlCheckWork/slipCheck?storeId=" + id
  );
}

export async function getSaleList(id) {
  return await axios.get(
    BASE_URL + "/api/controlCheckWork/invLists?storeId=" + id
  );
}
