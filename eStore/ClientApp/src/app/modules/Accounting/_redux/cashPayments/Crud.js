import axios from "axios";


//CashPayment
//cashPayment


export const API_URL = "https://www.aprajitaretails.in/api/cashPayments";
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
// CREATE =>  POST: add a new cashPayment to the server
export async function createCashPayment(cashPayment) {
  return await axios.post(API_URL,  cashPayment,{
    headers: {'Content-Type' : 'application/json; charset=utf-8' }
});
}

// READ
export  function getAllCashPayments() {
  return  axios.get(API_URL);//.catch(function (error){console.log(error)});
}

export async function getCashPaymentById(cashPaymentId) {
  return await axios.get(`${API_URL}/${cashPaymentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export async function findCashPayments(queryParams) {
  return await axios.get(`${API_URL}/dto`);//find`, { queryParams });
}

// function to get all list of employees
export async function getAllTranscations(){
  return await axios.get("https://www.aprajitaretails.in/api/transcationModes") ; 
}

export async function getAllParty(){
  return await axios.get("https://www.aprajitaretails.in/api/parties") ; 
}

export async function getAllBankAccount(){
  return await axios.get("https://www.aprajitaretails.in/api/bankaccounts") ; 
}


// UPDATE => PUT: update the cashPayment on the server
export async function updateCashPayment(cashPayment) {
  return await axios.put(`${API_URL}/${cashPayment.cashPaymentId}`, JSON.stringify( cashPayment ),{
    headers: {         'Content-Type' : 'application/json; charset=utf-8' }
});
}

// UPDATE Status
export async function updateStatusForCashPayments(ids, status) {
  return await axios.post(`${API_URL}/updateStatusForCashPayments`, {
    ids,
    status
  });
}

// DELETE => delete the cashPayment from the server
export async function deleteCashPayment(cashPaymentId) {
  return await axios.delete(`${API_URL}/${cashPaymentId}`);
}

// DELETE CashPayments by ids
export async function deleteCashPayments(ids) {
  return await axios.post(`${API_URL}/deleteCashPayments`, { ids });
}
