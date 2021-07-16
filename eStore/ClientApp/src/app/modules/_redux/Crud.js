import axios from "axios"; 
import { BASE_URL } from  "../../../_estore/URLConstants";

const ENUMAPI = BASE_URL + "/api/enumvalue/";

export async function getEnumType(typeName) {
 console.log(ENUMAPI + typeName);
  return axios.get(ENUMAPI + typeName);
}
export async function getStores() {
  return axios.get(BASE_URL+"/api/stores");
}
