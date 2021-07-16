import axios from "axios";

export const CUSTOMERS_URL = "https://www.aprajitaretails.in/api/customers";

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
// CREATE =>  POST: add a new customer to the server
export async function createCustomer(customer) {
  return await axios.post(CUSTOMERS_URL,  customer,{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllCustomers() {
  return  axios.get(CUSTOMERS_URL);//.catch(function (error){console.log(error)});
}

export async function getCustomerById(customerId) {
  return await axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findCustomers(queryParams) {
  //verifyLogin();
  return await axios.get(`${CUSTOMERS_URL}`);//find`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export async function updateCustomer(customer) {
  return await axios.put(`${CUSTOMERS_URL}/${customer.customerId}`, JSON.stringify( customer ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForCustomers(ids, status) {
  return await axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export async function deleteCustomer(customerId) {
  return await axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export async function deleteCustomers(ids) {
  return await axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
