import axios from "axios"; 
import { BASE_URL } from  "../../../_estore/URLConstants";

//const ENUMAPI = BASE_URL + "/api/enumvalue/";


export async function getStores() {
  return axios.get(BASE_URL+"api/stores");
}

export async function getTailoringChecks(storeid) {
    return await axios.get(BASE_URL+"api/controlCheckWork/tailoringCheck?storeId="+storeid);
}

export async function getDuplicateInvChecks(storeid) {
    return await axios.get(BASE_URL+"api/controlCheckWork/invCheck?storeId="+storeid);
}
