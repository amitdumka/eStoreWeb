import axios from "axios";

export const CUSTOMERS_URL = "https://www.aprajitaretails.in/api/stores";

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
// CREATE =>  POST: add a new store to the server
export async function createStore(store) {
  return await axios.post(CUSTOMERS_URL,  store,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllStores() {
  return  axios.get(CUSTOMERS_URL);//.catch(function (error){console.log(error)});
}

export async function getStoreById(storeId) {
  return await axios.get(`${CUSTOMERS_URL}/${storeId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findStores(queryParams) {
  //verifyLogin();
  return await axios.get(`${CUSTOMERS_URL}`);//find`, { queryParams });
}

// UPDATE => PUT: update the store on the server
export async function updateStore(store) {
  return await axios.put(`${CUSTOMERS_URL}/${store.storeId}`, JSON.stringify( store ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForStores(ids, status) {
  return await axios.post(`${CUSTOMERS_URL}/updateStatusForStores`, {
    ids,
    status
  });
}

// DELETE => delete the store from the server
export async function deleteStore(storeId) {
  return await axios.delete(`${CUSTOMERS_URL}/${storeId}`);
}

// DELETE Stores by ids
export async function deleteStores(ids) {
  return await axios.post(`${CUSTOMERS_URL}/deleteStores`, { ids });
}
