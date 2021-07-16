import axios from "axios";
const BASE_URL = "https://www.aprajitaretails.in/api";
const ENUMAPI = BASE_URL + "/enumvalue/";

export async function getEnumType(typeName) {
 console.log(ENUMAPI + typeName);
  return axios.get(ENUMAPI + typeName);
}
export async function getStores() {
  return axios.get(BASE_URL+"/stores");
}
