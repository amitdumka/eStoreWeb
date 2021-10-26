import axios from "axios";
import { BASE_URL } from "../../../_estore/URLConstants";

const ENUMAPI = BASE_URL + "/api/enumvalue/";

export async function getEnumType(typeName) {
  //console.log(ENUMAPI + typeName);
  return axios.get(ENUMAPI + typeName);
}
export async function getStores() {
  return axios.get(BASE_URL + "/api/stores");
}

//Adding New Data Store, Implimentation pending.

export async function getProductStocks() {
  //Confim it from api
  return axios.get(BASE_URL + "/api/productStocks");
}
export async function getSalesmen() {
  return axios.get(BASE_URL + "/api/sales/salesmen");
}

export async function getExployees() {
  return axios.get(BASE_URL + "/api/payrolls/employees");
}

export async function getParties() {
  return axios.get(BASE_URL + "/api/accounting/parties");
}

// adding function to get all barcodes which qty is more then and equal to one.
// Tailoring Items and booking and delivery
